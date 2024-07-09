import api from "./api";

export const getUser = async () => {
    try {
        const response = await api.get("/getuser");
        return response.data;
    } catch (error) {
        console.log("Error Getting User Info");
        throw error;
    }
}

export const patchUserProfile = async (data) => {
    try {

        const response = await api.patch("/user/profile", data);
        return "updated successfully";
    } catch (error) {
        console.log("Error Updating User Profile")
        return error.response;
    }
}

export const patchUserEmail = async (newEmail) => {

    try {
        const response = await api.patch("/user/newemail", newEmail);
        return response.data;
    } catch (error) {
        console.log("Error Updating User Email");
        throw error;
    }
}

export const patchUserPassword = async (passwords) => {
    try {
        const response = await api.patch("/user/newpassword", passwords)
        return response.status;
    } catch (error) {
        console.log("Error Changing User Password", error);
        return error.response;
    }
}
