export interface IAgent {
    exchange: string;
    routingKey: string;
    exchangeType: 'direct' | 'topic' | 'headers' | 'fanout' | 'match' | string;
}
