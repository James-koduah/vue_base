import axios from 'axios';
let base_url = process.env.VUE_APP_API_URL || 'http://localhost:5000'
const apiClient = axios.create({
  baseURL: base_url,
  headers: {
    "Content-Type": 'application/json'
  }
});

apiClient.interceptors.request.use(
  function(config) {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = 'Bearer ' + token;
    }
    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
);

// Response interceptor for handling expired tokens
apiClient.interceptors.response.use(
  function(response) {
    return response;
  },
  async function(error) {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem('refresh_token');
        if (refreshToken) {
          const response = await axios.post(base_url + '/auth/get_refresh_token', {}, {
            headers: {
              'Authorization': 'Bearer ' + refreshToken
            }
          });

          const newAccessToken = response.data.access_token;
          localStorage.setItem('access_token', newAccessToken);

          originalRequest.headers.Authorization = 'Bearer ' + newAccessToken;
          return apiClient(originalRequest);
        }
      } catch (refreshError) {
        console.error('Error refreshing token:', refreshError);
        // Optionally, redirect to login or handle the error
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;
