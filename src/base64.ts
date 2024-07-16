/** Take a File object and return it converted to a Base64 string. */
export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      let encoded = reader.result?.toString().replace(/^data:(.*,)?/, "")
      if (!encoded) return reject()
      if (encoded.length % 4 > 0) {
        encoded += "=".repeat(4 - (encoded.length % 4))
      }
      resolve(encoded)
    }
    reader.onerror = (error) => reject(error)
  })
}

/** Take a Base64 string and return it converted to a File object. */
export const base64ToFile = async (base64String: string, filename: string, mimeType: string) => {
  const res = await fetch(base64String)
  const buf = await res.arrayBuffer()
  return new File([buf], filename, { type: mimeType })
}
