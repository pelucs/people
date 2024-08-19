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
      expirationAt: raw.expirationAt
    }, raw.id)
  }
}