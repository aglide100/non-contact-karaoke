"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// const server = express();
const port = 3000;
class Webd {
    constructor() {
        this.server = (0, express_1.default)();
    }
}
const server = new Webd().server;
server.get("/", (req, res) => {
    res.send("Hello world with express!");
});
server.get("/sum-start", (req, res) => {
    console.time("duration");
    var sum = 0;
    for (var i = 0; i < 100; i++) {
        sum += i;
    }
    res.send("sum is " + sum + console.timeLog("duration") + "at over!");
    console.timeEnd("duration");
    console.log(sum);
});
server.listen(port, () => {
    console.log("Server listing on ", port);
});
