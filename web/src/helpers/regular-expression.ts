export function textFormated(value: string): string {

  const valueF = value
  .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  .replace(/[\s,]+/g, '')
  .toLowerCase()

  return valueF;
}