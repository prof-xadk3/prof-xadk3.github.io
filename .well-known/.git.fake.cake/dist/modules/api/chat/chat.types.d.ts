declare class Message {
    date: string;
    id: string;
    verified: boolean;
    contentType: string;
    sender: string;
    alias: string;
    message: string;
    tokens: number;
}
export declare class GetMessages {
    token: string;
    messages: Message[];
}
export {};
