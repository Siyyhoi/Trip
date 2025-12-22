export type District = {
  id: string
  center: { x: number; y: number }
}

export const districts: District[] = [
  { id: 'mueang-chiang-mai', center: { x: 50, y: 45 } },
  { id: 'doi-saket', center: { x: 58, y: 42 } },
  { id: 'mae-rim', center: { x: 55, y: 35 } },
  { id: 'hang-dong', center: { x: 45, y: 55 } }
]
