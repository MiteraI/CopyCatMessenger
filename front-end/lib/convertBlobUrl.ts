export default function convertBlobUrl(base64Avatar: string): string {
  const binaryAvatar = atob(base64Avatar);
  const byteArray = new Uint8Array(binaryAvatar.length);
  for (let i = 0; i < binaryAvatar.length; i++) {
    byteArray[i] = binaryAvatar.charCodeAt(i);
  }
  const avatarBlob = new Blob([byteArray], { type: "image/jpeg" });

  return URL.createObjectURL(avatarBlob);
}
