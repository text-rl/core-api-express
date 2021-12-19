export interface IDispatcher<TMessage>{
    dispatch(msg: TMessage): void;
}
