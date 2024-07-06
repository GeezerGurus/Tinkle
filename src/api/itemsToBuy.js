import api from "./api";

// /users/5faabc3fe0baf627b85e6a2d/itemstobuy

export const getItemsToBuy = async () => {
  try {
    const response = await api.get("/itemstobuy");
    console.log(response);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching items:", error);
  }
};

export const postItemsToBuy = async (updatedData) => {
  try {
    const response = await api.post(
      "/users/5faabc3fe0baf627b85e6a2d/itemstobuy",
      updatedData
    );
    return response.data;
  } catch (error) {
    console.error("Error adding new item:", error);
    throw error;
  }
};

export const patchItemToBuy = async (itemId, updatedData) => {
  try {
    const response = await api.patch(
      `/users/5faabc3fe0baf627b85e6a2d/itemstobuy/${itemId}`,
      updatedData
    );
    return response.data;
  } catch (error) {
    console.error(`Error updating item ${itemId}:`, error);
    throw error;
  }
};

export const deleteItemToBuy = async (itemId) => {
  try {
    const response = await api.delete(`/itemstobuy/${itemId}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting item ${itemId}:`, error);
    throw error;
  }
};
