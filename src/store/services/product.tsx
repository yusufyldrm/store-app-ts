import api, { AxiosPromise } from 'api';
import { IProduct, INewProduct } from 'interfaces';

export async function getAllProdcutsAsync(): Promise<AxiosPromise<IProduct[]>> {
  return api.get('/products');
};

export async function getSingleProductAsync(id: string | number): Promise<AxiosPromise<IProduct>> {
  return api.get(`/products/${id}`);
};

export async function createProductAsync(payload: INewProduct): Promise<AxiosPromise<IProduct>> {
  return api.post(`/products`, payload);
};

export async function deleteProductAsync(id: string | number): Promise<AxiosPromise<IProduct>> {
  return api.delete(`/products/${id}`);
};
