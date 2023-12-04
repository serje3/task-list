export function TimeSinceHours(val: string | number | Date): number {
  let time: number
  switch (typeof val) {
    case 'number':
      time = val;
    case 'string':
      time = +new Date(val);
      break;
    case 'object':
      if (val.constructor === Date) time = val.getTime();
      break;
    default:
      time = +new Date();
  }
  let seconds = (+new Date() - time) / 1000

  if (seconds == 0) {
    return 0
  }
  if (seconds < 0) {
    seconds = Math.abs(seconds);
  }

  const hourInSeconds = 3600;
  return Math.floor(seconds / hourInSeconds);
}
