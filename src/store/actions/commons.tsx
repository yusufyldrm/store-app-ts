import { AxiosError } from "axios";
import { ICategory, IProduct } from "interfaces";

export const categorizeProducts = (products: IProduct[], category: ICategory[]) => {
  const categories = JSON.parse(JSON.stringify(category || []));
  // const others: ICategory[] = [];
  categories.forEach((category: ICategory) => {
    category.products = products.filter(product => product?.category === category?.name);
  });
  // products.forEach(product => {
  //   if (!categories.find((category: ICategory) => category.name === product.category)) {
  //     product.category = 'Others';  // set category to Others if not found in categories
  //     others.push(product);
  //   }
  // });

  // if (others.length > 0) {  // add Others category if there are products not found in categories
  //   if (!categories.find((category: ICategory) => category.name === 'Others')) {
  //     categories.push({
  //       id: 'others',
  //       name: 'Others',
  //       createdAt: new Date(),
  //       products: others,
  //     });
  //   } else {
  //     categories.find((category: ICategory) => category.name === 'Others').products = others;
  //   }
  // }
  return categories;
};

export const errorHandler = (error: any): string => {
  if (error instanceof AxiosError) {
    console.log(`AxiosError: ${error.message} -> ${error.config.url}`);
    return error.response!.statusText;
  } else if (error instanceof Error) {
    console.log(`Error: ${error.message} -> ${error.name}`);
    return error.message;
  } else {
    return 'Error';
  }
};
