import 'reflect-metadata'

import { Op } from 'sequelize'

import { Table, Scopes, Column, Model, ForeignKey, BelongsTo } from 'sequelize-typescript'

import { Contract } from './'

@Table({
  timestamps: true,
})
@Scopes(() => ({
  unpaid: { where: { paid: { [Op.or]: [false, null] } } },
  paid: { where: { paid: true } },
}))
export class Job extends Model {
  @Column declare description: string
  @Column declare price: number
  @Column declare paid: boolean
  @Column declare paymentDate: Date

  @ForeignKey(() => Contract)
  @Column
  declare ContractId: number

  @BelongsTo(() => Contract, { foreignKey: 'ContractId' })
  declare contract: Awaited<Contract>
}
