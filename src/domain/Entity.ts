export abstract class Entity<TId> {
    public get id(): TId {
        return this._id;
    }
    protected readonly _id: TId;
    protected constructor(id: TId) {
        this._id = id;
    }

}
