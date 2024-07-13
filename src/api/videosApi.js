import api from "./api";

export const getVideos = async () => {
  try {
    const response = await api.get("/videos");
    return response.data;
  } catch (error) {
    console.error("Error fetching videos:", error);
  }
};

export const getFavoriteVideos = async () => {
  try {
    const response = await api.get("/videos/favourite");
    return response.data;
  } catch (error) {
    console.error("Error fetching Videos:", error);
  }
};

export const patchVideo = async (videoId, updatedData) => {
  try {
    const response = await api.patch(`/video/${videoId}`, updatedData);
    return response.data;
  } catch (error) {
    console.error(`Error updating Videos ${videoId}:`, error);
  }
};
export const postFavVideos = async (videoId, data) => {
  try {
    const response = await api.post(`/video/${videoId}`, data);
    return response.data;
  } catch (error) {
    console.error("Error adding Favourite:", error);
  }
};
export const deleteFavVideos = async (videoId) => {
  try {
    const response = await api.delete(`/video/${videoId}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting Favourite${videoId}:`, error);
  }
};
