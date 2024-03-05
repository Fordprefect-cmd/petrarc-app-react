
'''
#ANCHOR 
bug e miglioramenti:
- Da aggiornare conteggio indici per includere monosillabi atoni => hai già assegnato il conto partendo da 1 qui, puoi usare "0" come simbolo per sillabe atone (il lo la il gli le ti ecc)
- migliorare funzione trova_sillabe_con_vocali_accentate, esempi bad output:
-- " tànto ì à è ò " =>  "1, 2, 3, 3, 4, 4, 4, 5, 5, 5" (indici duplicati)
-- " aeio ui ia" => "1, 3, 4" (essendo tutte vocali output doveva essere solo "1") 

- Da aggiungere modalità per assonanza oltre che per rima

'''



from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import re
import json


app = Flask(__name__)
CORS(app)  # Configura CORS per il tuo Flask app



# Importa i dati necessari: un DataFrame con la sillabazione (df_DizionarioItaliano) e una lista di sillabe uniche (df_Sillabe_uniche)
df_DizionarioItaliano = pd.read_csv('df_cleaned (1).csv')
df_Sillabe_uniche = pd.read_csv('my_dataframe.csv')

# Creo un dizionario per mappare le versioni accentate delle vocali
mapping_noAcc_to_Acc = {
    "a": ["à", "á", "â", "ä"],
    "e": ["è", "é", "ê"],
    "i": ["ì", "í", "î"],
    "o": ["ò", "ó", "ô", "ö"],
    "u": ["ù", "ú", "û", "ü"]
}

# Definisco liste di vocali accentate e non accentate, e una lista di consonanti italiane
italian_vowels_acc = ["á", "à", "ä", "â", "è", "é", "ê", "í", "ì", "î", "ó", "ò", "ö", "ô", "ú", "ù", "ü", "û"]
italian_vowels_no_acc = ["a", "e", "i", "o", "u"]
italian_vowels = italian_vowels_acc + italian_vowels_no_acc
consonanti_italiane = ['b', 'c', 'd', 'f', 'g', 'h', 'l', 'm', 'n', 'p', 'q', 'r', 's', 't', 'v', 'z', 'j', 'k', 'w', 'x', 'y']


@app.route('/')

def index():
    return "Server is running"  
@app.route('/get_tables', methods=['POST'])
def get_tables():

    data = request.json
    multiline_input = data.get('multiline_input', '')
    multiline_input = multiline_input.lower()

    print('Received text:', multiline_input)





    input_lines = multiline_input.split('\n')
    ajax_responses = []

    for line_index, line in enumerate(input_lines, start=1):
        line = line.strip()
        if line:
            # Processa ogni linea e ottieni i DataFrame risultanti
            df, df_conto_assoluto = process_string(line)
            df['Riga_testo_indice_parola'] = f"{line_index}." + (df.index + 1).astype(str)  
            megatabella_df_json = df.to_json(orient='records')
            megatabella_df_conto_assoluto_json = df_conto_assoluto.to_json(orient='records')
            json_mega_data_1 = json.loads(megatabella_df_json)
            json_mega_data_2 = json.loads(megatabella_df_conto_assoluto_json)
            response = {"table1": json_mega_data_1, "table2": json_mega_data_2}
            ajax_responses.append({
                'lineIndex': line_index,
                'response': response
            })

   
    response = jsonify({'ajaxResponses': ajax_responses})

    return response


if __name__ == "__main__":
    app.run(debug=True)

