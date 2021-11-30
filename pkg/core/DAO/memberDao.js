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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemberDao = void 0;
const baseDao_1 = require("./baseDao");
const pgp = require("pg-promise");
class MemberDao extends baseDao_1.BaseDao {
    constructor() {
        super();
    }
    static getInstance() {
        if (!MemberDao.instance) {
            console.log("Creating MemberDao Instance...");
            MemberDao.instance = new MemberDao();
        }
        return MemberDao.instance;
    }
    selectAllMember(callback) {
        const q = `SELECT * FROM "Member"`;
        const client = this.getClient();
        let data = Array();
        client.query(q, (err, result) => __awaiter(this, void 0, void 0, function* () {
            if (err) {
                console.log("Can't exec query!" + err);
            }
            const list = result.rows;
            client.end();
            for (var i = 0; i < list.length; i++) {
                let newMember = {
                    member_no: list[i].member_no,
                    name: list[i].name,
                    password: list[i].password,
                };
                data.push(newMember);
            }
            callback(data);
        }));
    }
    selectMember(member, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const q = `SELECT * FROM "Member" where member_no=$1 and password=$2`;
            const client = this.getClient();
            console.log(pgp.as.format(q, [member.member_no, member.password]));
            client.query(q, [member.member_no, member.password], (err, result) => {
                client.end();
                console.log();
                if (err) {
                    console.log("Can't exec query!" + err);
                    callback(null, err);
                    return;
                }
                if (result.rowCount != 0) {
                    callback(result.rows[0], null);
                }
                else {
                    callback(null, null);
                }
            });
        });
    }
    selectMemberByNo(no, callback) {
        const q = `SELECT * FROM "Member" where member_no = $1`;
        const client = this.getClient();
        client.query(q, [no], (err, result) => {
            client.end();
            if (err) {
                console.log("Can't exec query!" + err);
                callback(null, err);
                return;
            }
            if (result.rowCount != 0) {
                callback(result.rows[0], null);
            }
            else {
                callback(null, null);
            }
        });
    }
    insertMember(member, callback) {
        const q = `INSERT INTO "Member"(member_no, name, password) values ($1, $2, $3)`;
        const client = this.getClient();
        client.query(q, [member.member_no, member.name, member.password], (err, result) => {
            client.end();
            if (err) {
                console.log("Can't exec query!" + err);
                callback(null, err);
                return;
            }
            this.selectMember(member, callback);
        });
    }
}
exports.MemberDao = MemberDao;
