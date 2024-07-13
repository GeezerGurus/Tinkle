import api from "./api";

export const postSetting = async () => {
  try {
    const response = await api.post("/setting");
    return response.data;
  } catch (error) {
    console.error("Error adding setting:", error);
  }
};

export const getSettings = async () => {
  try {
    const response = await api.get("/settings");
    return response.data;
  } catch (error) {
    console.error("Error fetching Settings:", error);
  }
};
export const patchSettings = async (settingsId, updatedData) => {
  try {
    const response = await api.patch(`/setting/${settingsId}`, updatedData);
    return response.data;
  } catch (error) {
    console.error(`Error updating settings ${settingsId}:`, error);
  }
};

export const deleteUser = async () => {
  try {
    const response = await api.delete(`/user`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting user:`, error);
  }
};