# Definisco una funzione per l'analisi del testo riga per riga
def process_string(stringa_iniziale):
    # Definisco una funzione per la sillabazione delle parole
    '''
    Per ottenere la sillabazione di ogni parola in un verso ho 2 sistemi, 
    grazie a ciascuno dei dataset importati in precedenza (df_cleaned, Sillabe_uniche1).
    Prima controllo se la parola ha già un corrispettivo in df_cleaned (più avanti nel codice),
    se non lo ha, viene marcata "false" nella colonna "Trovata" e con la funzione SillaBot le sillabe in df_Sillabe_uniche 
    vengono usate come "setaccio" per sillabare approssimamente la parola.
    '''
    def SillaBot(parola):
        # Ottieni la lista delle sillabe uniche
        sillabe = df_Sillabe_uniche['Sillaba'].tolist()
        componenti = []

        i = 0
        while i < len(parola):
            for sillaba in sillabe:
                lunghezza_sillaba = len(sillaba) if not pd.isna(sillaba) else 0  # Verifica NaN
                if parola[i:i+lunghezza_sillaba] == sillaba:
                    componenti.append(sillaba)
                    i += lunghezza_sillaba
                    break
            else:
                i += 1
        sillabazione = '-'.join(componenti)

        vocali_acc_presenti = False
        vocali_acc_presenti = any(char in italian_vowels_acc for char in parola)

        if not vocali_acc_presenti:
            first_non_accented_vowel = next((vowel for vowel in italian_vowels if vowel in parola), None)
            if first_non_accented_vowel:
                mapped_vowel = mapping_noAcc_to_Acc.get(first_non_accented_vowel, [first_non_accented_vowel])[0]
                sillabazione = sillabazione.replace(first_non_accented_vowel, mapped_vowel, 1)

            return sillabazione

        return sillabazione

    # Definisco una funzione per la Sinalefe
    '''
    Si verifica tra una parola e la successiva, 
    se la parola finisce per vocale e quella successiva inizia per vocale
    '''
    def Sinalefe(parole_da_cercare):
        entries_sinalefe = []  

        for i in range(len(parole_da_cercare) - 1):
            if parole_da_cercare[i][-1] in italian_vowels and parole_da_cercare[i + 1][0] in italian_vowels:
                entries_sinalefe.append(True)
            else:
                entries_sinalefe.append(False)

        # Aggiungo False per l'ultima parola nella lista perchè non è seguita da nessuno
        entries_sinalefe.append(False)

        return entries_sinalefe  # Ritorna la lista delle entries_sinalefe Sinalefe

    # Definisco una funzione per catalogare le parole in base alla posizione dell'accento dalla fine della parola
    def tipo_di_parola(row):
        if pd.isna(row['PosizioneAccento']):
            return pd.NA
        lunghezza_sillabazione = len(row['Sillabazione'].split('-')) if row['Sillabazione'] else 0
        posizione_accento = row['PosizioneAccento']
        posizione_dalla_fine = lunghezza_sillabazione - posizione_accento + 1

        if posizione_dalla_fine == 1:
            return 'tronca'
        elif posizione_dalla_fine == 2:
            return 'piana'
        elif posizione_dalla_fine == 3:
            return 'sdrucciolo'
        elif posizione_dalla_fine == 4:
            return 'bisdrucciolo'
        elif posizione_dalla_fine == 5:
            return 'trisdrucciolo'


    # Definisco una funzione che ritorna i range degli indici di vocali una affianco all'altra in una parola,
    # serve nella UI all'utente per capire dove aggiungere dieresi e sineresi manualmente
    def trova_range_vocali(parola):
        ranges = []
        indice_iniziale = None

        for i, char in enumerate(parola.lower()):  
            if char in italian_vowels:
                if indice_iniziale is None:
                    indice_iniziale = i
            else:
                if indice_iniziale is not None:
                    lunghezza_range = i - indice_iniziale
                    if lunghezza_range > 1:  
                        ranges.append((indice_iniziale, i - 1))
                    indice_iniziale = None

        if indice_iniziale is not None:
            lunghezza_range = len(parola) - indice_iniziale
            if lunghezza_range > 1:
                ranges.append((indice_iniziale, len(parola) - 1))
        # in caso non vi siano range contigui di vocali e la parola 
        # sia un alternanza di 1 vocale e n consonanti allora ritorna false
        if len(ranges) == 0 or all(end - start == 0 for start, end in ranges):
            return "false"

        return ranges


    
    # Definisco una funzione che ritorni le posizioni degli indici delle sillabe accentate
    # relative all'intero verso 
    # PROBLEMA DEVO FAR SCALARE I VALORI A PARTIRE DALLA PAROLA DOVE SUCCEDONO LE CONDIZIONI
    def trova_sillabe_con_vocali_accentate(df):
        # Unisco tutte le entry non-NaN della colonna "Sillabazione" in una grande stringa
        grande_stringa_sillabazione = '-'.join(df['Sillabazione'].dropna())

        # Divido la grande stringa in una lista di sillabe
        sillabe = grande_stringa_sillabazione.split('-')

        # Inizializzo una lista per gli indici delle sillabe con vocali accentate
        indici_sillabe_accentate = []
        
        # Regex per trovare vocali accentate
        regex_vocali_accentate = re.compile(r'[áàäâèéêíìîóòöôúùüû]', re.IGNORECASE)

        # Itera attraverso le sillabe e trova quelle con vocali accentate, salvando la posizione nell'indice di ciascuna sillaba accentata
        for i, sillaba in enumerate(sillabe, start=1):
            if regex_vocali_accentate.search(sillaba):
                indici_sillabe_accentate.append(i)

    # Le seguenti condizioni servono a scalare in avanti o indietro le posizioni degli indici delle sillabe
    # accentate nel verso in base alla presenza delle sinalefe/dieresi/sineresi, le quali fondono (o dividono) 2 sillabe in 1

        # Condizione 1
        for index in range(len(df['Sillabazione'])):
            if df['Sinalefe'][index]:  # Se la parola ha Sinalefe True
                corresponding_index = indici_sillabe_accentate[index] + 1 
                indici_sillabe_accentate = [i - 1 if i > corresponding_index else i for i in indici_sillabe_accentate]

        # Condizione 2
        for index in range(len(df['Sillabazione'])):
            if 'sineresi' in df['DiexSin_eresi'][index]:  # Se la parola ha "sineresi" nella colonna "DiexSin_eresi"
                corresponding_index = indici_sillabe_accentate[index] + 1 
                indici_sillabe_accentate = [i - 1 if i > corresponding_index else i for i in indici_sillabe_accentate]

        # Condizione 3
        for index in range(len(df['Sillabazione'])):
            if 'dieresi' in df['DiexSin_eresi'][index]:  # Se la parola ha "dieresi" nella colonna "DiexSin_eresi"
                corresponding_index = indici_sillabe_accentate[index] + 1 
                indici_sillabe_accentate = [i + 1 if i > corresponding_index else i for i in indici_sillabe_accentate]

        return indici_sillabe_accentate





    # Definisco una funzione che che assegno le condizioni sineresi e dieresi alle parole che rispettano le condizioni

    def check_sineresi_dieresi(substringa_rima, ultima_parola):
        # Condizione 1 - scremiamo solo le ultime 1 o 2 sillabe di ogni parola o monosillbi di vocali che non hanno
        if '-' in substringa_rima and substringa_rima.count('-') >= 2 or len(substringa_rima) == 1:
            return "false"
        
        # Condizione 2 - la sineresi si Creo sempre tra le ultime 2 sillabe della parola dentro il verso
        if '-' in substringa_rima and substringa_rima.count('-') == 1 and not ultima_parola:
            index_of_dash = substringa_rima.index('-')
            if (
                substringa_rima[index_of_dash - 1] in italian_vowels_acc and
                substringa_rima[index_of_dash + 1] in italian_vowels_no_acc
            ):
                return "sineresi"

        # Condizione 3 - la dieresi si ha sempre nell'ultima sillaba dell'ultima parola del verso
        if '-' not in substringa_rima and len(substringa_rima) >= 2 and ultima_parola and substringa_rima[1] in italian_vowels_no_acc:
            return "dieresi" # parola per testare: "costei"

        return "false"


    # Creo il dizionario delle parole e delle sillabazioni dal nuovo dataset
    parole = {}
    for _, row in df_DizionarioItaliano.iterrows():
        parola = row['Parola']
        sillabazione = row['Sillabazione']
        parole[parola] = sillabazione

    # Suddivido la stringa iniziale in parole
    parole_da_cercare = stringa_iniziale.split()

    # Inizializzo la variabile per le righe del DataFrame
    rows = []

    # Cerco le parole nella stringa iniziale e Aggiungo le righe al DataFrame
    for i, parola in enumerate(parole_da_cercare):
        trovata = parola in parole
        sillabazione = parole.get(parola, None)
        
        if sillabazione is None:
            # Se la sillabazione non è trovata in df_cleaned, chiama la funzione SillaBot
            sillabazione = SillaBot(parola)
        
        num_elementi_sillabazione = sillabazione.count('-') + 1 if sillabazione else None

        # Troviamo l'indice della sillaba contenente la vocale accentata relativa alla parola
        '''
        più avanti cercheremo con la funzione "trova_sillabe_con_vocali_accentate(df)" di stabilire la posizione degli indici delle 
        sillabe con vocali accentate relativamente al verso.
        '''
        posizione_accento = None
        if sillabazione:
            for i, char in enumerate(sillabazione):
                if char in italian_vowels_acc:
                    posizione_accento = sillabazione[:i].count('-') + 1
                    break

        rows.append({'Parola': parola, 'Trovata': trovata, 'Sillabazione': sillabazione,
                     'NumElementiSillabazione': num_elementi_sillabazione, 'PosizioneAccento': posizione_accento})

    # Creo il DataFrame principale
    df = pd.DataFrame(rows)
    
    # Aggiungo una colonna 'Substringa Rima' al DataFrame
    # La colonna 'Substringa Rima' contiene l'entry 'Sillabazione' suddivisa al primo carattere incluso tra le vocali accentate
    df['Substringa_Rima'] = df['Sillabazione'].str.extract('([áàäâèéêíìîóòöôúùüû].*)')

    # Aggiungo una colonna booleana indicando se ogni parola è l'ultima nella linea
    df['Ultima_Parola'] = df['Parola'] == parole_da_cercare[-1]


    # Utilizzo della funzione per popolare la colonna 'DiexSin_eresi' del dataframe
    df['DiexSin_eresi'] = df.apply(lambda row: check_sineresi_dieresi(row['Substringa_Rima'], row['Ultima_Parola']), axis=1)

    # Utilizzo della funzione Sinalefe() per popolare la colonna 'DiexSin_eresi' del dataframe
    df['Sinalefe'] = Sinalefe(parole_da_cercare)


    # Applico la funzione a ogni parola nel DataFrame e Creo la nuova colonna 'Range_vocali'
    df['Range_vocali'] = df['Parola'].apply(trova_range_vocali)

    # Applico la funzione per calcolare il tipo di parola e Aggiungo la colonna al DataFrame
    df['TipoDiParola'] = df.apply(tipo_di_parola, axis=1)    

    # Calcola il 'conto assoluto', ovvero il numero totale di sillabe di ogni parola in tutto il verso,
    conto_assoluto = df['NumElementiSillabazione'].sum()
    # Calcola il conteggio di Sineresi
    Sineresi_count = (df['DiexSin_eresi'] == 'sineresi').sum()
    # Calcola il conteggio di Sinalefe
    Sinalefe_count = (df['Sinalefe'] == True).sum()
    Dieresi_count = (df['DiexSin_eresi'] == 'dieresi').sum()

    # Creo una lista con li indici delle sillabe con vocali accentate relative al verso
    posiz_acc_in_verso = trova_sillabe_con_vocali_accentate(df)
    
    totale_condizioni = Sineresi_count+Sinalefe_count+Dieresi_count
    #Calcola il computo metrico delle sillabe del verso
    computo_finale = conto_assoluto-totale_condizioni
    
    # Creo il nuovo DataFrame df_conto_assoluto che riassume i valori di "df" 
    df_conto_assoluto = pd.DataFrame({
        'conto_assoluto': [conto_assoluto],
        'Totale_Sineresi': [Sineresi_count],
        'Totale_Sinalefe': [Sinalefe_count],
        'Totale_Dieresi': [Dieresi_count],
        'posiz_acc_in_verso': [posiz_acc_in_verso],
        'computo_finale': [computo_finale]
    })
    
    def cerca_parole_alternative(substringa_rima, num_elementi_sillabazione): 
        parole_alternative = []
        # Calcola il numero di sillabe in modo "veloce"
        df_DizionarioItaliano['N_sillabe_fast'] = df_DizionarioItaliano['Sillabazione'].str.count('-') + 1
        # Cerca le parole che fanno rima con la parola data
        
        matches = df_DizionarioItaliano[df_DizionarioItaliano['Sillabazione'].str.endswith(substringa_rima)] #substringa rima match
        for _, row in matches.iterrows():
            # Controlla se il numero di sillabe è lo stesso
            if row['N_sillabe_fast'] == num_elementi_sillabazione:
                parole_alternative.append(row['Parola']) # la row è di match, il quale è un filtro di df_DizionarioItaliano
                if len(parole_alternative) == 3:
                    break
        return parole_alternative if parole_alternative else "false"

    # Aggiungi la nuova colonna "Alternative" al DataFrame principale
    # i risutati iniziano spesso per "a" perchè sono le prime parole incontrate nel dizionario in ordine alfabetico
    df['Alternative'] = df.apply(lambda row: cerca_parole_alternative(row['Substringa_Rima'], row['NumElementiSillabazione']), axis=1)
    
    
    # Ritorna i DataFrame 
    return df, df_conto_assoluto 
