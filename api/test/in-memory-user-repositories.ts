import { User } from "../src/app/entities/user/user";
import { UpdateUserRequest } from "@app/use-cases/user/update-user";
import { UserRepositories } from "../src/app/repositories/userRepositories";

export class InMemoryUserRepositories implements UserRepositories {

  public users: User[] = [];
  
  async findUserById(userId: string): Promise<User | null> {
    const user = this.users.find(
      (user) => user.id === userId
    );
    
    if(!user){
      return null
    }
    
    return user
  }

  async update(userId: string, request: UpdateUserRequest): Promise<void> {
    throw new Error("Method not implemented.");
  }
  
  async findByEmail(email: string): Promise<User | null> {
    const user = this.users.find(
      (user) => user.email === email
    );
    
    if(!user){
      return null
    }
    
    return user
  }
  
  async create(user: User): Promise<void> {
    this.users.push(user);
  }
}