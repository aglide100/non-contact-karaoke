import express from "express";
// const server = express();
const port = 3000;

class Webd {
  public server: express.Application;

  constructor() {
    this.server = express();
  }
}

const server = new Webd().server;

server.get("/", (req: express.Request, res: express.Response) => {
  res.send("Hello world with express!");
});

server.get("/sum-start", (req: express.Request, res: express.Response) => {
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
