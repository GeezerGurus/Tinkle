import api from "./api";

export const postOweDebtItem = async (debtId, data) => {
  try {
    const response = await api.post(`/debt/${debtId}/owe`, data);
    return response.data;
  } catch (error) {
    console.error("Error Adding owe Item");
  }
};

export const getAllOweDebtItems = async (debtId) => {
  try {
    const response = await api.get(`/debt/${debtId}/owes`);
    return response.data;
  } catch (error) {
    console.error("Error Fetching owe Items!");
  }
};

export const getOweDebtItem = async (debtId, oweId) => {
  try {
    const response = await api.get(`/debt/${debtId}/owe/${oweId}`);
    return response.data;
  } catch (error) {
    console.error("Error Fetching owe Item");
  }
};

export const patchOweDebtItem = async (debtId, oweId, data) => {
  try {
    const response = await api.patch(`/debt/${debtId}/owe/${oweId}`, data);
    return response.data;
  } catch (error) {
    console.error("Error Patching owe Item");
  }
};
export const deleteOweDebtItem = async (debtId, oweId) => {
  try {
    const response = await api.delete(`/debt/${debtId}/owe/${oweId}`);
    return response.data;
  } catch (error) {
    console.error("Error Patching owe Item");
  }
};
