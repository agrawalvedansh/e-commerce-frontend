import { User, cartItem, shippingInfo } from "./types";


export interface userReducerInitialState {
    user: User |  null;
    loading: boolean;
}

export interface cartReducerInitialState {
    loading: boolean;
    cartItems: cartItem[];
    subtotal: number;
    tax: number;
    shippingCharges: number;
    discount: number;
    total: number;
    shippingInfo: shippingInfo;
}