"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const connDB = __importStar(require("../../DAO/connDB"));
class User {
    constructor() {
        this.db = new connDB.ConnDB();
    }
    static getInstance() {
        if (!User.instance) {
            console.log("create user instance...");
            User.instance = new User();
        }
        return User.instance;
    }
    getUser() {
        this.db.getTable();
        return User.user;
    }
    setUser(userID) {
        User.user.userID = userID;
    }
    setUserInRoomID(roomID) {
        User.user.roomID = roomID;
    }
}
exports.User = User;
