import React from 'react';

export const Drawer = () => {
    return (  /* => roba presa da https://daisyui.com/components/drawer/ 
    funzione serve solo a incapsulare questo componente*/
    /* => guarda resto del video e vedi come creare i componenti figlio da metterci dentro */
    <div className="App">
    <div className="Drawer">
<input id="my-drawer" type="checkbox" className="drawer-toggle" />
<div className="drawer-content">
  {/* Page content here */}
  <label htmlFor="my-drawer" className="btn btn-primary drawer-button">Open drawer</label>
</div> 
<div className="drawer-side">
  <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
  <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
    {/* Sidebar content here */}
    <li><a>Sidebar Item 1</a></li>
    <li><a>Sidebar Item 2</a></li>
    
  </ul>
</div>
</div>
  </div>
);

}

export default Drawer;

