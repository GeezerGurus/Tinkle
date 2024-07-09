import api from "./api";

export const getBooks = async () => {
    try {
      const response = await api.get("/books");
      return response.data;
    } catch (error) {
      console.error("Error fetching Books:", error);
    }
  };

  export const getFavoriteBooks = async () => {
    try {
      const response = await api.get("/books/favorite");
      return response.data;
    } catch (error) {
      console.error("Error fetching Books:", error);
    }
  };

  export const patchBook = async (bookId, updatedData) => {
    try {
      const response = await api.patch(`/book/${bookId}`, updatedData);
      return response.data;
    } catch (error) {
      console.error(`Error updating Books ${bookId}:`, error);
      throw error;
    }
  };