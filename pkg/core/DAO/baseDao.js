"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseDao = void 0;
const pg_1 = require("pg");
const console_1 = __importDefault(require("console"));
let DBUser = process.env.DB_USER;
let DBPassword = process.env.DB_PASSWORD;
let DBHost = process.env.DB_HOST;
let DBPort = process.env.DB_PORT;
let config = {
    user: "table_admin",
    host: "localhost",
    database: "webapp",
    password: "HeLLo!1",
    port: 5432,
};
class BaseDao {
    constructor() {
        if (DBPort == undefined) {
            console_1.default.log("Can't read DBPort in Env file! I'll use default port!");
            // config.port = 5432;
        }
        if (DBPassword == undefined) {
            console_1.default.log("Can't read DBPassword in Env file! I'll use default DBPassword!");
        }
        if (DBHost == undefined) {
            console_1.default.log("Can't read DBHost in Env file! I'll use default DBHost!");
        }
        if (DBUser == undefined) {
            console_1.default.log("Can't read DBUser in Env file! I'll use default DBUser!");
        }
        this.client = new pg_1.Pool(config);
        this.client.connect();
        this.client.end();
    }
    connectDB() {
        return __awaiter(this, void 0, void 0, function* () {
            this.client = new pg_1.Pool(config);
            yield this.client.connect();
        });
    }
    getClient() {
        this.connectDB();
        return this.client;
    }
}
exports.BaseDao = BaseDao;
