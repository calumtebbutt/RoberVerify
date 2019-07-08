import { Typegoose, prop, arrayProp } from 'typegoose'

/* tslint:disable:variable-name */

class GuildConfig {
  @prop()
  nickname_enabled?: boolean

  @prop()
  nickname_format?: string

  @prop()
  nickname_group?: number

  @prop()
  nickname_rank_guest?: string

  @prop()
  nickname_rank_brackets?: string

  @prop()
  verification_log?: string

  @prop()
  verification_channel?: string

  @prop()
  verification_welcome?: string

  @prop()
  verification_joindm?: boolean

  @arrayProp({ items: String, default: [] })
  bypass_roles!: string[]

  @arrayProp({ items: String, default: [] })
  bypass_nickname!: string[]

  @arrayProp({ items: String, default: [] })
  admin_updater!: string[]

  @arrayProp({ items: String, default: [] })
  ignore_channels!: string[]
}

class Guild extends Typegoose {
  @prop({
    required: true,
    index: true,
    unique: true
  })
  id!: string

  @prop({ default: {} })
  config!: GuildConfig
}

export default Guild
