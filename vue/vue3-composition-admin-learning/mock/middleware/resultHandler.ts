import type { MiddleWare } from "../type";
import log from "../utils/logger";

export interface ResultInfo {
  code: number;
  msg?: string;
  data?: any;
  err?: any
}

export const ResultHandler: MiddleWare = () => async (ctx, next) => {
  const r :ResultInfo = {code: 0};
  try {
    const data: any = await next();
    r.code = 0;
    r.msg = 'success';
    r.data = data;
  } catch (err) {
    log.error(err);
    log.error('xxx'+err.statusCode);
    r.code = err.statusCode;
    switch (err.statusCode) {
      case 102:
        r.msg = "用户不存在";
        break;
      default:
        break;
    }
  }
  ctx.body = r;
}
