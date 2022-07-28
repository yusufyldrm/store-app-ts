import api, { AxiosPromise } from 'api';
import { ICategory } from 'interfaces';

export async function getAllCategoriesAsync(): Promise<AxiosPromise<ICategory[]>> {
  return api.get('/categories');
};

export async function getSingleCategoryAsync(id: string | number): Promise<AxiosPromise<ICategory>> {
  return api.get(`/categories/${id}`);
};
