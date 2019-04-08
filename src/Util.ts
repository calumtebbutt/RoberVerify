export function splitEnv (text?: string): string[] | undefined {
  return typeof text === 'string' ? text.split(',') : undefined
}

export function env (name: string): string {
  const value = process.env[name]

  if (value) {
    return value
  } else {
    throw new Error(`Required environment variable ${name} is unset.`)
  }
}
