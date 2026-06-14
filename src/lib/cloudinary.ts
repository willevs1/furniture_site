export const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
export const CLOUDINARY_UPLOAD_PRESET = process.env.CLOUDINARY_UPLOAD_PRESET;

// Returns the unsigned upload URL for the browser widget
export function getCloudinaryUnsignedUrl() {
  if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_UPLOAD_PRESET) return null;
  return `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/upload`;
}

// Server-side helper to create signed upload params could be added later
