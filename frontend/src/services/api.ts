
// Base API configuration
const API_BASE_URL =
  import.meta.env.MODE === "production"
    ? "https://server-6gqh.onrender.com/api"
    : "http://localhost:8080/api"

// HTTP methods type
type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH"

// Request options type
interface FetchOptions {
  method?: HttpMethod
  headers?: HeadersInit
  body?: any
  cache?: RequestCache
  next?: NextFetchRequestConfig
  credentials?: RequestCredentials
}

interface NextFetchRequestConfig {
  revalidate?: number | false
  tags?: string[]
}

// Error response type
export interface ApiError {
  status: number
  message: string
  errors?: Record<string, string[]>
  code?: string
}

/**
 * Typed fetch function for API requests
 * @param endpoint - API endpoint path
 * @param options - Fetch options
 * @returns Promise with typed response
 */
export async function apiFetch<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
  const url = endpoint.startsWith("http") ? endpoint : `${API_BASE_URL}${endpoint}`

  // Default headers
  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  }

  // Prepare request options
  const fetchOptions: RequestInit = {
    method: options.method || "GET",
    headers,
    credentials: options.credentials ,
    cache: options.cache,
    // next: options.next, // Removed because it's not part of RequestInit
  }

  // Add body for non-GET requests
  if (options.body && options.method !== "GET") {
    fetchOptions.body = JSON.stringify(options.body)
  }

  try {
    const response = await fetch(url, fetchOptions)

    // Handle non-JSON responses
    const contentType = response.headers.get("content-type")
    if (contentType && contentType.includes("application/json")) {
      const data = await response.json()

      // Handle API errors
      if (!response.ok) {
        // Extract error information
        const apiError: ApiError = {
          status: response.status,
          message: data.message || response.statusText,
          errors: data.errors,
          code: data.code || getErrorCodeFromStatus(response.status),
        }
        
        console.error(`API Error [${response.status}]:`, apiError);
        throw apiError
      }

      return data as T
    } else {
      // Handle non-JSON responses (like blob, text, etc.)
      if (!response.ok) {
        const errorText = await response.text();
        const apiError: ApiError = {
          status: response.status,
          message: errorText || response.statusText,
          code: getErrorCodeFromStatus(response.status),
        }
        
        console.error(`API Error [${response.status}]:`, apiError);
        throw apiError
      }

      return (await response.text()) as unknown as T
    }
  } catch (error) {
    if ((error as ApiError).status) {
      throw error
    }

    // Handle network errors
    const networkError: ApiError = {
      status: 0,
      message: "Network error. Please check your connection.",
      code: "NETWORK_ERROR"
    };
    
    console.error("Network Error:", networkError);
    throw networkError;
  }
}

/**
 * Generate an error code from HTTP status
 */
function getErrorCodeFromStatus(status: number): string {
  switch (status) {
    case 400:
      return "BAD_REQUEST";
    case 401:
      return "UNAUTHORIZED";
    case 403:
      return "FORBIDDEN";
    case 404:
      return "NOT_FOUND";
    case 422:
      return "VALIDATION_ERROR";
    case 429:
      return "TOO_MANY_REQUESTS";
    case 500:
      return "SERVER_ERROR";
    default:
      return `HTTP_ERROR_${status}`;
  }
}

/**
 * API client with typed methods
 */
export const apiClient = {
  get<T>(endpoint: string, options: Omit<FetchOptions, "method" | "body"> = {}) {
    return apiFetch<T>(endpoint, { ...options, method: "GET" })
  },

  post<T>(endpoint: string, data?: any, options: Omit<FetchOptions, "method"> = {}) {
    return apiFetch<T>(endpoint, { ...options, method: "POST", body: data })
  },

  put<T>(endpoint: string, data?: any, options: Omit<FetchOptions, "method"> = {}) {
    return apiFetch<T>(endpoint, { ...options, method: "PUT", body: data })
  },

  patch<T>(endpoint: string, data?: any, options: Omit<FetchOptions, "method"> = {}) {
    return apiFetch<T>(endpoint, { ...options, method: "PATCH", body: data })
  },

  delete<T>(endpoint: string, options: Omit<FetchOptions, "method"> = {}) {
    return apiFetch<T>(endpoint, { ...options, method: "DELETE" })
  },
}
