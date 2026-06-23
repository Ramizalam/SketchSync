import fs from "fs";
import { mapService } from "./MapService.js";
import Player from "../model/Player.js";
import { webSocketServices } from "./webSocketServices.js";
import { EventTypeEnum } from "../enum/EventTypeEnum.js";
import { UserRoleEnum } from "../enum/UserRoleEnum.js";
import { error } from "console";
class GameHelperService {
    static _instance;
    wordlist;
    constructor() {
        this.wordlist = fs.readFileSync("src/utils/word.txt", "utf-8").split(",").map(w => w.trim()).filter(w => w.length > 0);
    }
    ;
    static getInstance() {
        if (!GameHelperService._instance) {
            GameHelperService._instance = new GameHelperService();
        }
        return GameHelperService._instance;
    }
    getPlayer(socket) {
        const player = mapService?.getEntity(socket.id);
        if (!player) {
            console.log("[game service] player does not exist");
            webSocketServices.sendPrivate(socket, EventTypeEnum.ERROR, "player does not exist");
            return;
        }
        return player;
    }
    checkPlayer(socket, player, role) {
        if (player.role !== role) {
            console.log('[Game Service] unauthorised Acess');
            webSocketServices.sendPrivate(socket, EventTypeEnum.ERROR, "unauthorised acess");
            return false;
        }
        return true;
    }
    checkPlayerRoom(socket, player) {
        const room = mapService.getEntity(player.roomId || "");
        if (!room) {
            console.log("[Game service] Invalid room Id");
            webSocketServices.sendPrivate(socket, EventTypeEnum.ERROR, "Invalid Room Id");
            return;
        }
        ;
        if (!room.players.includes(player.id)) {
            console.log('[Game Service] player does not belong to the room ');
            webSocketServices.sendPrivate(socket, EventTypeEnum.ERROR, "player does not belong to the room ");
            return;
        }
        return room;
    }
    getPlayerAndRoom(socket, roleCheck = true) {
        // find the player 
        const player = this.getPlayer(socket);
        if (!player) {
            return {};
        }
        if (roleCheck && !this.checkPlayer(socket, player, UserRoleEnum.CREATOR)) {
            return {};
        }
        // find the room 
        const room = this.checkPlayerRoom(socket, player);
        if (!room) {
            return { player };
        }
        return { player, room };
    }
    getRandomWords() {
        const len = this.wordlist.length;
        if (len === 0)
            return [];
        const index = Math.floor(Math.random() * len);
        return [
            this.wordlist[index],
            this.wordlist[(index + 1) % len],
            this.wordlist[(index + 2) % len],
        ];
    }
}
export const gameHelperService = GameHelperService.getInstance();
//# sourceMappingURL=GameHelperService.js.map