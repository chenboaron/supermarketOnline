import { Data } from "@angular/router";

export class Order {
    public constructor(
        public city?: string,
        public street?: string,
        public date?: Date,
        public creditCard?: number,

    ) { }

}