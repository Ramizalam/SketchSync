class BaseSchema {
    _id;
    constructor(_id) {
        this._id = _id;
    }
    //getter metho insetead of instance.getId()  just use instance.id
    get id() {
        return this._id;
    }
}
export default BaseSchema;
//# sourceMappingURL=_base.js.map