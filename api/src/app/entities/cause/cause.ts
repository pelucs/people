import { Replace } from "@app/helpers/replace";
import { ObjectId } from "bson";

interface CauseProps {
  title: string;
  userId: string;
  email: string;
  contact: string;
  createAt: Date;
  location: string;
  description: string;
}

interface CauseUpdate {
  title?: string | null | undefined;
  email?: string | null | undefined;
  contact?: string | null | undefined;
  location?: string | null | undefined;
  description?: string | null | undefined;
}

export class Cause {
  private _id: string;
  private props: CauseProps;

  constructor(props: Replace<CauseProps, { createAt?: Date }>, id?: string) {
    this._id = id ?? new ObjectId().toHexString()
    this.props = {
      ...props,
      createAt: props.createAt ?? new Date()
    }
  }
 
  public set title(title: string) { this.props.title = title }
  public set userId(userId: string) { this.props.userId = userId }
  public set email(email: string) { this.props.email = email }
  public set contact(contact: string) { this.props.contact = contact }
  public set location(location: string) { this.props.location = location }
  public set description(description: string) { this.props.description = description }
  public set createAt(createAt: Date) { this.props.createAt = createAt; }

  public update(data: CauseUpdate) {
    this.props.title = data.title ?? this.props.title;
    this.props.email = data.email ?? this.props.email;
    this.props.contact = data.contact ?? this.props.contact;
    this.props.location = data.location ?? this.props.location;
    this.props.description = data.description ?? this.props.description;
  }

  public get id() { return this._id }
  public get userId() { return this.props.userId }
  public get title() { return  this.props.title}
  public get email() { return  this.props.email}
  public get contact() { return  this.props.contact}
  public get description() { return  this.props.description}
  public get location() { return  this.props.location}
  public get createAt() { return  this.props.createAt}
}