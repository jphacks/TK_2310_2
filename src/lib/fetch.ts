import { API_ENDPOINT } from '@/app/constants';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
const fetchApi = <RequestType, ResponseType>(
  token: string,
  method: 'GET' | 'POST' | 'PATCH',
  path: string,
  body?: RequestType,
) => {
  const url = `${API_ENDPOINT}${path}`;
  const options: AxiosRequestConfig<RequestType> = {
    url,
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    data: body,
  };
  return axios.request<
    ResponseType,
    AxiosResponse<ResponseType, RequestType>,
    RequestType
  >(options);
};

export default fetchApi;
