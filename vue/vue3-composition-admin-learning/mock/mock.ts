import Koa, {Context} from 'koa';
import koaBody from 'koa-body';
import koaRouter from 'koa-router';
import logger from 'koa-logger';
import log4js from 'log4js';
import chalk from 'chalk';
import cors from 'koa2-cors';
import { ResultHandler } from './middleware/resultHandler';
import addRouter from './router';

const app = new Koa();
app.use(cors());
const router = new koaRouter();

const port = 3300;
const log4 = log4js.getLogger();
log4.level = "debug";

// 配置koa-logger
app.use(logger(info => {
  log4.debug(info);
}));
// 转化请求体
app.use(koaBody());
app.use(async (ctx, next) => {
  await next();
  log4.debug(chalk.green('请求body: ') + JSON.stringify(ctx.request.body));
  log4.debug(chalk.green('返回数据: ') + JSON.stringify(ctx.body));
});
// 封装响应体
app.use(ResultHandler());
// 加载路由
addRouter(router);
// 启动路由
app.use(router.routes()).use(router.allowedMethods());

// 如果啥路由都没匹配到，则执行最内层的中间件，返回404
app.use(async (ctx: Context) => {
  log4.error(`404 ${ctx.message} : ${ctx.href}`);
  ctx.status = 404;
  ctx.body = "404! api not found!";
});

// koa already had middleware to deal with the error, just register the error event
app.on("error", (err, ctx: Context) => {
  log4.error(err);
  ctx.status = 500;
  if (ctx.app.env !== "development") {
    ctx.res.end(err.stack);
  }
});

app.listen(port, () => {
  log4.debug("mock server running at: http://localhost:%d", port);
})
