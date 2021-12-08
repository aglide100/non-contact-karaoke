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
class BaseDao {
    constructor() {
        let DBUser = process.env.DB_USER;
        let DBPassword = process.env.DB_PASSWORD;
        let DBHost = process.env.DB_HOST;
        let DBPort = process.env.DB_PORT;
        let DBName = process.env.DB_NAME;
        if (DBPort == undefined) {
            DBPort = "5432";
        }
        this.config = {
            user: DBUser,
            host: DBHost,
            database: DBName,
            password: DBPassword,
            port: parseInt(DBPort),
        };
        if (DBPort == undefined) {
            console_1.default.log("Can't read DBPort in Env file! I'll use default port!");
            this.config.port = 5432;
        }
        if (DBPassword == undefined) {
            console_1.default.log("Can't read DBPassword in Env file! I'll use default DBPassword!");
            this.config.password = "HeLLo!1";
        }
        if (DBHost == undefined) {
            console_1.default.log("Can't read DBHost in Env file! I'll use default DBHost!");
            this.config.host = "localhost";
        }
        if (DBUser == undefined) {
            console_1.default.log("Can't read DBUser in Env file! I'll use default DBUser!");
            this.config.user = "table_admin";
        }
        if (DBName == undefined) {
            console_1.default.log("Can't read DBName in Env file! I'll use default DBName!");
            this.config.database = "webapp";
        }
    }
    connectDB() {
        return __awaiter(this, void 0, void 0, function* () {
            BaseDao.client = new pg_1.Pool(this.config);
            yield BaseDao.client.connect();
        });
    }
    getClient() {
        if (!BaseDao.client) {
            console_1.default.log("Creating baseDAO...");
            BaseDao.client = new pg_1.Pool(this.config);
        }
        this.connectDB();
        return BaseDao.client;
    }
}
exports.BaseDao = BaseDao;
