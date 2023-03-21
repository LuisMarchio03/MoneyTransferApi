import { User } from "./user.interface";

export class UserEntity {
  private props: User;

  get id(): string {
    return this.props.id;
  }

  get name(): string {
    return this.props.name;
  }

  get email(): string {
    return this.props.email;
  }

  get password(): string {
    return this.props.password;
  }

  get balance(): number {
    return this.props.balance;
  }

  get cpfCnpj(): string {
    return this.props.cpfCnpj;
  }

  get type(): 'common' | 'shopkeeper' {
    return this.props.type;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date | null {
    return this.props.updatedAt;
  }

  get deletedAt(): Date | null {
    return this.props.deletedAt;
  }

  public static isValid(props: User) {
    if (!props.id || typeof props.id !== 'string') {
      throw new Error('Invalid ID');
    }
    
    if (!props.name || props.name.length < 3) {
      throw new Error('Invalid name');
    }

    if (!props.email || props.email.length < 3 || !props.email.includes('@')) {
      throw new Error('Invalid email');
    }

    if (props.balance < 0) {
      throw new Error('Invalid balance');
    }

    if (!props.cpfCnpj || props.cpfCnpj.length < 11) {
      throw new Error('Invalid CPF/CNPJ');
    }

    if (!props.password || props.password.length < 3) {
      throw new Error('Invalid password');
    }

    if (!props.type || (props.type !== 'common' && props.type !== 'shopkeeper')) {
      throw new Error('Invalid type');
    }

    if (!props.createdAt) {
      throw new Error('Invalid created at');
    }

    if (props.updatedAt && props.updatedAt < props.createdAt) {
      throw new Error('Invalid updated at');
    }

    if (props.deletedAt && props.deletedAt < props.createdAt) {
      throw new Error('Invalid deleted at');
    }
  }

  constructor(props: User) {
    UserEntity.isValid(props);
    this.props = props;
  }

}