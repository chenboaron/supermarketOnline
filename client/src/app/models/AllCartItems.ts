import { Product } from "./Product";

export class AllCartItems {
    public constructor(
        public productId?: number,
        public amount?: number,
        public totalPrice?: number,
        public productName?: string,
    ) { }

}

