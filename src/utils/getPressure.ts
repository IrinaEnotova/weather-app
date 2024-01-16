export default function getPressure(value: number) {
  const pressure = value * 0.75;
  return pressure.toFixed();
}
