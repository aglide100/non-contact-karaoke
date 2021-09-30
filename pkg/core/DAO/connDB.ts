import pgStructure, { Db } from "pg-structure";

const dbconfig = {
  host: "",
  user: "",
  password: "",
  database: "",
  port: "",
};

// const { Client, Pool } = require("pg");

export class ConnDB {
  private static db: Db;

  constructor() {
    this.connectDB();
  }

  private async connectDB() {
    const db = await pgStructure(
      {
        database: dbconfig.database,
        user: dbconfig.user,
        password: dbconfig.password,
      },
      { includeSchemas: ["public"] }
    );

    return (ConnDB.db = db);
  }

  public getTable() {
    console.log(ConnDB.db.get("contact"));
  }
}
