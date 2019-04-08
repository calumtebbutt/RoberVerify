import { SettingProvider, CommandoClient } from 'discord.js-commando'
import { Guild, GuildResolvable } from 'discord.js'
import RedisClient from './RedisClient'
import { env } from './Util'

interface GuildSettings {
  prefix?: string
}

const guildId = (guild: GuildResolvable) => guild instanceof Guild ? guild.id : guild

export default class RoVerSettingProvider extends SettingProvider {
  private bot?: CommandoClient
  private redis?: RedisClient

  async init (client: CommandoClient): Promise<void> {
    this.bot = client

    this.redis = new RedisClient(env('REDIS_SETTINGS'))
  }

  async get<K extends keyof GuildSettings> (guild: GuildResolvable, key: K, defaultValue?: GuildSettings[K]): Promise<GuildSettings[K]> {
    return this.redis!.scope<GuildSettings>(guildId(guild)).get(key, defaultValue)
  }

  async remove (guild: GuildResolvable, key: keyof GuildSettings): Promise<any> {
    return this.set(guild, key, undefined)
  }

  async set<K extends keyof GuildSettings> (guild: GuildResolvable, key: K, value: GuildSettings[K]): Promise<GuildSettings[K]> {
    return this.redis!.scope<GuildSettings>(guildId(guild)).set(key, value)
  }
}
