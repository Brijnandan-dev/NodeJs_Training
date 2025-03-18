const express = require('express');
const userRoutes = require('../../routes');
const UserService = require('../../service/userService');
const AppError = require('../../../../../utils/appErrors');
const bcrypt = require('bcrypt');
const redisClient = require('../../../../../utils/redisClient');
const { generateTokens } = require('../../controllers/userController');
const { default: axios } = require('axios');
const request = require('supertest')

jest.mock('../../service/userService');
jest.mock('../../../../../utils/redisClient');
jest.mock('bcrypt');
jest.mock('../../controllers/userController');
jest.mock('axios');

const app = express();
app.use(express.json());
app.use('/api/users', userRoutes);

describe('User Login Controller', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('should print on console',() =>{
    console.log("34567890")
  })
  it('should return 200 with login successfull message',async() =>{
    const tempUser = {identifier: "Brij", password: "Brij@123456"}
    const userDetails = {
        userId: '5403ffdb-1ee6-417b-89b5-7df99438c1e8',
        username: 'Brij',
        useremail: 'test@yopmail.com',
        password: '$2b$10$gExqK1J.bgiT0BK8qcwkO.b3OPEEJMYg4.HcmI2icTeng.9e2RQIm',
        isEmailVerified: true,
        isActive: true,
        created_at: `2025-03-10T10:43:09.973Z`,
        updated_at: `2025-03-10T10:43:09.973Z`,
        createdBy: null,
        modifiedBy: null,
        is_verified: true
      }

      UserService.getUsersByEmailOrUserName.mockResolvedValue(userDetails);
      bcrypt.compare.mockResolvedValue(true);
      generateTokens.mockResolvedValue({ accessToken: 'access_token', refreshToken: 'refresh_token' })
      // axios.post('http://localhost:3000/user/login').mockResolvedValue
  })
});
