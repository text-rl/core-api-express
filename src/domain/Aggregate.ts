import {Entity} from "./Entity";

export abstract class Aggregate<TId> extends Entity<TId>{
    protected constructor(id: TId) {
        super(id);
    }
}
