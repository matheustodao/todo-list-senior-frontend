import axios, { AxiosRequestConfig } from 'axios';

type TOptions = AxiosRequestConfig;
type TPath = string;
interface TMethodParams {
  path?: TPath,
  options?: TOptions,
}

export default class HttpClient {
  readonly baseUrl: string = '';
  prefixPath: string = '';

  constructor(readonly url: string) {}

  get({ path, options }: TMethodParams = {}) {
    return this.makeRequest({
      method: 'get',
      ...options,
    }, path)
  }


  post({ path, options }: TMethodParams = {}) {
    return this.makeRequest({
      method: 'post',
      ...options,
    }, path)
  }

  patch({ path, options }: TMethodParams = {}) {
    return this.makeRequest({
      method: 'patch',
      ...options,
    }, path)
  }

  put({ path, options }: TMethodParams = {}) {
    return this.makeRequest({
      method: 'put',
      ...options,
    }, path)
  }

  delete({ path, options }: TMethodParams = {}) {
    return this.makeRequest({
      method: 'delete',
      ...options,
    }, path)
  }

  async makeRequest(options: TOptions, path?: TPath) {
    const headers = new Headers();

    if (options.data) {
      headers.append('Content-Type', 'application/json')
    }

    if (options.headers) {
      Object.entries(options.headers).forEach(([key, value]) => {
        headers.append(key, value as string);
      })
    }

    let baseURL = this.url;

    if (this.prefixPath) {
      baseURL = `${this.url}${this.prefixPath}`
    }

    const response = await axios({
      baseURL: `${baseURL}${path ?? ''}`,
      method: options.method,
      data: options.data,
      headers: options.headers,
      ...options,
    })

    let responseBody: any = null;

    // @ts-ignore
    const contentType: string | undefined = response.headers.get('content-type');

    if (contentType?.includes('application/json')) {
      responseBody = await response.data;
    }

    if (response.status >= 200 && response.status <= 299) {
      return responseBody;
    }

    const messageError = response.data?.error || `${response.status} - ${response.statusText}`

    throw Error(messageError)

  }
}