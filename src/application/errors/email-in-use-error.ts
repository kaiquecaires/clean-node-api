export class EmailInUseError extends Error {
  constructor () {
    super('The receive email is already in use')
    this.name = 'EmailInUseError'
  }
}
