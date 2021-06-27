import 'reflect-metadata'
import fs from 'fs'
import path from 'path'
import { ROUTE_MAP, BASE_PATH_MAP } from './constant'
import { RouteMeta, PathMeta } from './type'
import Router from 'koa-router'

const addRouter = (router: Router) => {
  const ctrPath = path.join(__dirname, 'controller');
  //ObjectConstructor是ts中的object对象的类型
  const modules: ObjectConstructor[] = [];
  // 扫描controller文件夹，收集所有controller
  fs.readdirSync(ctrPath).forEach(name => {
    if (/^[\s\S]+\.(t|j)s$/.test(name)) {
      modules.push(require(path.join(ctrPath, name)).default)
    }
  });
  // fs.readdirSync(ctrPath).forEach(async(name) => {
  //   if (/^[\s\S]+\.(t|j)s$/.test(name)) {
  //     modules.push((await import(path.join(ctrPath, name))).default)
  //   }
  // });
  // console.log(modules);

  // 结合meta数据添加路由和验证,这一步其实也可以在每一个类的类装饰器里实现
  modules.forEach(m => {
    // 从对象(路由控制类)的元信息中获取从类装饰器获取的路径前缀信息和从方法装饰器获取详细路由信息
    const routeMap: RouteMeta[] = Reflect.getMetadata(ROUTE_MAP, m, 'method') || [];
    const basePathMap: PathMeta[] = Reflect.getMetadata(BASE_PATH_MAP, m) || [];
    const basePath: PathMeta = basePathMap.pop();
    if (routeMap.length) {
      const ctr = new m();
      routeMap.forEach(route => {
        const {name, method, path} = route;
        const newPath: String = basePath ? (basePath.path + path) : path;
        // console.log(method, newPath, ctr[name]);
        router[method](newPath, ctr[name]);
      })
    }
  })
  // console.log(router.stack);
}

export default addRouter
