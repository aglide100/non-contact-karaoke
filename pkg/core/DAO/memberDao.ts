import { BaseDao } from "./baseDao";
import { MemberProps } from "../../../ui/common/MemberProps";

const pgp = require("pg-promise");

export class MemberDao extends BaseDao {
  private static instance: MemberDao;

  constructor() {
    super();
  }

  public static getInstance(): MemberDao {
    if (!MemberDao.instance) {
      console.log("Creating MemberDao Instance...");
      MemberDao.instance = new MemberDao();
    }

    return MemberDao.instance;
  }

  public async selectAllMember(callback: Function) {
    const q = `SELECT * FROM "Member"`;
    const pool = this.getPool();

    let data = Array();

    try {
      await pool.connect((err, client, release) => {
        if (err) {
          return err;
        }

        client.query(q, async (err, result) => {
          if (err) {
            console.log("Can't exec query!" + err);
          }
          const list = result.rows;

          for (var i = 0; i < list.length; i++) {
            let newMember: MemberProps = {
              member_no: list[i].member_no,
              name: list[i].name,
              password: list[i].password,
            };
            data.push(newMember);
          }

          client.release();
          callback(data);
        });
      });
    } catch (e) {
      console.log("Dao Error !", e);
    }
  }

  public async selectMember(member: MemberProps, callback: Function) {
    const q = `SELECT * FROM "Member" where member_no=$1 and password=$2`;
    const pool = this.getPool();

    try {
      await pool.connect((err, client, release) => {
        if (err) {
          return err;
        }

        client.query(q, [member.member_no, member.password], (err, result) => {
          console.log();

          if (err) {
            console.log("Can't exec query!" + err);
            callback(null, err);
          }

          client.release();
          if (result.rowCount != 0) {
            callback(result.rows[0], null);
          } else {
            callback(null, null);
          }
        });
      });
    } catch (e) {
      console.log("Dao Error !", e);
    }
  }

  public async selectMemberByNo(no: String, callback: Function) {
    const q = `SELECT * FROM "Member" where member_no = $1`;
    const pool = this.getPool();

    try {
      await pool.connect((err, client, release) => {
        if (err) {
          return err;
        }

        client.query(q, [no], (err, result) => {
          if (err) {
            console.log("Can't exec query!" + err);
            callback(null, err);
            return;
          }

          client.release();
          if (result.rowCount != 0) {
            callback(result.rows[0], null);
          } else {
            callback(null, null);
          }
        });
      });
    } catch (e) {
      console.log("Dao Error !", e);
    }
  }

  public async insertMember(member: MemberProps, callback: Function) {
    const q = `INSERT INTO "Member"(member_no, name, password) values ($1, $2, $3)`;
    const pool = this.getPool();

    try {
      await pool.connect((err, client, release) => {
        if (err) {
          return err;
        }

        client.query(
          q,
          [member.member_no, member.name, member.password],
          (err, result) => {
            if (err) {
              console.log("Can't exec query!" + err);
              callback(null, err);
              return;
            }

            this.selectMember(member, callback);
          }
        );
      });
    } catch (e) {
      console.log("Dao Error !", e);
    }
  }
}
