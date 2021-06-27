import userList from "../mockdb/userList";
import { get, post, prefix } from "../requestDecorator";
import * as Koa from 'koa';

@prefix('/user')
export default class User {
  @post('/login')
  login(ctx: any) {
    const { username } = ctx.request.body;
    for (const user of userList) {
      if (user.username === username) {
        return {
          accessToken: username + '-token'
        }
      }
    }
    return ctx.throw(401);
  }

  @get('/userInfo')
  getUserInfo(ctx: Koa.Context) {
    let token = ctx.request.header.token
    return token === 'admin-token' ? userList[0] : userList[1]
  }

  @get('/getUsers')
  getUsers(ctx: Koa.Context) {
    const { name } = ctx.query;
    const users = userList.filter(user => {
      const lowerCaseName = user.name.toLowerCase();
      return (!name && lowerCaseName.indexOf((name as string).toLowerCase()) < 0);
    })
    return {
      code: 20000,
      data: {
        items: users
      }
    }
  }

}
