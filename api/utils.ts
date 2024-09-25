export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const getImageUrl = (imageName: string) => {
  return `${process.env.IMAGE_PREFIX_URL}${imageName}`;
};

async function generateSHA256Hash(input: string): Promise<string> {
  // Encode the input string as UTF-8
  const encoder = new TextEncoder();
  const data = encoder.encode(input);

  // Compute the SHA-256 hash
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);

  // Convert the hash buffer to a hex string
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('');

  return hashHex;
}

type GetImagesHashArgs = {
  color: string;
  wheel: string;
  brake: string;
  seat: string;
  trim: string;
};

export const getImagesStateString = ({
  color,
  wheel,
  brake,
  seat,
  trim,
}: GetImagesHashArgs) => {
  return `color:${color},wheel:${wheel},brake:${brake},seat:${seat},trim:${trim}`;
};
