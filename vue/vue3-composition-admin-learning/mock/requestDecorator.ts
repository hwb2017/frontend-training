import 'reflect-metadata'
import { ROUTE_MAP, BASE_PATH_MAP } from './constant'

function createMethodDecorator(method: string) {
  // 方法装饰器接收路由 path 作为参数
  return function httpMethodDecorator(path: string) {
    return (proto: any, name: string) => {
      const target = proto.constructor;
      const routeMap = Reflect.getMetadata(ROUTE_MAP, target, 'method') || [];
      routeMap.push({ name, method, path});
      Reflect.defineMetadata(ROUTE_MAP, routeMap, target, 'method');
    };
  };
}

function createClassDecorator() {
  return function httpMethodDecorator(basePath: string): ClassDecorator {
    return (proto: any) => {
      const target = proto;
      const pathMap = Reflect.getMetadata(BASE_PATH_MAP, target) || [];
      pathMap.push({path:basePath});
      Reflect.defineMetadata(BASE_PATH_MAP, pathMap, target);
    };
  };
}

// 路径前缀
export const prefix = createClassDecorator();

// 导出 http method 装饰器
export const post = createMethodDecorator('post');

export const get = createMethodDecorator('get');

export const del = createMethodDecorator('del');

export const put = createMethodDecorator('put');

export const patch = createMethodDecorator('patch');

export const options = createMethodDecorator('options');

export const head = createMethodDecorator('head');

export const all = createMethodDecorator('all');
