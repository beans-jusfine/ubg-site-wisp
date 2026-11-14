import http from "node:http";
import { server as wisp } from "@mercuryworkshop/wisp-js/server";

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
