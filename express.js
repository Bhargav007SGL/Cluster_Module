const express = require("express");
const app = express();
const port = 3000;
// import cluster from "node:cluster";
const cluster = require("cluster");
// import http from "node:http";
const http = require("http");
// import { availableParallelism } from "node:os";
const os = require("os");

const numCPUs = os.cpus().length;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

if (cluster.isMaster) {
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
}
else
{
app.listen(port, () => {
  console.log(`Example app listening on port ${port} ${process.pid}`);
});
}
