import api from "./api";

export const getIncomes = async () => {
  try {
    const response = await api.get("/incomes");
    return response.data;
  } catch (error) {
    console.error("Error fetching incomes", error);
    throw error;
  }
};

// export const addIncome = async (income) => {
//   try {
//     const response = await api.post("/incomes", income);
//     return response.data;
//   } catch (error) {
//     console.error("Error adding income", error);
//     throw error;
//   }
// };
