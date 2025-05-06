import { createContext, useState } from "react";
import { food_list } from "../assets/assets";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});

  const addToCart = (itemID) => {
    setCartItems((prev) => ({
      ...prev,
      [itemID]: (prev[itemID] || 0) + 1,
    }));
  };

  const removeItemFromCart = (itemID) => {
    setCartItems((prev) => {
      if (!prev[itemID]) return prev;
      const updated = { ...prev, [itemID]: prev[itemID] - 1 };
      if (updated[itemID] <= 0) delete updated[itemID];
      return updated;
    });
  };

  const get_total_Cart_amount = () => {
    let total_amount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let iteminfo = food_list.find((product) => product._id === item);
        if (iteminfo) {
          total_amount += iteminfo.price * cartItems[item];
        }
      }
    }
    return total_amount;
  };
  

  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeItemFromCart,
    get_total_Cart_amount
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
