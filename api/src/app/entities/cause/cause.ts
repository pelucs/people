import { Replace } from "@app/helpers/replace";
import { ObjectId } from "bson";

interface CauseProps {
  title: string;
  email: string;
  contact: string;
  createAt: Date;
  expirationAt?: Date | null;
  location: string;
  isPublic: boolean;
  description: string;
  imagesUrl: string[];
}

interface CauseUpdate {
  title?: string | null | undefined;
  email?: string | null | undefined;
  contact?: string | null | undefined;
  location?: string | null | undefined;
  description?: string | null | undefined;
  isPublic?: boolean | null | undefined;
  expirationAt?: Date | null | undefined;
  imagesUrl?: string[] | null | undefined;
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
  public set email(email: string) { this.props.email = email }
  public set contact(contact: string) { this.props.contact = contact }
  public set location(location: string) { this.props.location = location }
  public set description(description: string) { this.props.description = description }
  public set expirationAt(expirationAt: Date) { this.props.expirationAt = expirationAt; }
  public set isPublic(isPublic: boolean) { this.props.isPublic = isPublic; }
  public set imagesUrl(imagesUrl: string[]) { this.props.imagesUrl = imagesUrl; }
  public set createAt(createAt: Date) { this.props.createAt = createAt; }

  public update(data: CauseUpdate) {
    this.props.title = data.title ?? this.props.title;
    this.props.email = data.email ?? this.props.email;
    this.props.contact = data.contact ?? this.props.contact;
    this.props.location = data.location ?? this.props.location;
    this.props.description = data.description ?? this.props.description;
    this.props.expirationAt = data.expirationAt ?? this.props.expirationAt;
    this.props.isPublic = data.isPublic ?? this.props.isPublic;
    this.props.imagesUrl = data.imagesUrl ?? this.props.imagesUrl;
  }

  // Causa privada
  public publish() {
    this.props.isPublic = true;
  }

  // Causa pública
  public unPublish() {
    this.props.isPublic = false;
  }

  public get id() { return this._id }
  public get title() { return this.props.title}
  public get email() { return this.props.email}
  public get contact() { return this.props.contact}
  public get description() { return this.props.description}
  public get location() { return this.props.location}
  public get createAt() { return this.props.createAt}
  public get isPublic() { return this.props.isPublic}
  public get imagesUrl() { return this.props.imagesUrl}
  public get expirationAt(): Date | null | undefined { return this.props.expirationAt}
}