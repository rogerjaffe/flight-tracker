/**
 * Represents an RGB color value
 */
export interface RGB {
  r: number;
  g: number;
  b: number;
}

export function getAltitudeColor(altitude: number): RGB {
  const alt = Math.max(0, Math.min(altitude, 40000));


  // Optimized for visibility on both #FFFFFF and #000000
  const anchors: { alt: number; color: RGB }[] = [
    { alt: 0, color: { r: 230, g: 30, b: 0 } }, // Vivid Red-Orange
    { alt: 4000, color: { r: 210, g: 170, b: 0 } }, // Rich Gold
    { alt: 10000, color: { r: 0, g: 180, b: 0 } }, // Bright Emerald
    { alt: 20000, color: { r: 0, g: 190, b: 230 } }, // Electric Cyan
    { alt: 30000, color: { r: 70, g: 90, b: 255 } }, // Royal Blue
    { alt: 40000, color: { r: 220, g: 0, b: 220 } }, // Hot Magenta
  ];

  for (let i = 0; i < anchors.length - 1; i++) {
    const lower = anchors[i];
    const upper = anchors[i + 1];

    if (alt >= lower.alt && alt <= upper.alt) {
      // Calculate the interpolation factor (t) between 0 and 1
      const t = (alt - lower.alt) / (upper.alt - lower.alt);

      // Linearly interpolate each RGB component (lerp)
      return {
        r: Math.round(lower.color.r + (upper.color.r - lower.color.r) * t),
        g: Math.round(lower.color.g + (upper.color.g - lower.color.g) * t),
        b: Math.round(lower.color.b + (upper.color.b - lower.color.b) * t),
      };
    }
  }

  // Default fallback (should not be reached due to clamping)
  return anchors[anchors.length - 1].color;
}

// /**
//  * Represents an RGB color value
//  */
// export interface RGB {
//   r: number;
//   g: number;
//   b: number;
// }
//
// /**
//  * Calculates the RGB color for a given altitude based on the
//  * provided color gradient scale (0 to 40,000+ feet).
//  */
// export function getAltitudeColor(altitude: number): RGB {
//   // Clamp the altitude between 0 and 40,000 feet
//   const alt = Math.max(0, Math.min(altitude, 40000));
//
//   // Define the key anchor points from your image (altitude: {r, g, b})
//   const anchors: { alt: number; color: RGB }[] = [
//     { alt: 0, color: { r: 200, g: 40, b: 0 } }, // Burnt Orange (Darker)
//     { alt: 4000, color: { r: 160, g: 120, b: 0 } }, // Dark Mustard/Gold (High contrast)
//     { alt: 10000, color: { r: 0, g: 130, b: 0 } }, // Deep Forest Green
//     { alt: 20000, color: { r: 0, g: 110, b: 150 } }, // Deep Teal/Cyan
//     { alt: 30000, color: { r: 0, g: 0, b: 180 } }, // Navy Blue
//     { alt: 40000, color: { r: 150, g: 0, b: 150 } }, // Deep Magenta/Plum
//   ];
//
//   // Find the two anchors the current altitude falls between
//   for (let i = 0; i < anchors.length - 1; i++) {
//     const lower = anchors[i];
//     const upper = anchors[i + 1];
//
//     if (alt >= lower.alt && alt <= upper.alt) {
//       // Calculate the interpolation factor (t) between 0 and 1
//       const t = (alt - lower.alt) / (upper.alt - lower.alt);
//
//       // Linearly interpolate each RGB component (lerp)
//       return {
//         r: Math.round(lower.color.r + (upper.color.r - lower.color.r) * t),
//         g: Math.round(lower.color.g + (upper.color.g - lower.color.g) * t),
//         b: Math.round(lower.color.b + (upper.color.b - lower.color.b) * t),
//       };
//     }
//   }
//
//   // Default fallback (should not be reached due to clamping)
//   return anchors[anchors.length - 1].color;
// }
//
// // Example usage:
// const colorAt15k = getAltitudeColor(15000);
// console.log(
//   `RGB at 15,000ft: rgb(${colorAt15k.r}, ${colorAt15k.g}, ${colorAt15k.b})`,
// );
