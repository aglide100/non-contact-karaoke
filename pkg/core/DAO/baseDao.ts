import { Client, ClientConfig, Pool } from "pg";
import console from "console";

let DBUser = process.env.DB_USER;
let DBPassword = process.env.DB_PASSWORD;
let DBHost = process.env.DB_HOST;
let DBPort = process.env.DB_PORT;

let config: ClientConfig = {
  user: "table_admin",
  host: "app_db",
  database: "webapp",
  password: "HeLLo!1",
  port: 5432,
};

export class BaseDao {
  private client: Pool;

  constructor() {
    if (DBPort == undefined) {
      console.log("Can't read DBPort in Env file! I'll use default port!");
      // config.port = 5432;
    }

    if (DBPassword == undefined) {
      console.log(
        "Can't read DBPassword in Env file! I'll use default DBPassword!"
      );
    }

    if (DBHost == undefined) {
      console.log("Can't read DBHost in Env file! I'll use default DBHost!");
    }

    if (DBUser == undefined) {
      console.log("Can't read DBUser in Env file! I'll use default DBUser!");
    }

    this.client = new Pool(config);
    this.client.connect();
    this.client.end();
  }

  private async connectDB() {
    this.client = new Pool(config);
    await this.client.connect();
  }

  public getClient() {
    this.connectDB();

    return this.client;
  }
}
