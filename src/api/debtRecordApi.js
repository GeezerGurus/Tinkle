import api from "./api";

export const postDebtRecord = async (data) => {
  try {
    const response = await api.post("/debt", data);
    return response.data;
  } catch (error) {
    console.error("Error Adding Debt Record!");
  }
};

export const getDebtRecord = async () => {
  try {
    const response = await api.get("/debts");
    return response;
  } catch (error) {
    console.error("Error fetching debt records");
  }
};

export const getDebtRecordID = async (debtID) => {
  try {
    const response = await api.get(`/debt/${debtID}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching debt record");
  }
};

export const patchDebtRecord = async (debtID, data) => {
  try {
    const response = await api.patch(`/debt/${debtID}`, data);
    return response.data;
  } catch (error) {
    console.error("Error patching the data");
  }
};

export const deleteDebtRecord = async (debtID) => {
  try {
    const response = await api.delete(`/debt/${debtID}`);
    return response;
  } catch (error) {
    console.error("Error deleting debt record");
  }
};
