// CartContext.js
import { createContext, useReducer, useContext } from "react";

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_ITEM":
  const existingItem = state.items.find((item) => item.id === action.payload.id);

  if (existingItem) {
    // If the item already exists, increment the quantity
    const updatedItems = state.items.map((item) =>
      item.id === existingItem.id ? { ...item, quantity: item.quantity + 1 } : item
    );

    return {
      ...state,
      items: updatedItems,
    };
  } else {
    // If the item is not in the cart, add it with quantity 1
    return {
      ...state,
      items: [...state.items, { ...action.payload, quantity: 1 }],
    };
  }

    case "REMOVE_ITEM":
      const updatedItems = state.items.map((item) => {
        if (item.id === action.payload && item.quantity > 1) {
          // Decrement quantity if greater than 1
          return { ...item, quantity: item.quantity - 1 };
        } else if (item.id === action.payload && item.quantity === 1) {
          // Remove the item if the quantity is 1
          return null;
        } else {
          return item;
        }
      });

      return {
        ...state,
        items: updatedItems.filter(Boolean), // Remove null entries
      };

    case "CLEAR_CART":
      return {
        ...state,
        items: [],
      };

      case "CALCULATE_TOTAL":
      const total = state.items.reduce((acc, item) => acc + item.quantity * item.price, 0);
      return {
        ...state,
        total,
      };

    default:
      return state;
  }
};

const CartProvider = ({ children }) => {
  const [cartState, dispatch] = useReducer(cartReducer, {
    items: [],
    total: 0,
  });

  const addItemToCart = (item) => {
    dispatch({ type: "ADD_ITEM", payload: item });
    dispatch({ type: "CALCULATE_TOTAL" });
  };

  const removeItemFromCart = (itemId) => {
    dispatch({ type: "REMOVE_ITEM", payload: itemId });
    dispatch({ type: "CALCULATE_TOTAL" });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
    dispatch({ type: "CALCULATE_TOTAL" });
  };

  return (
    <CartContext.Provider
      value={{
        cart: cartState.items,
        addItem: addItemToCart,
        removeItem: removeItemFromCart,
        clearCart,
        total: cartState.total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export { CartProvider, useCart };
