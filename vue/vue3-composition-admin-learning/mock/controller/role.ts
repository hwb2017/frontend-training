import roles, { routes } from "../mockdb/role";
import { del, get, post, prefix, put } from "../requestDecorator";
import faker from 'faker';

@prefix('/roles')
export default class Roles {
  @get('/getRoles')
  async getRoles() {
    return {
      total: roles.length,
      items: roles
    }
  }

  @put('/createRole')
  async createRole() {
    return {
      key: faker.datatype.number({ min: 3, max: 10000 })
    }
  }

  @post('/updateRole')
  async updateRole(ctx: any) {
    const { role } = ctx.request.body;
    return {
      role
    }
  }

  @del('/deleteRole')
  async deleteRole() {
    return 'delete success'
  }

  @get('/getRoutes')
  async getRoutes() {
    return {
      routes
    }
  }
}
