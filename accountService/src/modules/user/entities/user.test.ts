import { 
  expect,
  describe,
  it,
} from 'vitest'
import { UserEntity } from './user.entity'

describe('User', () => {
  it('should be able to create a new user', () => {
    const user = new UserEntity({
      id: "1",
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
    expect(user.id).toBe("1") // Espero que o ID do usuário seja 1
  })

  it('should not be able to create a new user with invalid ID', () => {
    expect(() => {
      new UserEntity({
        id: 1 as any,
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
        id: "2",
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
        id: "3",
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
        id: "4",
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
        id: "5",
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
        id: "6",
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
        id: "7",
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
        id: "8",
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

  it('should not be able to create a new user with invalid update at', () => {
    const date = new Date()
    const date2 = new Date(
      date.getDay() - 1,
    )
    expect(() => {
      new UserEntity({
        id: "9",
        name: 'john9',
        email: 'john9@mail.com',
        balance: 100,
        cpfCnpj: '12121234523',
        createdAt: date,
        deletedAt: null,
        updatedAt: date2,
        password: "123456",
        type: 'shopkeeper'
      })
    }).toThrowError('Invalid updated at')
  })     

  it('should not be able to create a new user with invalid created at', () => {
    const date = new Date()
    const date2 = new Date(
      date.getDay() - 1,
    )
    expect(() => {
      new UserEntity({
        id: "10",
        name: 'john10',
        email: 'john10@mail.com',
        balance: 100,
        cpfCnpj: '12121234523',
        createdAt: date,
        deletedAt: date2,
        updatedAt: null,
        password: "123456",
        type: 'shopkeeper'
      })
    }).toThrowError('Invalid deleted at')
  })     

  it('should be able to get user id', () => {
    const user = new UserEntity({
      id: "1",
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
    expect(user.id).toBe("1")
  })

  it('should be able to get user name', () => {
    const user = new UserEntity({
      id: "1",
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
    expect(user.name).toBe('John Doe')
  })

  it('should be able to get user email', () => {
    const user = new UserEntity({
      id: "1",
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
    expect(user.email).toBe('johnDoe@email.com')
  })

  it('should be able to get user balance', () => {
    const user = new UserEntity({
      id: "1",
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
    expect(user.balance).toBe(0)
  })

  it('should be able to get user cpfCnpj', () => {
    const user = new UserEntity({
      id: "1",
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
    expect(user.cpfCnpj).toBe('12345678910')
  })


  it('should be able to get user password', () => {
    const user = new UserEntity({
      id: "1",
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
    expect(user.password).toBe('123456')
  })

  it('should be able to get user type', () => {
    const user = new UserEntity({
      id: "1",
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
    expect(user.type).toBe('common')
  })

  it('should be able to get user createdAt', () => {
    const createdAt = new Date()
    const user = new UserEntity({
      id: "1",
      name: 'John Doe',
      email: 'johnDoe@email.com',
      balance: 0,
      cpfCnpj: '12345678910',
      password: '123456',
      type: 'common',
      createdAt,
      updatedAt: null,
      deletedAt: null,
    })
    expect(user.createdAt).toBe(createdAt)
  })

  it('should be able to get user updatedAt', () => {
    const createdAt = new Date()
    const updatedAt = new Date()
    const user = new UserEntity({
      id: "1",
      name: 'John Doe',
      email: 'johnDoe@email.com',
      balance: 0,
      cpfCnpj: '12345678910',
      password: '123456',
      type: 'common',
      createdAt,
      updatedAt,
      deletedAt: null,
    })
    expect(user.updatedAt).toBe(updatedAt)
  })
    
  it('should be able to get user updatedAt', () => {
    const createdAt = new Date()
    const updatedAt = new Date()
    const deletedAt = new Date()
    const user = new UserEntity({
      id: "1",
      name: 'John Doe',
      email: 'johnDoe@email.com',
      balance: 0,
      cpfCnpj: '12345678910',
      password: '123456',
      type: 'common',
      createdAt,
      updatedAt,
      deletedAt,
    })
    expect(user.deletedAt).toBe(deletedAt)
  })
})