const tus = require("tus-node-server");

const server = new tus.Server();
server.datastore = new tus.FileStore({
  path: "/files",
});

const express = require("express");
const app = express();
const uploadApp = express();
uploadApp.all("*", server.handle.bind(server));

app.use("/uploads", uploadApp);

app.use("/canabis", express.static("canabis", { redirect: false }));

const host = "127.0.0.1";
const port = 1080;
app.listen(port, host, () => {
  console.log("Server listen on " + host + ":" + port);
});
