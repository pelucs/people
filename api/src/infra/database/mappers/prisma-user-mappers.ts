import { User as RawUser } from '@prisma/client';
import { User } from "../../../app/entities/user/user";

export class PrismaUserMappers {
  static toPrisma(user: User) {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
      type: user.type,
      createAt: user.createAt,
      contact: user.contact,
      address: user.address,
    }
  }

  static toDomain(raw: RawUser): User {
    return new User({
      name: raw.name,
      email: raw.email,
      password: raw.password,
      type: raw.type,
      createAt: raw.createAt,
      contact: raw.contact,
      address: raw.address,
    }, raw.id)
  }
}