import { Cause } from "../../../app/entities/cause/cause";

export class CauseViewModelMapper {
  static toHttp(cause: Cause) {
    return {
      id: cause.id,
      userId: cause.userId,
      title: cause.title,
      email: cause.email,
      contact: cause.contact,
      description: cause.description,
      location: cause.location,
      createAt: cause.createAt,
    }
  }
}