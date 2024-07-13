import api from "./api";

export const postGoal = async (data) => {
  try {
    const response = await api.post("/goal", data);
    return response.data;
  } catch (error) {
    console.error("Error adding new goal:", error);
  }
};

export const getGoals = async () => {
  try {
    const response = await api.get("/goals");
    return response.data;
  } catch (error) {
    console.error("Error fetching goals:", error);
  }
};

export const getGoal = async (goalId) => {
  try {
    const response = await api.get(`/goal/${goalId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching goal ${goalId}:`, error);
  }
};

export const patchGoal = async (goalId, updatedData) => {
  try {
    const response = await api.patch(`/goal/${goalId}`, updatedData);
    return response.data;
  } catch (error) {
    console.error(`Error updating goal ${goalId}:`, error);
  }
};

export const deleteGoal = async (goalId) => {
  try {
    const response = await api.delete(`/goal/${goalId}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting goal ${goalId}:`, error);
  }
};
