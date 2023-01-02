import 'reflect-metadata'

import { DECIMAL } from 'sequelize'

import { Table, Column, Model, HasMany } from 'sequelize-typescript'

import { Contract } from './'

enum ProfileTypes {
  CLIENT = 'client',
  CONTRACTOR = 'contractor',
}

@Table
export class Profile extends Model {
  @Column({ allowNull: false })
  declare firstName: string

  @Column({ allowNull: false })
  declare lastName: string

  @Column({ allowNull: false })
  declare profession: string

  @Column({ type: DECIMAL(12, 2) })
  declare balance: number

  @Column
  declare type: ProfileTypes

  @HasMany(() => Contract, { as: 'Contractor', foreignKey: 'ContractorId' })
  @HasMany(() => Contract, { as: 'Client', foreignKey: 'ClientId' })
  declare contracts: Awaited<Contract>[]
}
