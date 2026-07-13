export const calculateDirection = (bearing: number) => {
  const directions = [
    { s: 0, e: 11.25, d: "N" },
    { s: 11.25, e: 33.75, d: "NNE" },
    { s: 33.75, e: 56.25, d: "NE" },
    { s: 56.25, e: 78.75, d: "ENE" },
    { s: 78.75, e: 101.25, d: "E" },
    { s: 101.25, e: 123.75, d: "ESE" },
    { s: 123.75, e: 146.25, d: "SE" },
    { s: 146.25, e: 168.75, d: "SSE" },
    { s: 168.75, e: 191.25, d: "S" },
    { s: 191.25, e: 213.75, d: "SSW" },
    { s: 213.75, e: 236.25, d: "SW" },
    { s: 236.25, e: 258.75, d: "WSW" },
    { s: 258.75, e: 281.25, d: "W" },
    { s: 281.25, e: 303.75, d: "WNW" },
    { s: 303.75, e: 326.25, d: "NW" },
    { s: 326.25, e: 348.75, d: "NNW" },
    { s: 348.75, e: 360, d: "N" },
  ];
  const rec = directions.find(({ s, e }) => s <= bearing && bearing < e);
  return rec ? rec.d : "";
};
