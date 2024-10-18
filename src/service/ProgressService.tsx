import { ProgressModel } from "../models/ProgressModel";
const API_URL = 'http://localhost:8080/fitness/api/v1/progress';

export const progressService = {
    async saveWorkout(progress: ProgressModel) {
        console.log(progress);
        const response = await fetch(`${API_URL}/add`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(progress),
        });

        if (!response.ok) {
            throw new Error("Failed to save progress");
        }
        return response.json();
    },

    async getProgresses(weight: string, goal: string) {
        const queryParams = new URLSearchParams({ weight, goal }).toString();
        const response = await fetch(`${API_URL}?${queryParams}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error("Failed to fetch workouts");
        }
        return response.json();
    },

    async deleteWorkout(progressId: number) {
        const response = await fetch(`${API_URL}/progressDelete/${progressId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },  
        });

        if (!response.ok) {
            throw new Error("Failed to delete workout");
        }
        return response
    },

    async updateWorkout(progress: ProgressModel, id: number) {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(progress),
        });

        if (!response.ok) {
            throw new Error("Failed to update workout");
        }
        return response.json();
    }
}