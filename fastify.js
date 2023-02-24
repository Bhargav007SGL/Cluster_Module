// CommonJs
const fastify = require("fastify")({
  //   logger: true,
});

const cluster = require("cluster");
// import http from "node:http";
const http = require("http");
// import { availableParallelism } from "node:os";
const os = require("os");

const numCPUs = os.cpus().length;

fastify.get("/", async (request, reply) => {
  return { hello: "world" };
});

/**
 * Run the server!
 */
const start = async () => {
  try {
    if (cluster.isMaster) {
      for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
      }
    } else {
      await fastify.listen({ port: 3000 }, (err, address) => {
        console.log(address + process.pid);
      });
    }
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
