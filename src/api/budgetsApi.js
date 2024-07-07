import api from "./api";

export const getBudgets = async () => {
  try {
    const response = await api.get("/budgets");
    return response.data;
  } catch (error) {
    console.error("Error fetching budgets:", error);
  }
};

export const getBudget = async (budgetId) => {
  try {
    const response = await api.get(`/budget/${budgetId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching budget ${budgetId}:`, error);
  }
};

export const getBudgetPeriodically = async (period) => {
  try {
    const response = await api.get(`/budgets/${period}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching budget ${period}:`, error);
  }
};

export const postBudget = async (data) => {
  try {
    const response = await api.post("/budget", data);
    return response.data;
  } catch (error) {
    console.error("Error adding new budget:", error);
    throw error;
  }
};

export const patchBudget = async (budgetId, updatedData) => {
  try {
    const response = await api.patch(`/budget/${budgetId}`, updatedData);
    return response.data;
  } catch (error) {
    console.error(`Error updating budget ${budgetId}:`, error);
    throw error;
  }
};

export const deleteBudget = async (budgetId) => {
  try {
    const response = await api.delete(`/budget/${budgetId}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting budget ${budgetId}:`, error);
    throw error;
  }
};
