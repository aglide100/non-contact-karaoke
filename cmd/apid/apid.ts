import express from "express";
import { UseRouter } from "../../pkg/core/router/useRouter";
import { MemberController } from "../../pkg/core/controller/memberController";
const RateLimit = require("express-rate-limit");

//  1분에 20번 요청
const limiter = RateLimit({
  windowMs: 60 * 1000,
  max: 20,
  delayMs: 0,
  message: "진정해 너무 많이 요청했어...",
});

const port = 8889;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(limiter);
const server = new UseRouter(app);
const MemberCtrl = new MemberController();

const cors = require("cors");
app.use(cors({ origin: "*" }));
app.get("/", (req, res) => {
  res.send("Hello");
});
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
