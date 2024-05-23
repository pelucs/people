export class UserAlreadyExistsError extends Error {
  constructor() {
    super("Usuário já cadastrado com esse email.");
    this.name = "UserAlreadyExistsError";
  }
}