export abstract class BaseAggregateRepository<TId, TAggregate> {
    abstract getAllAsync(): Promise<TAggregate[]>;

    abstract getByIdAsync(id: TId): Promise<TAggregate | null>

    abstract deleteAsync(aggregate: TAggregate): Promise<any>

    abstract setAsync(aggregate: TAggregate): Promise<TId>

    abstract getNewIdAsync(): Promise<TId>
}
