import { BrandName, IBrand } from "./IBrand";
import { IInfo } from "./IInfo";
import { IType, TypeName } from "./IType";

export interface IDevice {
    id: number;
    name: string;
    price: number;
    rating: number;
    typeId: number;
    brandId: number;
    info: IInfo[];
    img: string;
}