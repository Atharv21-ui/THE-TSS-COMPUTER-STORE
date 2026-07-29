import { auth } from '../config/firebase';

const getApiBase = () => {
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }
  
  if (typeof window === 'undefined') return '/api';
  
  const host = window.location.hostname;
  const isLocal = host === 'localhost' || 
                  host === '127.0.0.1' || 
                  /^192\.168\.\d{1,3}\.\d{1,3}$/.test(host);
  
  if (isLocal) {
    return 'http://localhost:5000/api';
  }
  
  // Default Render deployment URL
  return 'https://the-tss-computer-store.onrender.com/api';
};

const API_BASE = getApiBase();

async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const headers: Record<string, string> = {
    ...(options.headers as Record<string, string> || {}),
  };

  // Only set application/json if Content-Type isn't already handled (e.g. by FormData via browser)
  if (!(options.body instanceof FormData) && !headers['Content-Type']) {
    headers['Content-Type'] = 'application/json';
  }

  // Inject Firebase ID Token if user is logged in
  if (auth.currentUser) {
    try {
      const token = await auth.currentUser.getIdToken();
      headers['Authorization'] = `Bearer ${token}`;
    } catch (error) {
      console.error("Error getting ID token", error);
    }
  }

  const config: RequestInit = {
    ...options,
    headers,
    credentials: 'omit', // No longer rely on cookies, using Bearer tokens
    cache: 'no-store' // Prevent browser caching of GET requests to fix stale polling
  };

  const response = await fetch(`${API_BASE}${endpoint}`, config);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong');
  }

  return data as T;
}

export const api = {
  get: <T>(endpoint: string, options?: RequestInit) => 
    request<T>(endpoint, { ...options, method: 'GET' }),
    
  post: <T>(endpoint: string, body: any, options?: RequestInit) => {
    const isFormData = body instanceof FormData;
    // If it's FormData, let the browser set the Content-Type header with the boundary
    if (isFormData) {
      if (options?.headers) {
        delete (options.headers as any)['Content-Type'];
      }
    }
    return request<T>(endpoint, { 
      ...options, 
      method: 'POST', 
      body: isFormData ? body : JSON.stringify(body) 
    });
  },
    
  put: <T>(endpoint: string, body: any, options?: RequestInit) => {
    const isFormData = body instanceof FormData;
    if (isFormData) {
      if (options?.headers) {
        delete (options.headers as any)['Content-Type'];
      }
    }
    return request<T>(endpoint, { 
      ...options, 
      method: 'PUT', 
      body: isFormData ? body : JSON.stringify(body) 
    });
  },
    
  patch: <T>(endpoint: string, body: any, options?: RequestInit) => 
    request<T>(endpoint, { 
      ...options, 
      method: 'PATCH', 
      body: JSON.stringify(body) 
    }),
    
  delete: <T>(endpoint: string, options?: RequestInit) => 
    request<T>(endpoint, { ...options, method: 'DELETE' }),
};
