// import Koa from "koa";
// import Router from "koa-router";
// import fs from "fs";
// import path from "path";
const Koa = require("koa");
const Router = require("koa-router");
const fs = require("fs");
const path = require("path");
const app = new Koa();
const router = new Router();

router.get("/api/goods", async (ctx) => {
  const data = fs.readFileSync(path.resolve("data/goods.json"), "utf8");
  ctx.body = JSON.stringify(JSON.parse(data));
});
router.get("/api/ratings", async (ctx) => {
  const data = fs.readFileSync(path.resolve("data/ratings.json"), "utf8");
  ctx.body = JSON.stringify(JSON.parse(data));
});
router.get("/api/seller", async (ctx) => {
  const data = fs.readFileSync(path.resolve("data/seller.json"), "utf8");
  ctx.body = JSON.stringify(JSON.parse(data));
});
app.use(router.routes()).use(router.allowedMethods());
app.listen(3000);
