// import bodyParser from "body-parser";
import express, { Express, Handler } from "express";

type methodType = "GET" | "POST" | "PUT" | "DELETE";

type rule = {
  pattern: string;
  method: methodType;
  handler: Handler;
};

var bodyParser = require("body-parser");

export class UseRouter {
  private app: Express;
  private rules: rule[];

  constructor(app: Express, version: string) {
    this.app = app;
    this.rules = new Array();
  }

  public addRule(
    pattern: string,
    method: methodType,
    description: string,
    tag: string,
    handler: Handler
  ) {
    this.rules.push({ pattern: pattern, method: method, handler: handler });
    console.log("add router rule : ", method, pattern);
  }

  private handleRoute() {
    this.rules.map((rule) => {
      if (rule.method === "GET") {
        this.app.get("/api/" + rule.pattern, rule.handler);
      }

      if (rule.method === "DELETE") {
        this.app.delete("/api/" + rule.pattern, rule.handler);
      }

      if (rule.method === "POST") {
        var urlencodedParser = bodyParser.urlencoded({ extended: false });
        this.app.post("/api/" + rule.pattern, urlencodedParser, rule.handler);
      }

      if (rule.method === "PUT") {
        this.app.put("/api/" + rule.pattern, rule.handler);
      }
    });
  }

  public listen(port: string | number) {
    this.handleRoute();

    this.app.listen(port, () => {
      console.log("api runs on :" + port);
    });
  }
}
