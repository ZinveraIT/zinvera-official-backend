/* eslint-disable @typescript-eslint/no-explicit-any */
declare module 'email-verifier' {
  export default class Verifier {
    constructor(apiKey: string)
    verify(email: string, callback: (err: any, data: any) => void): void
  }
}
