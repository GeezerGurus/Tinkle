
import api from "./api";

export const postDebtRecord = async () => {
    try {
        const response = await api.post("/debt");
        return response
    }
    catch (error) {
        console.log("Error Adding Debt Record!");
        throw (error)
    }
}

export const getDebtRecord = async () => {
    try {
        const response = await api.post("/debts");
        return response
    }
    catch (error) {
        console.log("Error fetching records");
        throw (error)
    }
}

