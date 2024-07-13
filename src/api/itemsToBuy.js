import api from "./api";

// /users/5faabc3fe0baf627b85e6a2d/itemstobuy

export const getItemsToBuy = async (tobuylistId) => {
  try {
    const response = await api.get(`/tobuylist/${tobuylistId}/itemstobuy`);
    return response.data;
  } catch (error) {
    console.error("Error fetching items:", error);
  }
};

export const postItemsToBuy = async (tobuylistId, Data) => {
  try {
    const response = await api.post(
      `/tobuylist/${tobuylistId}/itemtobuy`,
      Data
    );
    return response.data;
  } catch (error) {
    console.error("Error adding new item:", error);
  }
};

export const patchItemToBuy = async (tobuylistId, itemtobuyId, updatedData) => {
  try {
    const response = await api.patch(
      `/tobuylist/${tobuylistId}/itemtobuy/${itemtobuyId}`,
      updatedData
    );
    return response.data;
  } catch (error) {
    console.error(`Error updating item ${itemtobuyId}:`, error);
  }
};

export const deleteItemToBuy = async (tobuylistId, itemtobuyId) => {
  try {
    const response = await api.delete(
      `/tobuylist/${tobuylistId}/itemtobuy/${itemtobuyId}`
    );
    return response.data;
  } catch (error) {
    console.error(`Error deleting item ${itemtobuyId}:`, error);
  }
};
