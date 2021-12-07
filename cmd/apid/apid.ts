import express from "express";
import { UseRouter } from "../../pkg/core/router/useRouter";
import { MemberController } from "../../pkg/core/controller/memberController";

const port = 4000;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const server = new UseRouter(app);
const MemberCtrl = new MemberController();

const cors = require("cors");
app.use(cors());

server.addRule(
  "/member/list",
  "GET",
  "member list",
  "Member list",
  MemberCtrl.list()
);

server.addRule(
  "/member/join",
  "POST",
  "member join",
  "Member Join",
  MemberCtrl.join()
);

server.addRule(
  "/member/login",
  "POST",
  "login member",
  "Member",
  MemberCtrl.login()
);

server.listen(port);
