import { Product } from "./Product";

export class CartItem {
    public constructor(
        public product?: Product,
        public amountOfProduct?: number,
        public totalPrice?: number,
        public cartId?: number,
    ) { }

}

