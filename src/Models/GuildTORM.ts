import { Entity, PrimaryGeneratedColumn, BaseEntity, Column } from 'typeorm'

/* tslint:disable:variable-name */

@Entity()
export class Guild extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  snowflake!: string

  @Column()
  nickname_enabled!: boolean

  @Column()
  nickname_format!: string

  @Column({ nullable: true })
  nickname_group!: number

  @Column({ nullable: true })
  nickname_rank_guest!: string

  @Column({ nullable: true })
  nickname_rank_brackets!: string

  @Column({ nullable: true })
  verification_announce!: string

  @Column({ nullable: true })
  verification_channel!: string

  @Column({ nullable: true })
  verification_welcome!: string

  @Column({ nullable: true })
  verification_joindm!: string

  @Column()
  verification_minage!: string

  @Column('simple-array')
  bypass_roles!: string[]

  @Column('simple-array')
  bypass_nickname!: string[]

  @Column('simple-array')
  admin_updater!: string[]

  @Column('simple-array')
  admin_admin!: string[]

}
