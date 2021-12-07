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
exports.MemberController = void 0;
const baseController_1 = require("./baseController");
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
    login() {
        return (req, res) => {
            console.log("request member " + req.body.member_no + " login");
            const newUser = {
                member_no: req.body.member_no,
                name: "",
                password: req.body.password,
            };
            memberDao_1.MemberDao.getInstance().selectMember(newUser, (result, error) => {
                if (error != null || result == null) {
                    console.log("Can't Login new member" + error + result);
                    res.status(400).send("user not found");
                }
                else {
                    const json = this.generateTokenJson(result);
                    res.status(200).send(JSON.stringify(json));
                }
            });
        };
    }
    join() {
        return (req, res) => {
            console.log("request member " + req.body.name + " join");
            const id = uuid.v4();
            const newUser = {
                member_no: req.body.member_no,
                name: req.body.name,
                password: req.body.password,
            };
            memberDao_1.MemberDao.getInstance().insertMember(newUser, (result, error) => {
                if (error != null || result == null) {
                    console.log("Can't Insert new member" + error + result);
                    res.status(400).send("error :" + error.message);
                }
                else {
                    const json = this.generateTokenJson(result);
                    res.status(200).send(JSON.stringify(json));
                }
            });
        };
    }
}
exports.MemberController = MemberController;
// import { BaseController } from "../controller/baseController";
// import { Handler, Request, Response } from "express";
// import { MemberProps } from "../../../ui/common/MemberProps";
// import * as uuid from "uuid";
// import { MemberDao } from "../DAO/memberDao";
// export type loginResultProps = {
//   userId: string;
//   userName: string;
//   userToken: string;
// };
// export class MemberController extends BaseController {
//   constructor() {
//     super();
//   }
//   public list(): Handler {
//     return (req: Request, res: Response) => {
//       console.log("returns Member list");
//       MemberDao.getInstance().selectAllMember(function (result: any) {
//         res.send(JSON.stringify(result));
//       });
//     };
//   }
//   public async login(userId: string, userPassword: string, callback: Function) {
//     console.log("request member " + userId + " login");
//     const newUser: MemberProps = {
//       member_no: userId,
//       name: "",
//       password: userPassword,
//     };
//     MemberDao.getInstance().selectMember(
//       newUser,
//       (result: MemberProps, error: Error) => {
//         const json = this.generateTokenJson(newUser);
//         let data = {
//           userId: userId,
//           userName: result.name,
//           userToken: json,
//         };
//         callback(data, error);
//       }
//     );
//   }
//   public join(
//     userId: string,
//     userPassword: string,
//     userName: string,
//     callback: Function
//   ) {
//     console.log("request member " + userId + " join");
//     const id = uuid.v4();
//     const newUser: MemberProps = {
//       member_no: userId,
//       name: userName,
//       password: userPassword,
//     };
//     MemberDao.getInstance().insertMember(
//       newUser,
//       (result: MemberProps, error: Error) => {
//         if (error != null || result == null) {
//           console.log("Can't Insert new member" + error + result);
//           callback(null, error);
//         } else {
//           console.log("!!!!!!!!!!!!!!!", newUser);
//           const json = this.generateTokenJson(newUser);
//           let data = {
//             userId: userId,
//             userName: userName,
//             userToken: json,
//           };
//           callback(data, null);
//         }
//       }
//     );
//   }
// }
