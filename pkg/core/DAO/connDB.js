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
exports.ConnDB = void 0;
const pg_structure_1 = __importDefault(require("pg-structure"));
const dbconfig = {
    host: "",
    user: "",
    password: "",
    database: "",
    port: "",
};
// const { Client, Pool } = require("pg");
class ConnDB {
    constructor() {
        this.connectDB();
    }
    connectDB() {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield (0, pg_structure_1.default)({
                database: dbconfig.database,
                user: dbconfig.user,
                password: dbconfig.password,
            }, { includeSchemas: ["public"] });
            return (ConnDB.db = db);
        });
    }
    getTable() {
        console.log(ConnDB.db.get("contact"));
    }
}
exports.ConnDB = ConnDB;
