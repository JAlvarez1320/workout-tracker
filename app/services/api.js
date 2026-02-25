import AsyncStorage from '@react-native-async-storage/async-storage';

// Mock API endpoint
const MOCK_MODE = true; // Set to false to use real API

// Replace with your actual API endpoint later
const API_BASE_URL = 'https://your-api-endpoint.com/api';

class ApiService {
  static async request(endpoint, method = 'GET', body = null, requiresAuth = false) {
    // MOCK MODE - Simulate API responses
    if (MOCK_MODE) {
      await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 1000)); // Simulate network delay

      // Mock responses based on endpoint
      if (endpoint === '/api/login' && method === 'POST') {
        const { email, password } = body;
        if (email && password) {
          return {
            token: 'mock-jwt-token' + Math.random().toString(36).substring(2), // Simulate a unique token
            user: {
              id: 1,
              email: email,
              name: email.split('@')[0] || 'Test User', // Use the part before @ as name
            },
          };
        } else {
          throw new Error('Email and password are required');
        }
      }
      if (endpoint === '/api/user' && method === 'POST') {
        return {
          token: 'mock-jwt-token-' + Math.random().toString(36).substring(2), // Simulate a unique token
          user: {
            id: Math.floor(Math.random() * 1000), // Simulate a unique user ID
            email: body.email,
            name: body.email.split('@')[0] || 'New User',
          },
        };
      }

      if (endpoint === '/api/logout' && method === 'POST') {
        return { success: true };
      }

      // Add more mock endpoints as needed
      throw new Error('No mock implemented for ${method} ${endpoint}');
    }

    // REAL API REQUEST
    const headers = {
      'Content-Type': 'application/json',
    };

    if (requiresAuth) {
      const token = await AsyncStorage.getItem('userToken');
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
    }

    const config = {
      method,
      headers,
    };

    if (body) {
      config.body = JSON.stringify(body);
    }

    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'API request failed');
      }
      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  // Convenience methods for specific API calls
  static async login(email, password) {
    return this.request('/api/login', 'POST', { email, password }, false);
  }

  static async register(userData) {
    return this.request('/api/user', 'POST', userData, false);
  }

  static async logout() {
    return this.request('/api/logout', 'POST', null, true);
  }

  static async getCurrentUser() {
    return this.request('/api/user', 'GET', null, true);
  }
}

export default ApiService;
