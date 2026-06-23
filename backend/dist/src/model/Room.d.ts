import type { Socket } from "socket.io";
import BaseSchema from "./_base.js";
import Player from "./Player.js";
import type { PlayerDTO } from "../DTO/playerDTO.js";
export interface RoomSetting {
    total_rounds: number;
    round_time: number;
}
declare class Room extends BaseSchema {
    private _players;
    private _currentRound;
    private _roundStartTime;
    private _currentPlayerIndex;
    private _scores;
    private _currentWord;
    private _guessedPlayer;
    private _gameStarted;
    private _chanceCount;
    private _roomSetting;
    constructor(id: string, roomSetting: RoomSetting);
    private _updateCache;
    get chanceCount(): number;
    setChanceCount(count: number): void;
    resetScore(): void;
    getGuessPlayerCount(): number;
    updateCurrentRound(round: number): void;
    isFinalOver(): boolean;
    get timeElapsed(): number;
    isAlreadyGuessed(playerId: string): boolean;
    markPlayerGuessed(playerId: string): void;
    updateToNextPlayer(): void;
    get currentRound(): number;
    setCurrentPlayerIndex(idx: number): void;
    get currentPlayerIndex(): number;
    get scores(): {
        [key: string]: number;
    };
    get currentWord(): string;
    changeScore(playerId: string, score: number): void;
    get roomSetting(): RoomSetting;
    updateSetting(setting: RoomSetting): void;
    addPlayer(socket: Socket, playerPayload: PlayerDTO): Player;
    removePlayer(playerId: string): void;
    get players(): string[];
    resetRound(): void;
    setGameStarted(start: boolean): void;
    get gameStarted(): boolean;
    setCurrentWord(word: string): void;
    checkGuessWord(word: string): boolean;
}
export default Room;
//# sourceMappingURL=Room.d.ts.map