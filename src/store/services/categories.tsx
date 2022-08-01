import api, { AxiosPromise } from 'api';
import { ICategory } from 'interfaces';

export async function getAllCategoriesAsync(): Promise<AxiosPromise<{ categories: ICategory[], message: string }>> {
  return api.get('/categories');
};

export async function getSingleCategoryAsync(id: string | number): Promise<AxiosPromise<{ category: ICategory, message: string }>> {
  return api.get(`/categories/${id}`);
};
