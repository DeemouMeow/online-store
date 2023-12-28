import { IBrand } from "../models/IBrand";

export interface IBrandCreateResponse {
    brand: IBrand;
}

export interface IBrandGetResponse {
    brands: IBrand[];
}