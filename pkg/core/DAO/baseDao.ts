import { ClientConfig, Pool } from "pg";
import console from "console";

export class BaseDao {
  public static pool: Pool;
  public static havingErr: boolean;
  private config: ClientConfig;

  constructor() {
    BaseDao.havingErr = false;
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
    BaseDao.pool = new Pool(this.config);
    try {
      await BaseDao.pool.connect();
    } catch (e) {
      setTimeout(() => {
        console.log("Can't access db... retry connect...");
        this.connectDB();
      }, 5000);
    }
  }

  public getPool() {
    if (!BaseDao.pool || BaseDao.havingErr) {
      console.log("Creating baseDAO...");
      BaseDao.pool = new Pool(this.config);
    }

    return BaseDao.pool;
  }
}
