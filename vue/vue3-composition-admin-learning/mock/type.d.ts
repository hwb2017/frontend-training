import { Context, Next } from 'koa'

type MiddleWare = (...arg: any[]) => (ctx: Context, next?: Next) => Promise<void>;

interface PathMeta {
  name: string;
  path: string;
}

interface RouteMeta {
  name: string;
  method: string;
  path: string;
  isVerify: boolean;
}

interface UserBean {
  id: number
  username: string
  password: string
  name: string
  email: string
  phone: string
  avatar: string
  introduction: string
  roles: string[]
}

interface RoleBean {
  key: string
  name: string
  description: string
  routes: any
}

export {
  MiddleWare,
  PathMeta,
  RouteMeta,
  UserBean,
  RoleBean
}
