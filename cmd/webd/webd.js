"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const port = 3500;
const uiPath = path_1.default.join(__dirname, "../../ui/out");
const server = (0, express_1.default)();
server.use(express_1.default.static(uiPath));
server.use("/next", express_1.default.static(path_1.default.join(__dirname, "../../ui/.next")));
server.listen(port, () => {
    console.log("static webd on at http://localhost:" + port);
});
