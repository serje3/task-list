export const participantTypes: ParticipantType[] = [
  {id: 1, name: "HASHTAG_DETAIL.PARTICIPANT_TYPES.NO", value: 'No'},
  {id: 2, name: "HASHTAG_DETAIL.PARTICIPANT_TYPES.YES", value: 'Yes'},
  {id: 3, name: "HASHTAG_DETAIL.PARTICIPANT_TYPES.VIP", value: 'Vip'},
]

export type ParticipantType = {
  id: number,
  name: string,
  value: string
}
