import { Either } from 'fp-ts/lib/Either'
import { Option } from 'fp-ts/lib/Option'
import * as t from 'io-ts'

type Types<T extends t.Any[]> = { [P in keyof T]: T[P] extends t.Any ? t.TypeOf<T[P]> : never }

type BindableResourceTypes<A = any, B = any, C = any, D = any> = [A, B, C, D]

type Tuple<P1, P2, P3> = [P1, P2, P3]

type AnyN = t.Any | undefined

type 

export interface BindableResource<
  R,
  P1 extends AnyN = undefined,
  P2 extends AnyN = undefined,
  P3 extends AnyN = undefined
> {
  name: string,

  args: P1 extends undefined ? [] : P2 extends undefined ? [P1] : P3 extends undefined ? [P1, P2] : [P1, P2, P3],

  run (arg1: t.TypeOf<P1>, arg2: t.TypeOf<P2>, arg3: t.TypeOf<P3>): BindableResourceResolution<R>
}

export interface DataSource {

}

export interface VerificationStep {
  priority: number
}

export type Named = {
  name: string
}

export type BindableResourceResolution<T> = Either<Error, Option<T>>
