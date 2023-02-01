export type customHeaders =
  | {
      [name: string]: string;
    }
  | {};

export interface HttpServiceInterface<T, K> {
  get(link: string, headers: customHeaders): Promise<T>;
  post(link: string, data: K | {}, headers: customHeaders): Promise<T>;
  delete(link: string, data: K | {}, headers: customHeaders): Promise<T>;
}
