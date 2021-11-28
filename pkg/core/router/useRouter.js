"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UseRouter = void 0;
var bodyParser = require("body-parser");
class UseRouter {
    constructor(app, version) {
        this.app = app;
        this.rules = new Array();
    }
    addRule(pattern, method, description, tag, handler) {
        this.rules.push({ pattern: pattern, method: method, handler: handler });
        console.log("add router rule : ", method, pattern);
    }
    handleRoute() {
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
    listen(port) {
        this.handleRoute();
        this.app.listen(port, () => {
            console.log("api runs on :" + port);
        });
    }
}
exports.UseRouter = UseRouter;
