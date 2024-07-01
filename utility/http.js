import axios from "axios";

const BACKEND_URL = 'https://expense-tracker-app-f4834-default-rtdb.firebaseio.com';

export async function storeExpense(expenseData) {
    try {
        const response = await axios.post(`${BACKEND_URL}/expenses.json`, expenseData);
        const id = response.data.name;
        return id;
    } catch (error) {
        console.error('Error storing expense:', error);
        throw error; 
    }
}

export async function fetchExpense() {
    try {
        const response = await axios.get(`${BACKEND_URL}/expenses.json`);
        const expenses = [];
        for (const key in response.data) {
            const expenseObj = {
                id: key,
                amount: response.data[key].amount,
                date: new Date(response.data[key].date),
                description: response.data[key].description
            };
            expenses.push(expenseObj);
        }
        return expenses;
    } catch (error) {
        console.error('Error fetching expense:', error);
        throw error; 
    }
}

export const updateExpense = async (id, expenseData) => {
    try {
        return await axios.put(`${BACKEND_URL}/expenses/${id}.json`, expenseData);
    } catch (error) {
        console.error('Error updating expense:', error);
        throw error; 
    }
};

export const deleteExpense = async (id) => {
    try {
        return await axios.delete(`${BACKEND_URL}/expenses/${id}.json`);
    } catch (error) {
        console.error('Error deleting expense:', error);
        throw error; 
    }
};
