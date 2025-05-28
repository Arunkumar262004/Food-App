import React from 'react';
import './Explorer.css';
import { menu_list } from '../../assets/assets';

function Explorer({ Category, Setcategory }) {
  return (
    <div className='Explore_menu' id='explore-Menu'>
      <h1>Explore Our Menu</h1>
      <p className='explore-menu-text'>
        Choose from a diverse menu featuring a delectable array of dishes
      </p>
      <div className='explore-menulist'>
        {menu_list.map((item, index) => {
          return (
            <div
              onClick={() =>
                Setcategory(prev =>
                  prev === item.menu_name ? 'All' : item.menu_name
                )
              }
              key={index}
              className='explore-menu-list-item'
            >
              <img
                className={Category === item.menu_name ? 'active' : ''}
                src={item.menu_image}
                alt={item.menu_name}
              />
              <p>{item.menu_name}</p>
            </div>
          );
        })}
      </div>
      <hr />
    </div>
  );
}

export default Explorer;
