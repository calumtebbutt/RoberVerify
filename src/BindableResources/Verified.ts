import * as t from 'io-ts'
import { BindableResource } from '../Types'
import { Either, left } from 'fp-ts/lib/Either'

function createBindableResource<T extends t.Any[], R> (resource: BindableResource<T, R>) {
  return resource
}

createBindableResource({
  name: 'Verified',

  args: [
    t.string,
    t.number
  ],

  run (user, text) {
    return left(Error())
  }
})
