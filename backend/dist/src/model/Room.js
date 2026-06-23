import BaseSchema from "./_base.js";
import Player from "./Player.js";
import { mapService } from "../services/MapService.js";
class Room extends BaseSchema {
    _players;
    _currentRound;
    _roundStartTime;
    _currentPlayerIndex;
    _scores;
    _currentWord;
    _guessedPlayer;
    _gameStarted;
    _chanceCount;
    _roomSetting;
    constructor(id, roomSetting) {
        super(id);
        this._players = [];
        this._currentRound = 1;
        this._roundStartTime = Date.now();
        this._scores = {};
        this._currentPlayerIndex = 0;
        this._gameStarted = false;
        this._chanceCount = 1;
        this._currentWord = "";
        this._updateCache();
        this._guessedPlayer = [];
        this._roomSetting = roomSetting;
    }
    _updateCache() {
        mapService.setEntity(this.id, this);
    }
    get chanceCount() {
        return this._chanceCount;
    }
    setChanceCount(count) {
        this._chanceCount = count;
    }
    resetScore() {
        for (const playerId of this._players) {
            this._scores[playerId] = 0;
        }
        this._updateCache();
    }
    getGuessPlayerCount() {
        return this._guessedPlayer.length;
    }
    updateCurrentRound(round) {
        this._currentRound = round;
        this._updateCache();
    }
    isFinalOver() {
        return this._currentRound >= this._roomSetting.total_rounds;
    }
    get timeElapsed() {
        return Math.floor((Date.now() - this._roundStartTime) / 1000);
    }
    // adding newplayer who guessed the word  to the gueesPlayer List
    isAlreadyGuessed(playerId) {
        return this._guessedPlayer.includes(playerId);
    }
    markPlayerGuessed(playerId) {
        this._guessedPlayer.push(playerId);
        //mapservice
        mapService.setEntity(this.id, this);
    }
    updateToNextPlayer() {
        this._currentPlayerIndex++;
        this._currentPlayerIndex = this._currentPlayerIndex % this._players.length;
        this._updateCache();
    }
    get currentRound() {
        return this._currentRound;
    }
    setCurrentPlayerIndex(idx) {
        this._currentPlayerIndex = idx;
        this._updateCache();
    }
    get currentPlayerIndex() {
        return this._currentPlayerIndex;
    }
    get scores() {
        return this._scores;
    }
    get currentWord() {
        return this._currentWord;
    }
    changeScore(playerId, score) {
        this._scores[playerId] = score;
        this._updateCache();
    }
    get roomSetting() {
        return this._roomSetting;
    }
    updateSetting(setting) {
        this._roomSetting = setting;
        this._updateCache();
    }
    addPlayer(socket, playerPayload) {
        console.log(`[Room] Adding player ${playerPayload.name} to room ${this.id}`);
        const player = new Player(socket, playerPayload.name, playerPayload.role, playerPayload.avatar);
        player.joinRoom(this.id);
        console.log(`[Room] Player ${player.id} joined socket room ${this.id}`);
        this._players.push(player.id);
        this._updateCache();
        // mapService.setEntity<Player>(player.id, player);
        return player;
    }
    removePlayer(playerId) {
        if (playerId.length === 0) {
            console.log("[Room] Invalid player ID");
            return;
        }
        const pos = this.players.indexOf(playerId);
        if (pos < 0 || pos >= this._players.length) {
            console.log("[Room] Player Does not exist");
            return;
        }
        const playerToRemove = this._players[pos];
        delete this._scores[playerToRemove];
        this._players[pos] = this.players[this.players.length - 1];
        this.players.pop();
        this._updateCache();
    }
    get players() {
        return this._players;
    }
    resetRound() {
        this._roundStartTime = Date.now();
        this._guessedPlayer = [];
        this._updateCache();
    }
    setGameStarted(start) {
        this._gameStarted = start;
        this._updateCache();
    }
    get gameStarted() {
        return this._gameStarted;
    }
    setCurrentWord(word) {
        this._currentWord = word;
        this._updateCache();
    }
    checkGuessWord(word) {
        return this._currentWord.toLowerCase() === word.toLowerCase();
    }
}
export default Room;
//# sourceMappingURL=Room.js.map