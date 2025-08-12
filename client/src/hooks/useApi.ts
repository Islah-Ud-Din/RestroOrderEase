import { useState } from 'react';

interface UseApiResult<T> {
  data: T | null;
  error: string | null;
  loading: boolean;
  getMethod: <R = T>(url: string, options?: RequestInit) => Promise<R | null | void>;
  postMethod: <R = T>(url: string, body?: unknown, options?: RequestInit) => Promise<R | null | void>;
}

interface UseApiOptions {
  baseUrl?: string;
}

function useApi<T = unknown>(options?: UseApiOptions): UseApiResult<T> {
  const baseUrl = options?.baseUrl || 'http://localhost:6070';
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const getMethod = async <R = T>(url: string, options?: RequestInit): Promise<R | null | void> => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(baseUrl + url, { ...options, method: 'GET' });
      if (!res.ok) throw new Error(`Error: ${res.status}`);
      const json: R = await res.json();
      setData(json as unknown as T);
      return json;
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  const postMethod = async <R = T>(url: string, body?: unknown, options?: RequestInit): Promise<R | null | void> => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(baseUrl + url, {
        ...options,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(options?.headers || {}),
        },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error(`Error: ${res.status}`);
      const json: R = await res.json();
      setData(json as unknown as T);
      return json;
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  return { data, error, loading, getMethod, postMethod };
}

export default useApi;
