import { Helper } from "../utils/Helper.js";
import Room, {} from "../model/Room.js";
import { UserRoleEnum } from "../enum/UserRoleEnum.js";
import { webSocketServices } from "./webSocketServices.js";
import { EventTypeEnum } from "../enum/EventTypeEnum.js";
import { GameStateEnum } from "../enum/GameStateEnums.js";
import { mapService } from "./MapService.js";
import Player from "../model/Player.js";
import { gameHelperService } from "./GameHelperService.js";
class GameService {
    static _instance;
    constructor() { }
    ;
    static getInstance() {
        if (!GameService._instance) {
            GameService._instance = new GameService();
        }
        return GameService._instance;
    }
    createGame(socket, payload) {
        const uniqueRoomId = Helper.generateRandomString(8, {
            includeLowerCase: true,
            includeUpperCase: true,
            includeNumbers: false
        });
        const room = new Room(uniqueRoomId, {
            total_rounds: 4,
            round_time: 60,
        });
        const player = room.addPlayer(socket, {
            id: socket.id,
            name: payload.name,
            role: UserRoleEnum.CREATOR,
            avatar: payload.avatar
        });
        webSocketServices.sendPrivate(socket, EventTypeEnum.ROOM_SYNC, {
            player: player.toJson(),
            room_id: player.roomId,
            game_state: GameStateEnum.LOBBY,
            player_status: 0,
            me: player.id,
        });
    }
    joinGame(socket, payload, roomId) {
        console.log(`[GameService] joinGame called for room ${roomId}`);
        const room = mapService.getEntity(roomId);
        if (!room) {
            console.log("invalid room id");
            webSocketServices.sendPrivate(socket, EventTypeEnum.ERROR, "Invalid Room Id");
            return;
        }
        if (room.gameStarted) {
            return;
        }
        const player = room.addPlayer(socket, {
            id: socket.id,
            name: payload.name,
            role: UserRoleEnum.JOINER,
            avatar: payload.avatar
        });
        // socket.join(roomId);
        console.log(`[GameService] Player ${player.id} joined room ${roomId}`);
        const playerIds = room.players;
        const players = playerIds.map((id) => {
            const player = mapService.getEntity(id);
            return player?.toJson();
        });
        webSocketServices.sendPrivate(socket, EventTypeEnum.ROOM_SYNC, {
            room_id: player.roomId,
            game_state: GameStateEnum.LOBBY,
            settings: room.roomSetting,
            me: player.id,
            player_status: 0,
            players,
        });
        webSocketServices.sendToRoom(socket, EventTypeEnum.ROOM_SYNC, room.id, {
            player: player.toJson(),
            settings: room.roomSetting,
            player_status: 0,
        });
    }
    changeGameSetting(socket, setting) {
        const { player, room } = gameHelperService.getPlayerAndRoom(socket);
        if (!player || !room)
            return;
        room.updateSetting(setting);
        webSocketServices.sendToRoom(socket, EventTypeEnum.ROOM_SYNC, room.id, {
            settings: room.roomSetting,
        });
    }
    draw(socket, commands) {
        const { player, room } = gameHelperService.getPlayerAndRoom(socket, false);
        if (!player || !room) {
            return;
        }
        if (room.players[room.currentPlayerIndex] == player.id) {
            webSocketServices.sendToRoom(socket, EventTypeEnum.DRAW, room.id, { commands });
        }
    }
    leaveGame(socket) {
        const player = mapService.getEntity(socket.id);
        if (!player) {
            return;
        }
        if (!player.roomId) {
            return;
        }
        const room = mapService.getEntity(player.roomId);
        if (!room) {
            return;
        }
        mapService.remove(player.id);
        player.leaveRoom();
        if (room.players.length < 3) {
            mapService.remove(room.id);
            webSocketServices.sendToRoomByIO(EventTypeEnum.ERROR, room.id, {});
        }
        else {
            if (room.players[room.currentPlayerIndex] === player.id) {
                room.updateToNextPlayer();
                room.setCurrentWord("");
                room.resetRound();
                const nextPlayerId = room.players[room.currentPlayerIndex];
                webSocketServices.sendToRoomByIO(EventTypeEnum.ROUND_SYNC, room.id, {
                    scores: room.scores,
                    turn_player_id: nextPlayerId,
                    round: room.currentRound,
                    choosing: true,
                    round_start: false,
                    round_change: true,
                });
                webSocketServices.sendToRoomByIO(EventTypeEnum.DRAW, room.id, {
                    commands: [[2]],
                });
                const nextPlayer = mapService.getEntity(nextPlayerId);
                if (!nextPlayer) {
                    console.log("[Game Service] Something went wrong, next Player does not exist.");
                    webSocketServices.sendToRoomByIO(EventTypeEnum.ERROR, room.id, "Server Error");
                }
                else {
                    webSocketServices.sendPrivate(nextPlayer.mySocket, EventTypeEnum.ROUND_SYNC, {
                        word_list: gameHelperService.getRandomWords(),
                    });
                }
            }
            if (player.role === UserRoleEnum.CREATOR) {
                const nextPlayer = mapService.getEntity(room.players[0]);
                nextPlayer?.update(UserRoleEnum.CREATOR);
                webSocketServices.sendToRoomByIO(EventTypeEnum.ROOM_SYNC, room.id, {
                    player_status: 2,
                    player: nextPlayer?.toJson(),
                });
            }
            webSocketServices.sendToRoomByIO(EventTypeEnum.ROOM_SYNC, room.id, {
                player_status: 1,
                player: player.toJson(),
            });
        }
        room.removePlayer(player.id);
    }
    startGame(socket) {
        console.log("GameService: startGame called");
        const { player, room } = gameHelperService.getPlayerAndRoom(socket);
        if (!player || !room) {
            return;
        }
        const playerIds = room.players;
        console.log("GameService: Player Count:", playerIds.length);
        if (playerIds.length < 2) {
            console.log("GameService: Not enough players");
            return;
        }
        // choose any random player from the room to draw on canvas
        const drawer = mapService.getEntity(Helper.getRandom(playerIds));
        if (!drawer) {
            console.log("GameService: Drawer not found");
            return;
        }
        room.setCurrentPlayerIndex(room.players.indexOf(drawer.id));
        room.resetScore();
        room.setGameStarted(true);
        webSocketServices.sendToRoomByIO(EventTypeEnum.ROUND_SYNC, room.id, {
            game_state: GameStateEnum.START,
            scores: room.scores,
            turn_player_id: drawer.id,
            round: room.currentRound,
            choosing: true,
            time_left: room.roomSetting.round_time
        });
        webSocketServices.sendToRoomByIO(EventTypeEnum.DRAW, room.id, {
            commands: [[2]],
        });
        webSocketServices.sendPrivate(drawer.mySocket, EventTypeEnum.ROUND_SYNC, {
            word_list: gameHelperService.getRandomWords(),
        });
    }
    reGame(socket) {
        const { player, room } = gameHelperService.getPlayerAndRoom(socket);
        if (!player || !room) {
            return;
        }
        room.setGameStarted(false);
        room.setCurrentWord("");
        room.resetScore();
        room.resetRound();
        room.setCurrentPlayerIndex(-1);
        room.updateCurrentRound(1);
        webSocketServices.sendToRoomByIO(EventTypeEnum.ROOM_SYNC, room.id, {
            game_state: GameStateEnum.LOBBY,
        });
    }
}
export const gameService = GameService.getInstance();
//# sourceMappingURL=GameService.js.map