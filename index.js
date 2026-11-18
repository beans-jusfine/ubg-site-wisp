import http from "node:http";
import { server as wisp, logging } from "@mercuryworkshop/wisp-js/server";

// Reduce repeated DNS lookups for frequently visited hosts and keep routine
// connection chatter out of the logs without hiding warnings and errors.
wisp.options.dns_ttl = 300;
wisp.options.dns_cache_size = 8192;
logging.set_level(logging.WARN);

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Wisp server is running!");
});

server.on("upgrade", (req, socket, head) => {
  if (req.url.endsWith("/wisp/")) {
    wisp.routeRequest(req, socket, head);
  } else {
    socket.end();
  }
});

const port = process.env.PORT || 8080;
server.listen(port, () => {
  console.log(`Wisp server listening on port ${port}`);
});
