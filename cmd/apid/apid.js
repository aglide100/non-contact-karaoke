"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const useRouter_1 = require("../../pkg/core/router/useRouter");
const memberController_1 = require("../../pkg/core/controller/memberController");
const port = 8889;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
const server = new useRouter_1.UseRouter(app);
const MemberCtrl = new memberController_1.MemberController();
const cors = require("cors");
app.use(cors());
app.get("/", (req, res) => {
    res.send("Hello");
});
server.addRule("/member/list", "GET", "member list", "Member list", MemberCtrl.list());
server.addRule("/member/join", "POST", "member join", "Member Join", MemberCtrl.join());
server.addRule("/member/login", "POST", "login member", "Member", MemberCtrl.login());
server.listen(port);
