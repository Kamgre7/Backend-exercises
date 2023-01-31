export type customHeaders =
  | {
      [name: string]: string;
    }
  | {};

export interface HttpServiceInterface {
  get<T>(link: string, headers: customHeaders): Promise<T>;
  post<T, K>(link: string, data: K | {}, headers: customHeaders): Promise<T>;
  delete<T, K>(link: string, data: K | {}, headers: customHeaders): Promise<T>;
}
