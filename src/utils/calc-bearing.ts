// Converts from degrees to radians.
function toRadians(degrees: number) {
  return (degrees * Math.PI) / 180;
}

// Converts from radians to degrees.
function toDegrees(radians: number) {
  return (radians * 180) / Math.PI;
}

export const calcBearing = ({
  start,
  destination,
}: {
  start: [number, number];
  destination: [number, number];
}) => {
  const startLat = toRadians(start[0]);
  const startLng = toRadians(start[1]);
  const destinationLat = toRadians(destination[0]);
  const destinationLng = toRadians(destination[1]);

  const y = Math.sin(destinationLng - startLng) * Math.cos(destinationLat);
  const x =
    Math.cos(startLat) * Math.sin(destinationLat) -
    Math.sin(startLat) *
      Math.cos(destinationLat) *
      Math.cos(destinationLng - startLng);
  const brng = toDegrees(Math.atan2(y, x));
  return (brng + 360) % 360;
};
