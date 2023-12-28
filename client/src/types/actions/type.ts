import { IType } from "../models/IType";

export interface ITypeCreateResponse {
    type: IType;
}

export interface ITypeGetResponse {
    types: IType[];
}