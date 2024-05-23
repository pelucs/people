import { ObjectId } from "bson";
import { Replace } from "../../helpers/replace";

export interface UserProps {
  name: string;
  email: string;
  password: string;
  type: string;
  createAt: Date;

  address?: string | null;
  contact?: string | null;
}

export class User {
  private _id: string;
  private props: UserProps;

  constructor(props: Replace<UserProps, { createAt?: Date }>, id?: string) {
    this._id = id ?? new ObjectId().toHexString()
    this.props = {
      ...props,
      createAt: props.createAt ?? new Date()
    }
  }

  public set name(name: string) { this.props.name = name }
  public set email(email: string) { this.props.email = email }
  public set password(password: string) { this.props.password = password }
  public set type(type: string) { this.props.type = type }
  public set address(address: string) { this.props.address = address }
  public set contact(contact: string) { this.props.contact = contact }
  public set createAt(createAt: Date) { this.props.createAt = createAt; }

  public get id() { return this._id }
  public get name() { return this.props.name }
  public get email() { return this.props.email }
  public get password() { return this.props.password }
  public get type() { return this.props.type }
  public get createAt() { return this.props.createAt }
  public get address(): string | null | undefined { return this.props.address }
  public get contact(): string | null | undefined { return this.props.contact }
}