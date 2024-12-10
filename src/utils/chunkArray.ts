// utils/chunkArray.ts
export const chunkArray = <T>(array: T[], size: number): T[][] => {
  return Array.from({ length: Math.ceil(array.length / size) }, (_, idx) => array.slice(idx * size, idx * size + size));
};
