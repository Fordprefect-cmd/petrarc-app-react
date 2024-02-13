import React from 'react';

export const Drawer = () => {
  return (
    <div className="App">
      <div className="Drawer custom-drawer"> {/* Apply the custom-drawer class */}
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-button">
          <label htmlFor="my-drawer" className="btn btn-primary drawer-button">Open drawer</label>
        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
          <ul className="menu p-4 w-50 min-h-full bg-base-200 text-base-content">
            {/* Sidebar content here */}
            <div className="Menu-buttons"> 
              <li><a>Sidebar Item 1</a></li>
              <li><a>Sidebar Item 2</a></li>
            </div> 
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Drawer;
