export enum Mode {
  EDIT,
  VIEW
}

export type Note = {
  id: number
  mode: Mode
  content?: string
}
