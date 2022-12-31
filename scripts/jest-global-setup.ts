import { seed } from './seed-db'

export default async () => {
  console.log('\nseed db before tests')
  await seed()
}
