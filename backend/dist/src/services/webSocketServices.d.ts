import { Server as httpServer } from "http";
import { Socket } from "socket.io";
import { EventTypeEnum } from "../enum/EventTypeEnum.js";
declare class WebSocketServices {
    private static _instance;
    private io;
    private constructor();
    static getInstance(): WebSocketServices;
    init(server: httpServer): void;
    sendPrivate(socket: Socket, event: EventTypeEnum, message: any): void;
    sendToRoom(socket: Socket, event: string, roomId: string, message: any): void;
    sendToAll(socket: Socket, event: string, message: any): void;
    sendToRoomByIO(event: string, roomId: string, message: any): void;
}
export declare const webSocketServices: WebSocketServices;
export {};
//# sourceMappingURL=webSocketServices.d.ts.map