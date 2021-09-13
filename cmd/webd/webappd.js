import express from "express";
import { sayHello } from "../../hello";
const server = express();
const port = 3000;

server.get("/", (req, res) => {
  res.send("Hello world with express!");
});

server.get("/greet", (req, res) => {
  var msg = sayHello();
  res.send(msg);
});

server.get("/sum-start", (req, res) => {
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
