import { WorkoutModel } from "../models/Workoutmodel";
const API_URL = 'http://localhost:8080/fitness/api/v1/workouts';

export const workoutService = {
    async saveWorkout(workout: WorkoutModel) {
        console.log(workout);
        const response = await fetch(`${API_URL}/add`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(workout),
        });

        if (!response.ok) {
            throw new Error("Failed to save workout");
        }
        return response.json();
    },

    async getWorkouts(date: string, type: string) {
        const queryParams = new URLSearchParams({ date, type }).toString();
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

    async deleteWorkout(workoutId: number) {
        const response = await fetch(`${API_URL}/${workoutId}`, {
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

    async updateWorkout(workout: WorkoutModel, id: number) {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(workout),
        });

        if (!response.ok) {
            throw new Error("Failed to update workout");
        }
        return response.json();
    }
};
