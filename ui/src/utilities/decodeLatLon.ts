import type { LatLon } from "../types/LatLon.ts";

export const decodeLatLon = (latLonArr: LatLon[]) => {
  if (latLonArr.length === 0) return "";
  const latLon = latLonArr[latLonArr.length - 1];
  if (!latLon.lat && latLon.lat !== 0) return "";
  if (!latLon.lon && latLon.lon !== 0) return "";
  let str = "";
  if (latLon.lat < 0) {
    str += `${Math.abs(latLon.lat).toFixed(4)}S `;
  } else {
    str += `${latLon.lat.toFixed(4)}N `;
  }
  if (latLon.lon < 0) {
    str += `${Math.abs(latLon.lon).toFixed(4)}W`;
  } else {
    str += `${latLon.lon.toFixed(4)}E`;
  }
  return str;
};
