import api from "./api";


export const postLendDebtItem = async (debtId, data) => {
    try {
        const response = await api.post(`/debt/${debtId}/lend`, data);
        return response.data;
    } catch (error) {
        console.log("Error Adding Lend Item");
        throw error;
    }

}

export const getAllLendDebtItems = async (debtId) => {
    try {
        const response = await api.get(`/debt/${debtId}/lends`);
        return response.data;
    } catch (error) {
        console.log("Error Fetching Lend Items!");
        throw error;
    }
}

export const getLendDebtItem = async (debtId, lendId) => {
    try {
        const response = await api.get(`/debt/${debtId}/lend/${lendId}`);
        return response.data;

    } catch (error) {
        console.log("Error Fetching Lend Item");
        throw error;
    }
}

export const patchLendDebtItem = async (debtId, lendId, data) => {
    try {
        const response = await api.patch(`/debt/${debtId}/lend/${lendId}`, data);
        return response.data;

    } catch (error) {
        console.log("Error Patching Lend Item");
        throw error
    }
}
export const deleteLendDebtItem = async (debtId, lendId) => {
    try {
        const response = await api.delete(`/debt/${debtId}/lend/${lendId}`);
        return response.data;

    } catch (error) {
        console.log("Error Patching Lend Item");
        throw error
    }
}

