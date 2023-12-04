export function timeUntil (endTime) {
  const hour = 60 * 60 * 1000;
  const total = Date.parse(endTime) + hour - (new Date()).getTime();
  const seconds = Math.floor( (total/1000) % 60 );
  const minutes = Math.floor( (total/1000/60) % 60 );
  const hours = Math.floor( (total/(1000*60*60)) % 24 );
  const days = Math.floor( total/(1000*60*60*24) );

  return {
    'days': days,
    'hours': hours,
    'minutes': minutes,
    'seconds': seconds
  };
}
