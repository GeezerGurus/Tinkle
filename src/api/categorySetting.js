import api from "./api";

// Add Category
export const postCategory = async (data) => {
    try {
        const response = await api.post("/category", data);
        return response.data;
    } catch (error) {
        console.error("Error adding new category:", error);
        throw error;
    }
};

// Get Categories
export const getCategories = async () => {
    try {
        const response = await api.get("/categories");
        return response.data;
    } catch (error) {
        console.error("Error fetching categories:", error);
        throw error;
    }
};

// Get Single Category
export const getCategory = async (categoryId) => {
    try {
        const response = await api.get(`/category/${categoryId}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching category ${categoryId}:`, error);
        throw error;
    }
};

// Update Category
export const patchCategory = async (categoryId, updatedData) => {
    try {
        const response = await api.patch(`/category/${categoryId}`, updatedData);
        return response.data;
    } catch (error) {
        console.error(`Error updating category ${categoryId}:`, error);
        throw error;
    }
};

// Delete Category
export const deleteCategory = async (categoryId) => {
    try {
        const response = await api.delete(`/category/${categoryId}`);
        return response.data;
    } catch (error) {
        console.error(`Error deleting category ${categoryId}:`, error);
        throw error;
    }
};
