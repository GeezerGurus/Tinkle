import api from "./api";


export const postOweDebtItem = async (debtId, data) => {
    try {
        const response = await api.post(`/debt/${debtId}/owe`, data);
        return response.data;
    } catch (error) {
        console.log("Error Adding owe Item");
        throw error;
    }

}

export const getAllOweDebtItems = async (debtId) => {
    try {
        const response = await api.get(`/debt/${debtId}/owes`);
        return response.data;
    } catch (error) {
        console.log("Error Fetching owe Items!");
        throw error;
    }
}

export const getOweDebtItem = async (debtId, oweId) => {
    try {
        const response = await api.get(`/debt/${debtId}/owe/${oweId}`);
        return response.data;

    } catch (error) {
        console.log("Error Fetching owe Item");
        throw error;
    }
}

export const patchOweDebtItem = async (debtId, oweId, data) => {
    try {
        const response = await api.patch(`/debt/${debtId}/owe/${oweId}`, data);
        return response.data;

    } catch (error) {
        console.log("Error Patching owe Item");
        throw error
    }
}
export const deleteOweDebtItem = async (debtId, oweId) => {
    try {
        const response = await api.delete(`/debt/${debtId}/owe/${oweId}`);
        return response.data;

    } catch (error) {
        console.log("Error Patching owe Item");
        throw error
    }
}
