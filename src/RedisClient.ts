import * as redis from 'redis'
import { promisify } from 'util'

class ScopedRedisClient<T> {
  constructor (public client: RedisClient, public scope: string) {

  }

  private prefix (key: string): string {
    return `${this.scope}_${key}`
  }

  public get<K extends (keyof T & string)> (key: K, defaultValue?: T[K]): Promise<T[K]> {
    return this.client.get(this.prefix(key), defaultValue)
  }

  public set<K extends (keyof T & string)> (key: K, value?: T[K]): Promise<T[K] | undefined> {
    return this.client.set(this.prefix(key), value)
  }
}

export default class RedisClient {
  public client: redis.RedisClient
  private getAsync: (key: string) => Promise<any>
  private setAsync: (key: string, value: any) => Promise<any>

  constructor (url: string) {
    this.client = redis.createClient(url)

    this.getAsync = promisify(this.client.get).bind(this)
    this.setAsync = promisify(this.client.set).bind(this)
  }

  public get<T> (key: string, defaultValue?: T): Promise<T> {
    return this.getAsync(key).then((value => value === undefined ? defaultValue : value))
  }

  public set<T> (key: string, value: T): Promise<T> {
    return this.setAsync(key, value)
  }

  public scope<T> (scope: string): ScopedRedisClient<T> {
    return new ScopedRedisClient<T>(this, scope)
  }
}
