import type { Socket } from "socket.io";
import type { PlayerDTO } from "../DTO/playerDTO.js";
import { type RoomSetting } from "../model/Room.js";
declare class GameService {
    private static _instance;
    private constructor();
    static getInstance(): GameService;
    createGame(socket: Socket, payload: PlayerDTO): void;
    joinGame(socket: Socket, payload: PlayerDTO, roomId: string): void;
    changeGameSetting(socket: Socket, setting: RoomSetting): void;
    draw(socket: Socket, commands: Array<Array<number>>): void;
    leaveGame(socket: Socket): void;
    startGame(socket: Socket): void;
    reGame(socket: Socket): void;
}
export declare const gameService: GameService;
export {};
//# sourceMappingURL=GameService.d.ts.map