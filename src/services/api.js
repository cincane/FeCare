// services/api.js
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:5000';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
  timeout: 30000
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Log full request details
    console.log(`🚀 REQUEST: ${config.method.toUpperCase()} ${config.url}`);
    console.log('Headers:', config.headers);
    console.log('Data:', config.data);
    
    return config;
  },
  (error) => {
    console.error('Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    console.log(`✅ RESPONSE: ${response.config.method.toUpperCase()} ${response.config.url} - ${response.status}`);
    console.log('Response Data:', response.data);
    return response;
  },
  (error) => {
    console.error(`❌ RESPONSE ERROR: ${error.config?.method?.toUpperCase()} ${error.config?.url} - ${error.response?.status}`);
    console.error('Error Data:', error.response?.data);
    console.error('Error Message:', error.message);
    return Promise.reject(error);
  }
);

const apiService = {
  // ============= LOGS =============
  getLogs: async () => {
    try {
      console.log('📋 Fetching logs...');
      const response = await api.get('/log');
      return { 
        success: true, 
        data: Array.isArray(response.data) ? response.data : []
      };
    } catch (error) {
      console.error('❌ Get logs error:', error);
      return { 
        success: false, 
        error: error.response?.data || error.message,
        data: [] 
      };
    }
  },

  addLog: async (date, time) => {
    try {
      console.log('📝 Adding log:', { date, time });
      
      // PASTIKAN FORMATNYA BENAR!
      const payload = {
        date: date, // Format: YYYY-MM-DD
        time: time  // Format: HH:MM
      };
      
      console.log('📦 Payload:', payload);
      
      const response = await api.post('/log', payload);
      
      console.log('✅ Log added:', response.data);
      
      return { 
        success: true, 
        data: response.data 
      };
    } catch (error) {
      console.error('❌ Add log error:', error.response?.data || error);
      return { 
        success: false, 
        error: error.response?.data || error.message 
      };
    }
  },

  deleteLog: async (id) => {
    try {
      console.log('🗑️ Deleting log:', id);
      const response = await api.delete(`/log/${id}`);
      return { 
        success: true, 
        data: response.data 
      };
    } catch (error) {
      console.error('❌ Delete log error:', error);
      return { 
        success: false, 
        error: error.response?.data || error.message 
      };
    }
  },

  // ============= REMINDER =============
  getReminder: async () => {
    try {
      console.log('🔔 Fetching reminder...');
      const response = await api.get('/reminder');
      return { 
        success: true, 
        data: response.data || { enabled: false, time: '19:00' }
      };
    } catch (error) {
      console.error('❌ Get reminder error:', error);
      return { 
        success: false, 
        error: error.response?.data || error.message,
        data: { enabled: false, time: '19:00' }
      };
    }
  },

  updateReminder: async (reminderData) => {
    try {
      console.log('🔄 Updating reminder:', reminderData);
      
      const payload = {
        enabled: reminderData.enabled || false,
        time: reminderData.time || '19:00'
      };
      
      console.log('📦 Payload:', payload);
      
      const response = await api.put('/reminder', payload);
      
      console.log('✅ Reminder updated:', response.data);
      
      return { 
        success: true, 
        data: response.data 
      };
    } catch (error) {
      console.error('❌ Update reminder error:', error.response?.data || error);
      return { 
        success: false, 
        error: error.response?.data || error.message 
      };
    }
  },

  // ============= PUSH TOKEN =============
  savePushToken: async (token) => {
    try {
      console.log('🔑 Saving push token...');
      
      const payload = {
        token: token
      };
      
      console.log('📦 Payload:', payload);
      
      const response = await api.post('/push-token', payload);
      
      console.log('✅ Push token saved:', response.data);
      
      return { 
        success: true, 
        data: response.data 
      };
    } catch (error) {
      console.error('❌ Save push token error:', error.response?.data || error);
      return { 
        success: false, 
        error: error.response?.data || error.message 
      };
    }
  },

  deleteAllPushTokens: async () => {
    try {
      const response = await api.delete('/push-tokens'); // Endpoint untuk hapus semua token
      return { success: true, data: response.data };
    } catch (error) {
      console.error('Delete all tokens error:', error);
      // Jangan return error, biarkan lanjut save token baru
      return { success: false, error: error.message };
    }
  },

  // ============= PUSH TOKEN - RESET! =============
  resetPushTokens: async () => {
    try {
      const response = await api.post('/push-tokens/reset', {});
      return { success: true, data: response.data };
    } catch (error) {
      console.error('Reset tokens error:', error);
      return { success: false, error: error.message };
    }
  },

  checkPushTokens: async () => {
    try {
      const response = await api.get('/push-tokens/check');
      return { success: true, data: response.data };
    } catch (error) {
      console.error('Check tokens error:', error);
      return { success: false, error: error.message };
    }
  },

  // ============= AUTH =============
  login: async (email, password) => {
    try {
      console.log('🔐 Logging in...');
      const response = await api.post('/login', { email, password });
      
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }
      if (response.data.user_id) {
        localStorage.setItem('user_id', response.data.user_id.toString());
      }
      
      console.log('✅ Login success');
      return { success: true, data: response.data };
    } catch (error) {
      console.error('❌ Login error:', error);
      return { success: false, error: error.response?.data || error.message };
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('user_id');
    localStorage.removeItem('fecare-log');
    localStorage.removeItem('fecare-reminder');
    console.log('👋 Logged out');
    return { success: true };
  }
};

export default apiService;