import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { SignupDto } from '../src/auth/dto/signup.dto';
import { LoginDto } from '../src/auth/dto/login.dto';
import { PrismaService } from '../prisma/prisma.service';

describe('AuthModule (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    prisma = moduleFixture.get(PrismaService);
    await app.init();
  });

  afterEach(async () => {
    await prisma.user.deleteMany({ where: { email: 'test@example.com' } });
    await app.close();
  });

  describe('/auth/signup (POST)', () => {
    it('should create a new user and return a token', async () => {
      const signupDto: SignupDto = {
        email: 'test@example.com',
        password: 'test1234',
        firstName: 'John',
        lastName: 'Doe',
      };

      const response = await request(app.getHttpServer())
        .post('/auth/signup')
        .send(signupDto)
        .expect(201);

      expect(response.body).toHaveProperty('user');
      expect(response.body.user.email).toEqual(signupDto.email);
      expect(response.body.user.firstName).toEqual(signupDto.firstName);
      expect(response.body.user.lastName).toEqual(signupDto.lastName);
      expect(response.body).toHaveProperty('token');
    });
  });

  describe('/auth/login (POST)', () => {
    const testUser = {
      email: 'test@example.com',
      password: 'test1234',
      firstName: 'John',
      lastName: 'Doe',
    };

    beforeEach(async () => {
      await request(app.getHttpServer()).post('/auth/signup').send(testUser);
    });

    it('should log in a user and return a token', async () => {
      const loginDto: LoginDto = {
        email: testUser.email,
        password: testUser.password,
      };

      const response = await request(app.getHttpServer())
        .post('/auth/login')
        .send(loginDto)
        .expect(201);

      expect(response.body).toHaveProperty('user');
      expect(response.body.user.email).toEqual(testUser.email);
      expect(response.body.user.firstName).toEqual(testUser.firstName);
      expect(response.body.user.lastName).toEqual(testUser.lastName);
      expect(response.body).toHaveProperty('token');
    });

    it('should return a 401 error for an invalid email or password', async () => {
      const loginDto: LoginDto = {
        email: testUser.email,
        password: 'wrongpassword',
      };

      await request(app.getHttpServer())
        .post('/auth/login')
        .send(loginDto)
        .expect(401);
    });
  });
});
