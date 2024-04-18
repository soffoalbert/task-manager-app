import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import { Task } from '../src/task/domain/task';

describe('TaskController (e2e)', () => {
  let app: INestApplication;
  let authToken;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        AppModule.register({
          driver: 'orm',
        }),
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  beforeEach(async () => {
    // Sign up a user
    const signUpResponse = await request(app.getHttpServer())
      .post('/authentication/register')
      .send({ email: 'sofo@example.com', password: 'password' });

    console.log(signUpResponse.status);

    // Ensure sign up was successful
    expect(signUpResponse.status).toBe(201);

    // Sign in to obtain JWT token
    const signInResponse = await request(app.getHttpServer())
      .post('/authentication/signin')
      .send({ email: 'sofo@example.com', password: 'password' });

    // Ensure sign in was successful
    expect(signInResponse.status).toBe(200);

    // Extract JWT token from the response
    authToken = signInResponse.body.access_token;

    console.log('Token', authToken);
  });

  it('/tasks (POST)', async () => {
    const task: Task = {
      id: 1,
      title: 'Test Task',
      description: 'Test description',
    };

    return request(app.getHttpServer())
      .post('/tasks')
      .set('Authorization', `Bearer ${authToken}`)
      .send(task)
      .expect(201)
      .expect(task);
  });

  it('/tasks/:id (PATCH)', async () => {
    const task: Task = {
      id: 1,
      title: 'Updated Test Task',
      description: 'Updated Test description',
    };

    return request(app.getHttpServer())
      .patch('/tasks/1')
      .set('Authorization', `Bearer ${authToken}`)
      .send(task)
      .expect(200)
      .expect(task);
  });

  it('/tasks (GET)', async () => {
    return request(app.getHttpServer())
      .get('/tasks')
      .set('Authorization', `Bearer ${authToken}`)
      .expect(200)
      .expect([]);
  });

  it('/tasks/:id (DELETE)', async () => {
    return request(app.getHttpServer())
      .delete('/tasks/1')
      .set('Authorization', `Bearer ${authToken}`)
      .expect(200);
  });

  it('/tasks/:id/complete (POST)', async () => {
    const task: Task = {
      id: 1,
      title: 'Completed Task',
      description: 'Task description',
    };

    return request(app.getHttpServer())
      .post('/tasks/1/complete')
      .set('Authorization', `Bearer ${authToken}`)
      .expect(200)
      .expect(task);
  });
});
