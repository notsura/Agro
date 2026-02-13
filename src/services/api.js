const API_BASE = 'http://localhost:5000/api';

export const api = {
    async get(endpoint) {
        const token = localStorage.getItem('agro_token');
        const response = await fetch(`${API_BASE}${endpoint}`, {
            headers: {
                'Authorization': token ? `Bearer ${token}` : ''
            }
        });
        return response.json();
    },
    async post(endpoint, data) {
        const token = localStorage.getItem('agro_token');
        const response = await fetch(`${API_BASE}${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token ? `Bearer ${token}` : ''
            },
            body: JSON.stringify(data)
        });
        return response.json();
    }
};
