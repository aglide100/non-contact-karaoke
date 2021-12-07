import { Client, ClientConfig, Pool } from "pg";
import console from "console";

export class BaseDao {
  private static client: Pool;
  private config: ClientConfig;

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
      console.log("Can't read DBPort in Env file! I'll use default port!");
      this.config.port = 5432;
    }

    if (DBPassword == undefined) {
      console.log(
        "Can't read DBPassword in Env file! I'll use default DBPassword!"
      );
      this.config.password = "HeLLo!1";
    }

    if (DBHost == undefined) {
      console.log("Can't read DBHost in Env file! I'll use default DBHost!");
      this.config.host = "localhost";
    }

    if (DBUser == undefined) {
      console.log("Can't read DBUser in Env file! I'll use default DBUser!");
      this.config.user = "table_admin";
    }

    if (DBName == undefined) {
      console.log("Can't read DBName in Env file! I'll use default DBName!");
      this.config.database = "webapp";
    }
  }

  private async connectDB() {
    BaseDao.client = new Pool(this.config);
    await BaseDao.client.connect();
  }

  public getClient() {
    if (!BaseDao.client) {
      console.log("Creating baseDAO...");
      BaseDao.client = new Pool(this.config);
    }

    this.connectDB();

    return BaseDao.client;
  }
}
