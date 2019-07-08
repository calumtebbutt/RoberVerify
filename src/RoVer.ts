import { ShardingManager } from 'discord.js'
import * as path from 'path'

const SHARD_SPAWN_DELAY = 5000
const SHARD_WAIT_FOR_READY = false
const SHARD_AMOUNT = 'auto'

export default class RoVer {
  private static shardingManager: ShardingManager

  static async initialize (): Promise<RoVer> {
    this.shardingManager = new ShardingManager(
      path.join(__dirname, 'Shard.js'),
      {
        token: process.env.TOKEN!
      }
    )

    this.shardingManager.on('shardCreate', shard => (
      console.log(
        `Launching shard ${shard.id + 1}/${this.shardingManager.totalShards}`
      )
    ))

    await this.shardingManager.spawn(
      SHARD_AMOUNT,
      SHARD_SPAWN_DELAY
    )

    return this
  }
}
