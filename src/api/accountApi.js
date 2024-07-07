import api from "./api";

export const postAccount = async (data) => {
  try {
    const response = await api.post("/account", data);
    return response.data;
  } catch (error) {
    console.error("Error adding new account:", error);
    throw error;
  }
};
export const getAccounts = async () => {
  try {
    const response = await api.get("/accounts");
    return response.data;
  } catch (error) {
    console.error("Error fetching Accounts:", error);
  }
};
export const patchAccount = async (accountId, updatedData) => {
  try {
    const response = await api.patch(`/account/${accountId}`, updatedData);
    return response.data;
  } catch (error) {
    console.error(`Error updating list ${accountId}:`, error);
    throw error;
  }
};

export const deleteAccount = async (accountId) => {
  try {
    const response = await api.delete(`/account/${accountId}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting list ${accountId}:`, error);
    throw error;
  }
};
