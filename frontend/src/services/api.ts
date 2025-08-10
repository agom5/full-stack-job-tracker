import axios from 'axios';
import type { User, UserCreate, Job, JobCreate, JobUpdate } from '../types';

interface TokenResponse {
  access_token: string;
  token_type: string;
}

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000',
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      if (!config.headers) {
        config.headers = {};
      }
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// This interceptor CHECKS responses from the backend for expired sessions
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      window.location.reload();
      alert('Your session has expired. Please log in again.');
    }
    return Promise.reject(error);
  }
);

export const apiService = {
  login: async (formData: URLSearchParams) => {
    const { data } = await api.post<TokenResponse>('/token', formData);
    if (data.access_token) {
      localStorage.setItem('token', data.access_token);
    }
    return data;
  },

  register: async (userData: UserCreate) => {
    const { data } = await api.post('/users/', userData);
    return data;
  },

  getCurrentUser: async (): Promise<User> => {
    const { data } = await api.get<User>('/users/me');
    return data;
  },

  getJobs: async (status?: string): Promise<Job[]> => {
    // Pass the status as a query parameter if it exists
    const { data } = await api.get<Job[]>('/jobs/', {
      params: { status },
    });
    return data;
  },

  deleteJob: async (jobId: number) => {
    await api.delete(`/jobs/${jobId}`);
  },

  createJob: async (jobData: JobCreate): Promise<Job> => {
    const { data } = await api.post<Job>('/jobs/', jobData);
    return data;
  },

  updateJob: async (jobId: number, jobData: JobUpdate): Promise<Job> => {
    const { data } = await api.put<Job>(`/jobs/${jobId}`, jobData);
    return data;
  },
};
