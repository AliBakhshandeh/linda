// src/tronweb.d.ts
declare module 'tronweb' {
    interface TronWebOptions {
        fullHost: string;
        privateKey?: string;
    }

    export default class TronWeb {
        address: any;
        constructor(options: TronWebOptions);
        createAccount(): Promise<{ address: string; privateKey: string }>;
        // Add other methods as needed based on your usage
    }
}

declare module '@type/tronweb' {
    export * from '@daochild/tronweb-typescript';
}