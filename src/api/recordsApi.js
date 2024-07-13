import api from "./api";

export const getRecords = async () => {
  try {
    const response = await api.get("/records");
    return response.data;
  } catch (error) {
    console.error("Error fetching records:", error);
  }
};

export const getRecord = async (recordId) => {
  try {
    const response = await api.get(`/record/${recordId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching record:", error);
  }
};

export const postRecord = async (data) => {
  try {
    const response = await api.post("/record", data);
    return response.data;
  } catch (error) {
    console.error("Error adding new record:", error);
  }
};

export const patchRecord = async (recordId, updatedData) => {
  try {
    const response = await api.patch(`/record/${recordId}`, updatedData);
    return response.data;
  } catch (error) {
    console.error(`Error updating record ${recordId}:`, error);
  }
};

export const deleteRecord = async (recordId) => {
  try {
    const response = await api.delete(`/record/${recordId}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting record ${recordId}:`, error);
  }
};
