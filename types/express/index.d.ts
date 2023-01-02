// import type { Profile } from './models'

declare namespace Express {
  interface Request {
    profile: any
  }
}
