import { Op } from 'sequelize'
import { Table, Scopes, Column, Model, HasMany, ForeignKey, BelongsTo } from 'sequelize-typescript'

import { Job, Profile } from './'

enum ContractStatus {
  NEW = 'new',
  IN_PROGRESS = 'in_progress',
  TERMINATED = 'terminated',
}

@Table({
  timestamps: true,
})
@Scopes(() => ({
  pending: { where: { status: { [Op.not]: ContractStatus.TERMINATED } } },
  active: { where: { status: ContractStatus.IN_PROGRESS } },
}))
export class Contract extends Model {
  @Column declare terms: string
  @Column declare status: ContractStatus

  @HasMany(() => Job, { foreignKey: 'ContractId' })
  declare jobs: Awaited<Job[]>

  @ForeignKey(() => Profile)
  @Column
  declare ClientId: number

  @BelongsTo(() => Profile, { foreignKey: 'ClientId' })
  declare client: Awaited<Profile>

  @ForeignKey(() => Profile)
  @Column
  declare ContractorId: number

  @BelongsTo(() => Profile, { foreignKey: 'ContractorId' })
  declare contractor: Awaited<Profile>
}
