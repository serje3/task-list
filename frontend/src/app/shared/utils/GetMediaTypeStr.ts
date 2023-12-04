export function getMediaTypeStr(mediaTypeNumber) {
  switch (mediaTypeNumber) {
    case 1:
      return 'Photo'
    case 2:
      return 'Video'
    case 3:
      return 'IGTV'
    case 4:
      return 'Reels'
    case 5:
      return 'Album'
  }
}
