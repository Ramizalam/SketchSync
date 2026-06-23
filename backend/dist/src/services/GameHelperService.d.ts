import type { Socket } from "socket.io";
import Player from "../model/Player.js";
import { UserRoleEnum } from "../enum/UserRoleEnum.js";
import type Room from "../model/Room.js";
declare class GameHelperService {
    private static _instance;
    private readonly wordlist;
    private constructor();
    static getInstance(): GameHelperService;
    getPlayer(socket: Socket): Player | undefined;
    checkPlayer(socket: Socket, player: Player, role: UserRoleEnum): boolean;
    checkPlayerRoom(socket: Socket, player: Player): Room | undefined;
    getPlayerAndRoom(socket: Socket, roleCheck?: boolean): {
        player?: Player;
        room?: Room;
    };
    getRandomWords(): string[];
}
export declare const gameHelperService: GameHelperService;
export {};
//# sourceMappingURL=GameHelperService.d.ts.map