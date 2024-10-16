import { UserModel} from '../models/UserModel';
const API_URL = 'http://localhost:8080/fitness/api/v1/users';

export const UserService = {
    async saveUser(user: UserModel) {
        console.log(user);
        const response = await fetch(`${API_URL}+'/signup'`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        });

        if (!response.ok) {
            throw new Error("Failed to save user");
        }
        return response.json();
    },
    async loginUser(user: UserModel) {
        const response = await fetch(`${API_URL}+'/login'`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        });
        if (!response.ok) {
            throw new Error("Failed to login user");
        }
        return response.json();
    }



};