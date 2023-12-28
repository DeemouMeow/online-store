import axios from "axios";

export const API_URL = "http://localhost:5000/api";

const $api = axios.create({
    baseURL: API_URL
});

$api.interceptors.request.use(config => {
    const token = localStorage.getItem("token");
    config.headers.Authorization = "Bearer " + token;
    
    return config;
});

$api.interceptors.response.use(config => config,
    async error => {
        const config = error.config;
        
        if (config && !config.isRetry && error.response.status === 401) {
            config.isRetry = true;
            try {
                console.log("In interceptor", config);
                const response = await $api.get("/user/auth", { withCredentials: true });
                console.log("Response", response);
                
                localStorage.setItem("token", response.data.accessToken);

                return $api.request(config);
            } catch (e) {
                console.log("Unauthorized!");
            }
        };

        throw error;
    });

export default $api;