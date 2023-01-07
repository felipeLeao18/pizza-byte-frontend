export class AuthTokenError extends Error {
  constructor () {
    super('Unauthorized')
  }
}
