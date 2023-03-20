import { describe, expect, it, vi, beforeEach } from 'vitest';
import { CreateUserLambda } from './create-user';

let event: any;
let usecase: any;
let producer: any;

describe('CreateUserLambda', () => {
  beforeEach(() => {
    event = {
      body: JSON.stringify({
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: 'password123',
        balance: 100,
        cpfCnpj: '123456789',
        type: 'common',
      }),
    };

    usecase = {
      execute: vi.fn().mockResolvedValue({
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: 'password123',
        balance: 100,
        cpfCnpj: '123456789',
        type: 'common',
      }),
    };

    producer = {
      execute: vi.fn(),
    };
  })

  it('should create a user and return a success message', async () => {
    const lambdaFunction = new CreateUserLambda(usecase as any, producer as any);
    const result = await lambdaFunction.run(event as any);
    expect(result.statusCode).toEqual(200);
    expect(result.body).toContain('User created successfully');
    expect(result.body).toContain('123');
    expect(result.body).toContain('John Doe');
    expect(result.body).toContain('johndoe@example.com');
    expect(result.body).toContain('100');
  });

  it('should return a 400 error if there is an error creating the user', async () => {
    usecase.execute.mockRejectedValue(new Error('Error creating user'));
    const lambdaFunction = new CreateUserLambda(usecase as any, producer as any);
    const result = await lambdaFunction.run(event as any);
    expect(result.statusCode).toEqual(400);  
  });

  it('should return a 400 error if there is an error sending the message', async () => {
    producer.execute.mockRejectedValue(new Error('Error sending message'));
    const lambdaFunction = new CreateUserLambda(usecase as any, producer as any);
    const result = await lambdaFunction.run(event as any);
    expect(result.statusCode).toEqual(400);  
  });
});
