import axios from "axios";

export function getErrorMessage(err: unknown): string {
  if (axios.isAxiosError(err)) {
    const status = err.response?.status;

    if (status === 404) return "Not Found";
    if (status === 401) return "Need to reconnect";
    if (status !== undefined && status >= 500)
      return "Error at server, Please try again later";
    return "Something went wrong";
  }
  return "Unexpected error occurred";
}
