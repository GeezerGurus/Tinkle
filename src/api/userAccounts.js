import api from "./api";

export const getUser = async () => {
  try {
    const response = await api.get("/getuser");
    return response.data;
  } catch (error) {
    console.error("Error Getting User Info");
  }
};

export const patchUserProfile = async (data) => {
  try {
    const response = await api.patch("/user/profile", data);
    return "updated successfully";
  } catch (error) {
    console.error("Error Updating User Profile");
    return error.response;
  }
};

export const patchUserEmail = async (newEmail) => {
  try {
    const response = await api.patch("/user/newemail", newEmail);
    return response.data;
  } catch (error) {
    console.error("Error Updating User Email");
  }
};

export const patchUserPassword = async (passwords) => {
  try {
    const response = await api.patch("/user/newpassword", passwords);
    return response.status;
  } catch (error) {
    console.error("Error Changing User Password", error);
    return error.response;
  }
};

export const updateProfilePic = async (data) => {
  try {
    const response = await api.post("/user/profile/photo", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  } catch (error) {
    console.error("Error Updating Profile Pic");
  }
};
