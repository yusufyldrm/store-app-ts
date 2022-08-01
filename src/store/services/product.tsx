import api, { AxiosPromise } from 'api';
import { IProduct, INewProduct } from 'interfaces';

export async function getAllProdcutsAsync(): Promise<AxiosPromise<{ products: IProduct[], message: string }>> {
  return api.get('/products');
};

export async function getSingleProductAsync(id: string | number): Promise<AxiosPromise<{ product: IProduct, message: string }>> {
  return api.get(`/products/${id}`);
};

export async function createProductAsync(payload: INewProduct): Promise<AxiosPromise<{ product: IProduct, message: string }>> {
  return api.post(`/products`, payload);
};

export async function deleteProductAsync(id: string | number): Promise<AxiosPromise<{ product: IProduct, message: string }>> {
  return api.delete(`/products/${id}`);
};
