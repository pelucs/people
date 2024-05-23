export class CauseNotFoundError extends Error {
  constructor() {
    super("Causa não encontrada")
  }
}