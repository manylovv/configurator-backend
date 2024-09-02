export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const getImageUrl = (imageName: string) => {
  return `${process.env.IMAGE_PREFIX_URL}${imageName}`;
};
