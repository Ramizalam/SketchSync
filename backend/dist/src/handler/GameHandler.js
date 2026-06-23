import { Socket } from "socket.io";
import { EventTypeEnum } from "../enum/EventTypeEnum.js";
import { gameService } from "../services/GameService.js";
import { roundService } from "../services/RoundService.js";
const gameCreateHandler = (socket) => {
    socket.on(EventTypeEnum.CREATE_GAME, ({ player }) => {
        console.log(`[Handler] ${socket.id} -> CREATE_GAME`, player);
        gameService.createGame(socket, player);
    });
};
const gameJoinHandler = (socket) => {
    socket.on(EventTypeEnum.JOIN_GAME, ({ player, roomId }) => {
        console.log(`[Handler] ${socket.id} -> JOIN_GAME`, { player, roomId });
        gameService.joinGame(socket, player, roomId);
    });
};
const gameRoomSyncHandler = (socket) => {
    socket.on(EventTypeEnum.ROOM_SYNC, (data) => {
        if (data.settings) {
            gameService.changeGameSetting(socket, data.settings);
        }
        if (data.new_game) {
            gameService.reGame(socket);
        }
    });
};
const drawHandler = (socket) => {
    socket.on(EventTypeEnum.DRAW, (payload) => {
        console.log(`[Handler] ${socket.id} -> DRAW`, payload);
        const commands = Array.isArray(payload)
            ? payload
            : payload?.commands;
        if (!commands)
            return;
        gameService.draw(socket, commands);
    });
};
const gameLeaveHandler = (socket) => {
    socket.on(EventTypeEnum.DISCONNECT, () => {
        gameService.leaveGame(socket);
        console.log(`[Handler] User Disconnected : ${socket.id}`);
    });
};
const gameChatHandler = (socket) => {
    socket.on(EventTypeEnum.CHAT, (data) => {
        console.log(`[Handler] ${socket.id} -> CHAT`, data);
        roundService.gameChat(socket, data.message);
    });
};
const gameRoundSyncHandler = (socket) => {
    socket.on(EventTypeEnum.ROUND_SYNC, (data) => {
        console.log(`[Handler] ${socket.id} -> ROUND_SYNC`, data);
        roundService.roundSync(socket, data.chosen_word);
    });
};
const gameStartHandler = (socket) => {
    socket.on(EventTypeEnum.START_GAME, () => {
        console.log(`[Handler] ${socket.id} -> START_GAME`);
        gameService.startGame(socket);
    });
};
const gameWordRevealHandler = (socket) => {
    socket.on(EventTypeEnum.WORD_REVEAL, () => {
        console.log(`[Handler] ${socket.id} -> WORD_REVEAL`);
        roundService.wordReveal(socket);
    });
};
export default {
    gameCreateHandler,
    gameJoinHandler,
    gameRoomSyncHandler,
    drawHandler,
    gameLeaveHandler,
    gameChatHandler,
    gameRoundSyncHandler,
    gameStartHandler,
    gameWordRevealHandler,
};
//# sourceMappingURL=GameHandler.js.map