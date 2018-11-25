import axiosClient from './util/axios-client';
import { AxiosPromise, AxiosRequestConfig } from 'axios';
import { DataStore } from './data-store';
import { ServiceDiscovery } from './service-discovery';
import { consulInstanceConfig } from './config';
import { URLParser } from './url-parser';
import { ServiceInstance } from './types/consul';
// https://github.com/axios/axios/blob/master/test/typescript/axios.ts

export class DiscoveryRestClient {
  _datastore: DataStore;
  _serviceDiscovery: ServiceDiscovery;
  _urlParser: URLParser;

  constructor(_datastore: DataStore) {
    this._datastore = _datastore;
    this._urlParser = new URLParser();
    this._serviceDiscovery = new ServiceDiscovery(consulInstanceConfig.discoveryStrategy);
  }

  get<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T> {
    const modifiedUrl = this._discoverUrl(url);
    return axiosClient.get<T>(modifiedUrl, config);
  }

  post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T> {
    const modifiedUrl = this._discoverUrl(url);
    return axiosClient.post(modifiedUrl, data, config);
  }

  put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T> {
    const modifiedUrl = this._discoverUrl(url);
    return axiosClient.put<T>(modifiedUrl, data, config);
  }

  delete(url: string, config?: AxiosRequestConfig): AxiosPromise {
    const modifiedUrl = this._discoverUrl(url);
    return axiosClient.delete(modifiedUrl, config);
  }

  patch<T = any>(url: string, data: any, config?: AxiosRequestConfig): AxiosPromise<T> {
    const modifiedUrl = this._discoverUrl(url);
    return axiosClient.patch<T>(modifiedUrl, data, config);
  }

  private _discoverUrl(originalUrl: string): string {
    const req = this._urlParser.parse(originalUrl);
    const instance: ServiceInstance = this._serviceDiscovery.discover(req.service);
    return `${req.protocol}://${instance.serviceAddress}${req.path}`;
  }
}
