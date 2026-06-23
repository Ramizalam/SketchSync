import { Socket } from "socket.io";
declare class RoundService {
    private static _instance;
    private constructor();
    static getInstance(): RoundService;
    wordReveal(socket: Socket): Promise<void>;
    gameChat(socket: Socket, message: string): Promise<void>;
    roundSync(socket: Socket, chosenWord?: string): Promise<void>;
}
export declare const roundService: RoundService;
export {};
//# sourceMappingURL=RoundService.d.ts.map