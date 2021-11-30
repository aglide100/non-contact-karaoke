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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemberController = void 0;
const baseController_1 = require("../controller/baseController");
const uuid = __importStar(require("uuid"));
const memberDao_1 = require("../DAO/memberDao");
class MemberController extends baseController_1.BaseController {
    constructor() {
        super();
    }
    list() {
        return (req, res) => {
            console.log("returns Member list");
            memberDao_1.MemberDao.getInstance().selectAllMember(function (result) {
                res.send(JSON.stringify(result));
            });
        };
    }
    login(userId, userPassword, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("request member " + userId + " login");
            const newUser = {
                member_no: userId,
                name: "",
                password: userPassword,
            };
            memberDao_1.MemberDao.getInstance().selectMember(newUser, (result, error) => {
                const json = this.generateTokenJson(newUser);
                let data = {
                    userId: userId,
                    userName: result.name,
                    userToken: json,
                };
                callback(data, error);
            });
        });
    }
    join(userId, userPassword, userName, callback) {
        console.log("request member " + userId + " join");
        const id = uuid.v4();
        const newUser = {
            member_no: userId,
            name: userName,
            password: userPassword,
        };
        memberDao_1.MemberDao.getInstance().insertMember(newUser, (result, error) => {
            if (error != null || result == null) {
                console.log("Can't Insert new member" + error + result);
                callback(null, error);
            }
            else {
                console.log("!!!!!!!!!!!!!!!", newUser);
                const json = this.generateTokenJson(newUser);
                let data = {
                    userId: userId,
                    userName: userName,
                    userToken: json,
                };
                callback(data, null);
            }
        });
    }
}
exports.MemberController = MemberController;
