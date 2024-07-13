import api from "./api";

export const getBooks = async () => {
  try {
    const response = await api.get("/books");
    return response.data;
  } catch (error) {
    console.error("Error fetching Books:", error);
  }
};

export const getBook = async (bookId) => {
  try {
    const response = await api.get(`/book/${bookId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching the book:", error);
  }
};

export const getFavoriteBooks = async () => {
  try {
    const response = await api.get("/books/favourite");
    return response.data;
  } catch (error) {
    console.error("Error fetching Books:", error);
  }
};
export const postFavouriteBook = async (bookId, data) => {
  try {
    const response = await api.post(`/video/${bookId}`, data);
    return response.data;
  } catch (error) {
    console.error("Error adding Favourite:", error);
  }
};

export const deleteFavouriteBook = async (bookId) => {
  try {
    const response = await api.delete(`/video/${bookId}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting Favourite${bookId}:`, error);
  }
};

export const patchBook = async (bookId, updatedData) => {
  try {
    const response = await api.patch(`/book/${bookId}`, updatedData);
    return response.data;
  } catch (error) {
    console.error(`Error updating Books ${bookId}:`, error);
  }
};
