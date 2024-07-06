import api from "./api";

export const getListsToBuy = async () => {
  try {
    const response = await api.get("/tobuylists");
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching lists:", error);
  }
};

export const postListToBuy = async (data) => {
  try {
    const response = await api.post("/tobuylist", data);
    return response.data;
  } catch (error) {
    console.error("Error adding new list:", error);
    throw error;
  }
};

export const patchListToBuy = async (tobuylistId, updatedData) => {
  try {
    const response = await api.patch(`/tobuylist/${tobuylistId}`, updatedData);
    return response.data;
  } catch (error) {
    console.error(`Error updating list ${tobuylistId}:`, error);
    throw error;
  }
};

export const deleteListToBuy = async (tobuylistId) => {
  try {
    const response = await api.delete(`/tobuylist/${tobuylistId}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting list ${tobuylistId}:`, error);
    throw error;
  }
};
