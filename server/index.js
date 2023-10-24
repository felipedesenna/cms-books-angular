import { JSONPreset } from 'lowdb/node'

export const db = await JSONPreset('db.json')
