import express from "express";
import path from "path";

const port = 3500;
const uiPath = path.join(__dirname, "../../ui/out");
const server = express();

server.use(express.static(uiPath));
server.use("/next", express.static(path.join(__dirname, "../../ui/.next")));

server.listen(port, () => {
  console.log("static webd on at http://localhost:" + port);
});
