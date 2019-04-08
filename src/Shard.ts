import { WSEventType } from 'discord.js'
import { Client } from 'discord.js-commando'
import { splitEnv, env } from './Util'
import SettingProvider from './SettingProvider'
import * as path from 'path'

const DISABLED_EVENTS: WSEventType[] = [
  'TYPING_START',
  'VOICE_STATE_UPDATE',
  'PRESENCE_UPDATE',
  'MESSAGE_DELETE',
  'MESSAGE_UPDATE'
]

class Shard {
  bot: Client
  shardId: number

  constructor () {
    this.shardId = Number(env('SHARDS'))

    this.bot = new Client({
      shards: this.shardId,
      shardCount: Number(env('TOTAL_SHARD_COUNT')),
      disabledEvents: DISABLED_EVENTS,
      owner: splitEnv(process.env.OWNER_ID),
      commandPrefix: process.env.COMMAND_PREFIX || '!'
    })

    this.bot.setProvider(new SettingProvider())

    this.bot.on('ready', this.onReady)
    this.bot.on('message', m => console.log(m.cleanContent))

    this.bot.registry
      .registerDefaultTypes()
      .registerDefaultGroups()
      .registerDefaultCommands()
      .registerGroups([{
        id: 'verify'
      }])
      .registerCommandsIn(path.join(__dirname, 'Commands'))

    this.bot.login(env('DISCORD_TOKEN'))
  }

  private onReady = () => {
    console.log(`Shard ${this.shardId} is ready, serving ${this.bot.guilds.size} guilds.`)
  }

  public static bootstrap (): Shard {
    return new Shard()
  }
}

export default Shard.bootstrap()
