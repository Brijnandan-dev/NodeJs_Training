
// nock → Used to mock external API calls.
// supertest → Helps simulate API requests to test Express routes.
const nock = require('nock');
const request = require('supertest');
//jo jo real me use kiya usse import kro first
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const UserService = require('../../../user/service/userService');
const redisClient = require('../../../../../utils/redisClient');
const {getRolePermissions} = require('../../../roles/service/assignRolePermissionService');
const {getUserRoles} = require('../../../user/service/userRoleService');

//jaha jaha se jo real me use kiya bo aaya h usse mock kro 
jest.mock('../../../user/service/userService');
jest.mock('../../../user/service/userRoleService');
jest.mock('../../../roles/service/assignRolePermissionService');
jest.mock('jsonwebtoken');
jest.mock('bcrypt');
jest.mock('../../../../../utils/redisClient');

const user = {
  userId: 'd549b39b-3878-4bbb-9f4c-5ba5c0064672',
  username: 'testUser',
  useremail: 'test@user.com',
  isEmailVerified: true,
  isActive: true,
  is_verified: true
};

const token = {
  accessToken: 'testaccesstoken',
  refreshToken: 'testrefreshtoken',
};

const roles = ['admin', 'user'];
const permissions = ['read', 'write'];

beforeEach(() => {
  jest.clearAllMocks();
});

describe('loginUser', () => {
  it.only('should login successfully with valid credentials', async () => {
    const req = { body: { identifier: 'testUser', password: 'test@12345' } };

    //mock nactual function result
    UserService.getUsersByEmailOrUserName.mockResolvedValue(user);
    bcrypt.compare.mockResolvedValue(true);
    jwt.sign.mockReturnValueOnce(token.accessToken).mockReturnValueOnce(token.refreshToken);
    getUserRoles.mockReturnValue(roles);
    getRolePermissions.mockResolvedValue(permissions);
    UserService.getUserPermissions.mockResolvedValue(permissions);
    redisClient.SET.mockResolvedValue();

    //here intercepts the API request made by supertest and returns a fake response.
    nock('http://localhost:3000')
      .post('/user/login')
      .reply(200, { message: 'Login successful', token });

    //make api call
    await request('http://localhost:3000')
      .post('/user/login')
      .send(req.body)
      .expect(200)
      .then((response) => {
        expect(response.body).toHaveProperty('message', 'Login successful');
        expect(response.body).toHaveProperty('token');
      });
  });
});
