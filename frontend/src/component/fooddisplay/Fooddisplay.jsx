import React, { useContext } from 'react';
import './Fooddisplay.css';
import { StoreContext } from '../../context/Storecontext';
import Fooditem from '../Fooditem/Fooditem';

const Fooddisplay = ({ Category }) => {
  const { food_list } = useContext(StoreContext);

  return (
    <div className='Food-display' id='Food-display'>
      <h2>Top dishes near you</h2>
      <div className="food-diplayed-list">
        {food_list.map((item, index) => {
          if (Category === "All" || Category === item.category) {
            return (
              <Fooditem
                key={index}
                id={item._id}
                name={item.name}
                description={item.description}
                price={item.price}
                image={item.image}
              />
            );
          }
          return null;
        })}
      </div>
    </div>
  );
};

export default Fooddisplay;
