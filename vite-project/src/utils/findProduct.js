import {products} from "../pages/Landing";

export const findProductById = (id) => products.find((item) => item.id === id);
