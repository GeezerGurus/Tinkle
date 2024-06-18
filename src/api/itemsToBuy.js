// api/ItemsToBuyContext.js
import React, { createContext, useContext, useState } from "react";
import api from "./api";

const ItemsToBuyContext = createContext();

export const ItemsToBuyProvider = ({ children }) => {
  const [items, setItems] = useState([]);

  const getItems = async () => {
    try {
      const response = await api.get("/items");
      setItems(response.data); // Update state with fetched items
    } catch (error) {
      console.error("Error fetching items:", error);
      throw error;
    }
  };

  const deleteItem = async (itemId) => {
    try {
      await api.delete(`/items/${itemId}`);
      // Optionally update items state after deletion
      setItems(items.filter((item) => item.id !== itemId));
    } catch (error) {
      console.error(`Error deleting item ${itemId}:`, error);
      throw error;
    }
  };

  const updateItem = async (itemId, newData) => {
    try {
      await api.patch(`/items/${itemId}`, newData);
      // Optionally update items state after update
      setItems(
        items.map((item) =>
          item.id === itemId ? { ...item, ...newData } : item
        )
      );
    } catch (error) {
      console.error(`Error updating item ${itemId}:`, error);
      throw error;
    }
  };

  return (
    <ItemsToBuyContext.Provider
      value={{ items, getItems, deleteItem, updateItem }}
    >
      {children}
    </ItemsToBuyContext.Provider>
  );
};

export const useApi = () => {
  return useContext(ItemsToBuyContext);
};
