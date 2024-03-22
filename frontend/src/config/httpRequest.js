import axios from 'axios';

const httpRequest = axios.create({
  //baseURL: 'http://localhost:3000',
  withCredentials: true,
  headers: {
    common: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    },
  },
});

//const controller = new AbortController();

httpRequest.interceptors.request.use(
  function (config) {
    //console.log('config', config);
    return config;
  },
  function (error) {
    // Сделайте что-нибудь с ошибкой запроса
    return Promise.reject(error);
  }
);

httpRequest.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response.status === 401 && !error.config.isRetry) {
      const originalRequest = error.config;
      originalRequest.isRetry = true;

      try {
        const response = await axios.get('/api/auth/refresh', {
          params: {
            refreshToken: localStorage.getItem('refreshToken'),
          },
        });

        localStorage.setItem('refreshToken', response.data.refreshToken);
        localStorage.setItem('accessToken', response.data.accessToken);
        originalRequest.headers.Authorization = `Bearer ${response.data.accessToken}`;
        return httpRequest.request(originalRequest);
      } catch (err) {
        if (err.response.status === 401) {
          localStorage.removeItem('refreshToken');
          localStorage.removeItem('accessToken');
          window.history.replaceState({}, '', '/auth/login');
        } else {
          console.log(err);
        }
      }
    }
    return false;
  }
);

export default httpRequest;
