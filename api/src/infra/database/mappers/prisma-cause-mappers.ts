import { Cause } from "../../../app/entities/cause/cause";
import { Cause as RawCause } from '@prisma/client';

export class PrismaCauseMappers {
  static toPrisma(cause: Cause) {
    return {
      id: cause.id,
      title: cause.title,
      email: cause.email,
      contact: cause.contact,
      description: cause.description,
      location: cause.location,
      createAt: cause.createAt,
      imagesUrl: cause.imagesUrl,
      isPublic: cause.isPublic,
    }
  }

  static toDomain(raw: RawCause): Cause {
    return new Cause({
      title: raw.title,
      email: raw.email,
      contact: raw.contact,
      description: raw.description,
      createAt: raw.createAt,
      location: raw.location,
      isPublic: raw.isPublic,
      imagesUrl: raw.imagesUrl,
    }, raw.id)
  }
}