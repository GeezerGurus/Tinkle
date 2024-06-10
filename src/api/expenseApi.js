import api from "./api";

export const getExpenses = async () => {
  try {
    const response = await api.get("/expenses");
    return response.data;
  } catch (error) {
    console.error("Error fetching expenses", error);
    throw error;
  }
};

// export const addExpense = async (expense) => {
//   try {
//     const response = await api.post("/expense", expense);
//     return response.data;
//   } catch (error) {
//     console.error("Error adding expense", error);
//     throw error;
//   }
// };
