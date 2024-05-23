import { GetUser } from "@app/use-cases/user/get-user";
import { LoginUser } from "../../../../app/use-cases/user/login-user";
import { CreateUser } from "../../../../app/use-cases/user/create-user";
import { UpdateUser } from "@app/use-cases/user/update-user";
import { UserControllers } from "./user-controllers";
import { PrismaUserRepositories } from "@infra/database/prisma/prisma-user-repositories";

const repository = new PrismaUserRepositories()

const getUser =  new GetUser(repository);
const loginUser =  new LoginUser(repository);
const updateUser =  new UpdateUser(repository);
const createUser =  new CreateUser(repository);

const userController = new UserControllers(createUser, loginUser, getUser, updateUser);

export { 
  userController, 
  createUser, 
  loginUser,
  getUser,
  updateUser,
}