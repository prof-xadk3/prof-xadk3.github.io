interface CreateCustomRecordsProps {
    message: string;
    sender: string;
    alias: string;
    contentType: string;
    requestType: string;
    secret: string;
    signature: string;
}
interface CustomRecordsProps {
    type: string;
    value: string;
}
export declare const createCustomRecords: ({ message, sender, alias, contentType, requestType, secret, signature, }: CreateCustomRecordsProps) => CustomRecordsProps[];
type DecodeMessageType = {
    type: string;
    value: string;
};
export declare const decodeMessage: ({ type, value, }: DecodeMessageType) => {
    [key: string]: string;
};
export declare const decodeMessages: (messages: {
    [id: string]: string;
}[]) => {
    [key: string]: string;
};
export {};
