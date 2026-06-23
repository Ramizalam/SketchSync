import type { Socket } from "socket.io";
import BaseSchema from "./_base.js";
import type { UserRoleEnum } from "../enum/UserRoleEnum.js";
declare class Player extends BaseSchema {
    private _socket;
    private _name;
    private _role;
    private _avatar;
    private _roomId;
    constructor(_socket: Socket, _name: string, _role: UserRoleEnum, _avatar: string);
    get mySocket(): Socket;
    joinRoom(roomId: string): void;
    leaveRoom(): void;
    get name(): string;
    get avatar(): string;
    get roomId(): string | undefined;
    get role(): UserRoleEnum;
    update(newRole: UserRoleEnum): void;
    toJson(): {
        name: string;
        id: string;
        role: UserRoleEnum;
        avatar: string;
    };
}
export default Player;
//# sourceMappingURL=Player.d.ts.map