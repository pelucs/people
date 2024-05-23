export class UserIncorrectPasswordError extends Error {
  constructor() {
    super("Senha incorreta");
    this.name = "UserIncorrectPasswordError";
  }
}