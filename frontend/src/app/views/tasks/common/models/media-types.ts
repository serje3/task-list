export const mediaTypes: MediaType[] = [
  {id: 1, name: 'Photo'},
  {id: 2, name: 'Video'},
  {id: 3, name: 'IGTV'},
  {id: 4, name: 'Reels'},
  {id: 5, name: 'Album'},
]

export type MediaType = {
  id: number
  name: string
}
