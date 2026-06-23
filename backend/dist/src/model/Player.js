import BaseSchema from "./_base.js";
import { mapService } from "../services/MapService.js";
class Player extends BaseSchema {
    _socket;
    _name;
    _role;
    _avatar;
    _roomId;
    constructor(_socket, _name, _role, _avatar) {
        super(_socket.id);
        this._socket = _socket;
        this._name = _name;
        this._role = _role;
        this._avatar = _avatar;
        mapService.setEntity(this.id, this);
    }
    get mySocket() {
        return this._socket;
    }
    joinRoom(roomId) {
        this._roomId = roomId;
        this._socket.join(roomId);
    }
    leaveRoom() {
        this._socket.leave(this._roomId);
        this._roomId = undefined;
    }
    get name() {
        return this._name;
    }
    get avatar() {
        return this._avatar;
    }
    get roomId() {
        return this._roomId;
    }
    get role() {
        return this._role;
    }
    update(newRole) {
        this._role = newRole;
        mapService.setEntity(this.id, this);
    }
    toJson() {
        return {
            name: this._name,
            id: this.id,
            role: this._role,
            avatar: this._avatar,
        };
    }
}
export default Player;
//# sourceMappingURL=Player.js.map