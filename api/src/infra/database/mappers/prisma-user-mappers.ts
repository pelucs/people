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
    }
  }

  static toDomain(raw: RawUser): User {
    return new User({
      name: raw.name,
      email: raw.email,
      password: raw.password,
      type: raw.type,
    }, raw.id)
  }
}