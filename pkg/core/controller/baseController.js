"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseController = void 0;
const jwt = require("jsonwebtoken");
class BaseController {
    constructor() {
        this.secretKey = "secretKey";
    }
    generateAccessToken(id) {
        return jwt.sign({ id }, this.secretKey, {
            expiresIn: "15m",
        });
    }
    generateRefreshToken(id) {
        return jwt.sign({ id }, this.secretKey, {
            expiresIn: "1h",
        });
    }
    generateTokenJson(member) {
        const access = this.generateAccessToken(member.member_no);
        const refresh = this.generateRefreshToken(member.member_no);
        return { accessToken: access, refreshToken: refresh, user: member.name };
    }
    authenticateAccessToken(token) {
        if (token == undefined) {
            return null;
        }
        return jwt.verify(token, this.secretKey, (error, result) => {
            if (error != null) {
                return null;
            }
            const id = result.id;
            return id;
        });
    }
    describeError(res, err) {
        // TODO 직렬화 할것
        return res.send("Having error : " + err);
    }
    // handling common error in here!!!
    exceptionHandler() { }
    createResBody(type, title, res, detail, instance) {
        return "";
    }
}
exports.BaseController = BaseController;
