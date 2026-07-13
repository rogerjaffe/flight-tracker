/**
 * Calculates the bearing in degrees between two geographic points.
 * @param {number} lat1 Latitude of the start point in decimal degrees.
 * @param {number} lon1 Longitude of the start point in decimal degrees.
 * @param {number} lat2 Latitude of the end point in decimal degrees.
 * @param {number} lon2 Longitude of the end point in decimal degrees.
 * @returns {number} The bearing in degrees, ranging from 0 to 360 (clockwise from North).
 */
export const calculateBearing = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
) => {
  // Convert degrees to radians
  const toRadians = (deg: number) => (deg * Math.PI) / 180;
  const toDegrees = (rad: number) => (rad * 180) / Math.PI;

  const phi1 = toRadians(lat1);
  const phi2 = toRadians(lat2);
  const deltaLon = toRadians(lon2 - lon1);

  // Calculate components for atan2
  const y = Math.sin(deltaLon) * Math.cos(phi2);
  const x =
    Math.cos(phi1) * Math.sin(phi2) -
    Math.sin(phi1) * Math.cos(phi2) * Math.cos(deltaLon);

  // Use Math.atan2 to get the bearing in radians, then convert to degrees
  let bearing = Math.atan2(y, x);
  bearing = toDegrees(bearing);

  // Normalize the bearing to a 0-360 degree range (clockwise from North)
  return (bearing + 360) % 360;
};
