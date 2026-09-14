import { useState } from "react";
import api from "../api/api";
import { getErrorMessage } from "../utils/handleApiError";

type HttpMethod = "get" | "post" | "put" | "patch" | "delete";

interface ExecuteProps {
  method: HttpMethod;
  url: string;
  data?: unknown;
  params?: Record<string, unknown>;
}

interface UseExecuteResult<T> {
  data: T | undefined;
  loading: boolean;
  error: string | null;
  execute: (props: ExecuteProps) => Promise<T | undefined>;
  reset: () => void;
}

export function useExecute<T>(): UseExecuteResult<T> {
  const [data, setData] = useState<T>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const execute = async ({
    method,
    url,
    data: body,
    params,
  }: ExecuteProps): Promise<T | undefined> => {
    setLoading(true);
    setError(null);

    try {
      const hasBody = ["post", "put", "patch"].includes(method);

      const res = hasBody
        ? await api[method]<T>(url, body, { params })
        : await api[method]<T>(url, { params });

      setData(res.data);
      return res.data;
    } catch (err) {
      setError(getErrorMessage(err));
      return undefined;
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setData(undefined);
    setError(null);
  };

  return { data, loading, error, execute, reset };
}

export default useExecute;
