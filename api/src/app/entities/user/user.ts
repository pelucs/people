import { ObjectId } from "bson";

export interface UserProps {
  name: string;
  email: string;
  password: string;
  type: string; // admin | support
  permissions: string[]; // create | edit | delete
}

export class User {
  private _id: string;
  private props: UserProps;

  constructor(props: UserProps, id?: string) {
    this._id = id ?? new ObjectId().toHexString()
    this.props = props
  }

  public set name(name: string) { this.props.name = name }
  public set email(email: string) { this.props.email = email }
  public set password(password: string) { this.props.password = password }
  public set type(type: string) { this.props.type = type }
  public set permissions(permissions: string[]) { this.props.permissions = permissions }

  public get id() { return this._id }
  public get name() { return this.props.name }
  public get email() { return this.props.email }
  public get password() { return this.props.password }
  public get type() { return this.props.type }
  public get permissions() { return this.props.permissions }
}