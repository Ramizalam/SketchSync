
import { EventTypeEnum } from "../enums/EventTypeEnum";
import { GameStateEnum } from "../enums/GameState";
import { Player } from "../model/entities/Player";
import { RoomSetting } from "../model/interface/RoomSetting";
import { roundService } from "./RoundServices";
import { webSocketServices } from "./WebSocketService";
import store from "../store";
interface Response {
    // 0 join, 1 left, 2 upgrade
    player_status?: number;
    players: Player[];
    player?: Player;
    game_state?: GameStateEnum;
    room_id?: string;
    settings?: RoomSetting;
    me?: string;
}

interface RoomSyncRequest {
    settings?: RoomSetting;
    new_game?: boolean;
}

class GameService {
    private static _instance: GameService | null;

    private constructor() { }

    public static getInstance(): GameService {
        if (!GameService._instance) {
            GameService._instance = new GameService();
        }
        return GameService._instance;
    }

    public init() {
        webSocketServices.init();

        webSocketServices.registerEvent(
            EventTypeEnum.ROOM_SYNC,
            this.roomSyncServer
        );

        webSocketServices.registerEvent(EventTypeEnum.END_GAME, this.endGameServer);
        roundService.init();
        console.log("[Game Service] Intialized");
    }

    public createRoomClient(player: Player) {
        webSocketServices.emitEvent(EventTypeEnum.CREATE_GAME, { player });
    }

    public joinRoomClient(roomId: string, player: Player) {
        webSocketServices.emitEvent(EventTypeEnum.JOIN_GAME, { roomId, player });
    }

    public roomSyncClient(data: RoomSyncRequest) {
        webSocketServices.emitEvent(EventTypeEnum.ROOM_SYNC, data);
    }

    public roomSyncServer(res: Response) {
        console.log("this is [roomSyncServer]",res);
        if (res.game_state) store.gameStore.setGameState(res.game_state);
        if (res.player_status !== undefined) {
            console.log("roomsyncserver players: ",res.players)
            if (res.player_status === 0) {
                if (res.players) {
                    res.players.map((p) => {
                        store.gameStore.addPlayer(p);
                    });
                }
                if (res.player) store.gameStore.addPlayer(res.player);
            } else if (res.player_status === 1) {
                store.gameStore.removePlayer(res.player!.id);
            } else if (res.player_status === 2) {
                store.gameStore.addPlayer(res.player!);
            }
        }

        if (res.me) store.gameStore.setMe(res.me);
        if (res.room_id) store.gameStore.setRoomId(res.room_id);
        if (res.settings) store.gameStore.setSetting(res.settings);
    }

    public startGameClient() {
        if (store.gameStore.players.length > 1)
            webSocketServices.emitEvent(EventTypeEnum.START_GAME, {});
    }

    public endGameServer(data: {
        game_state: string;
        scores: { [key: string]: number };
    }) {
        store.gameStore.setGameState(data.game_state as GameStateEnum);
        store.gameStore.setScores(data.scores);
    }
}

export const gameServices = GameService.getInstance();
