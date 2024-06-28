import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: `${process.env.STORY_URL}/graphql`,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export default axiosInstance;

export async function fetcher<T>(url: string): Promise<T> {
  return await axiosInstance.get<T>(url).then((res) => res.data);
}
