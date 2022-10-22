export interface SignedTransactionObject {
    from: string;
    to?: string,
    value: number;
    gas: number;
    nonce: number;
    data: string;
    signature: string;
}