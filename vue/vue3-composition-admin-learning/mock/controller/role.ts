import roles, { routes } from "../mockdb/role";
import { del, get, post, prefix, put } from "../requestDecorator";
import faker from 'faker';

@prefix('/roles')
export default class Roles {
  @get('/getRoles')
  getRoles() {
    return {
      total: roles.length,
      items: roles
    }
  }

  @put('/createRole')
  createRole() {
    return {
      key: faker.datatype.number({ min: 3, max: 10000 })
    }
  }

  @post('/updateRole')
  updateRole(ctx: any) {
    const { role } = ctx.request.body;
    return {
      role
    }
  }

  @del('/deleteRole')
  deleteRole() {
    return 'delete success'
  }

  @get('/getRoutes')
  getRoutes() {
    return {
      routes
    }
  }
}
