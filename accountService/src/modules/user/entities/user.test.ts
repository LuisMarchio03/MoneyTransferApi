import { 
  expect,
  describe,
  it,
} from 'vitest'
import { UserEntity } from './user.entity'

describe('User', () => {
  it('should be able to create a new user', () => {
    const user = new UserEntity({
      id: 1,
      name: 'John Doe',
      email: 'johnDoe@email.com',
      balance: 0,
      cpfCnpj: '12345678910',
      password: '123456',
      type: 'common',
      createdAt: new Date(),
      updatedAt: null,
      deletedAt: null,
    })
    expect(user).toBeInstanceOf(UserEntity) // Espero que user seja uma instância de UserEntity
    expect(user.id).toBe(1) // Espero que o ID do usuário seja 1
  })

  it('should not be able to create a new user with invalid ID', () => {
    expect(() => {
      new UserEntity({
        id: -1,
        name: 'John Doe',
        email: 'johnDoe@email.com',
        balance: 0,
        cpfCnpj: '12345678910',
        password: '123456',
        type: 'common',
        createdAt: new Date(),
        updatedAt: null,
        deletedAt: null,
      })
    }).toThrowError('Invalid ID')
  })

  it('should not be able to create a new user with invalid name', () => {
    expect(() => {
      new UserEntity({
        id: 2,
        name: '',
        email: 'john2@email.com',
        balance: 0,
        cpfCnpj: '12345678910',
        password: '123456',
        type: 'common',
        createdAt: new Date(),
        updatedAt: null,
        deletedAt: null,
      })
    }).toThrowError('Invalid name')    
  })    

  it('should not be able to create a new user with invalid email', () => {
    expect(() => {
      new UserEntity({
        id: 3,
        name: 'john3',
        email: '',
        balance: 0,
        cpfCnpj: '12345678910',
        password: '123456',
        type: 'common',
        createdAt: new Date(),
        updatedAt: null,
        deletedAt: null,
      })
    }).toThrowError('Invalid email')    
  })  

  it('should not be able to create a new user with invalid balance', () => {
    expect(() => {
      new UserEntity({
        id: 4,
        name: 'john4',
        email: 'john4@email.com',
        balance: -1,
        cpfCnpj: '12345678910',
        password: '123456',
        type: 'common',
        createdAt: new Date(),
        updatedAt: null,
        deletedAt: null,
      })
    }).toThrowError('Invalid balance')    
  })  

  it('should not be able to create a new user with invalid CPF/CNPJ', () => {
    expect(() => {
      new UserEntity({
        id: 5,
        name: "John 5",
        email: "john5@email.com",
        balance: 100,
        cpfCnpj: '',
        createdAt: new Date(),
        deletedAt: new Date(),
        updatedAt: null,
        password: "123456",
        type: 'shopkeeper'
      })
    }).toThrowError('Invalid CPF/CNPJ')
  })

  it('should not be able to create a new user with invalid password', () => {
    expect(() => {
      new UserEntity({
        id: 6,
        name: 'john6',
        email: 'john6@email.com',
        balance: 100,
        cpfCnpj: '12345678910',
        password: '',
        type: 'common',
        createdAt: new Date(),
        updatedAt: null,
        deletedAt: null,
      })
    }).toThrowError('Invalid password')    
  })  

  it('should not be able to create a new user with invalid type', () => {
    expect(() => {
      new UserEntity({
        id: 7,
        name: 'john7',
        email: 'john7@email.com',
        balance: 100,
        cpfCnpj: '12121234523',
        password: '123456',
        type: 'invalid' as any, // forçando o tipo para qualquer coisa
        createdAt: new Date(),
        updatedAt: null,
        deletedAt: null,
      })
    }).toThrowError('Invalid type')    
  })  

  it('should not be able to create a new user with invalid created at', () => {
    expect(() => {
      new UserEntity({
        id: 8,
        name: 'john8',
        email: 'john8@email.com',
        balance: 100,
        cpfCnpj: '12121234523',
        createdAt: null as any, // forçando o tipo para qualquer coisa
        deletedAt: new Date(),
        updatedAt: null,
        password: "123456",
        type: 'shopkeeper'
      })
    }).toThrowError('Invalid created at')
  })     
})