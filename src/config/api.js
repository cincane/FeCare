const API_URL = "http://127.0.0.1:5000";

export const getToken = () => localStorage.getItem("token");
export const setToken = (token) => localStorage.setItem("token", token);
export const removeToken = () => localStorage.removeItem("token");

const fetchWithAuth = async (url, options = {}) => {
  const token = getToken();
  
  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };
  
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  
  try {
    const response = await fetch(`${API_URL}${url}`, {
      ...options,
      headers,
    });
    
    let data;
    try {
      data = await response.json();
    } catch (e) {
      data = { msg: "Invalid response format" };
    }
    
    // Handle 422 Unprocessable Entity
    if (response.status === 422) {
      console.error("Validation error:", data);
      // Jangan logout, hanya return error
      return { status: response.status, data: { msg: "Data tidak valid", ...data } };
    }
    
    if (response.status === 401) {
      removeToken();
      window.location.href = "/signin";
      throw new Error("Session expired");
    }
    
    return { status: response.status, data };
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

// AUTH
export const register = async (data) => {
  try {
    const response = await fetchWithAuth("/register", { 
      method: "POST", 
      body: JSON.stringify(data) 
    });
    return response.data;
  } catch (error) {
    return { msg: "Network error" };
  }
};

export const login = async (data) => {
  try {
    const response = await fetchWithAuth("/login", { 
      method: "POST", 
      body: JSON.stringify(data) 
    });
    return response.data;
  } catch (error) {
    return { msg: "Network error" };
  }
};

// LOGS - SKIP DULU KARENA ERROR 422
export const getLogs = async () => {
  try {
    const response = await fetchWithAuth("/log", { method: "GET" });
    // Jika error 422, return array kosong
    if (response.status === 422) {
      return [];
    }
    return response.data || [];
  } catch (error) {
    console.error("Get logs error:", error);
    return []; // Return empty array jika error
  }
};

export const addLog = async (data) => {
  try {
    const response = await fetchWithAuth("/log", { 
      method: "POST", 
      body: JSON.stringify(data) 
    });
    if (response.status === 422) {
      return { msg: "Format data tidak valid" };
    }
    return response.data;
  } catch (error) {
    return { msg: "Network error" };
  }
};

export const deleteLog = async (id) => {
  try {
    const response = await fetchWithAuth(`/log/${id}`, { method: "DELETE" });
    if (response.status === 422) {
      return { msg: "ID tidak valid" };
    }
    return response.data;
  } catch (error) {
    return { msg: "Network error" };
  }
};

// REMINDER
export const getReminder = async () => {
  try {
    const response = await fetchWithAuth("/reminder", { method: "GET" });
    if (response.status === 422) {
      return { enabled: false, time: "19:00" };
    }
    return response.data || { enabled: false, time: "19:00" };
  } catch (error) {
    return { enabled: false, time: "19:00" };
  }
};

export const updateReminder = async (data) => {
  try {
    const response = await fetchWithAuth("/reminder", { 
      method: "PUT", 
      body: JSON.stringify(data) 
    });
    if (response.status === 422) {
      return { msg: "Format data tidak valid" };
    }
    return response.data;
  } catch (error) {
    return { msg: "Network error" };
  }
};

export const savePushToken = async (token) => {
  try {
    const response = await fetchWithAuth("/push-token", { 
      method: "POST", 
      body: JSON.stringify({ token }) 
    });
    if (response.status === 422) {
      return { msg: "Token tidak valid" };
    }
    return response.data;
  } catch (error) {
    return { msg: "Network error" };
  }
};

const api = {
  register,
  login,
  getLogs,
  addLog,
  deleteLog,
  getReminder,
  updateReminder,
  savePushToken,
  getToken,
  setToken,
  removeToken
};

export default api;