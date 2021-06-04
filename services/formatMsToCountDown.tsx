export default function formatMsToCountDown(ms: number): string {
  let remainderMS = ms;
  const hour = Math.floor(remainderMS / 3600000);
  remainderMS = remainderMS - hour * 3600000;
  const minute = Math.floor(remainderMS / 60000);
  remainderMS = remainderMS - minute * 60000;
  const seconds = Math.floor(remainderMS / 1000);
  const hh = ("00" + hour).slice(-2);
  const mm = ("00" + minute).slice(-2);
  const ss = ("00" + seconds).slice(-2);
  return `${hh}:${mm}:${ss}`;
}
