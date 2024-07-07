import api from "./api";

export const postDebtRecord = async (data) => {
  try {
    const response = await api.post("/debt", data);
    return response.data;
  } catch (error) {
    console.log("Error Adding Debt Record!");
    throw error;
  }
};

export const getDebtRecord = async () => {
  try {
    const response = await api.get("/debts");
    return response;
  } catch (error) {
    console.log("Error fetching debt records");
    throw error;
  }
};

export const getDebtRecordID = async (debtID) => {
  try {
    const response = await api.get(`/debt/${debtID}`);
    return response.data;
  } catch (error) {
    console.log("Error fetching debt record");
    throw error;
  }
};

export const patchDebtRecord = async (debtID, data) => {
  try {
    const response = await api.patch(`/debt/${debtID}`, data);
    return response.data;

  } catch (error) {
    console.log("Error patching the data");
    throw error;
  }

}

export const deleteDebtRecord = async (debtID) => {
  try {
    const response = await api.delete(`/debt/${debtID}`);
    return response;
  } catch (error) {
    console.log("Error deleting debt record");
    throw error;
  }
}


