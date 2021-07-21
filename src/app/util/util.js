export function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export function getFileExtesion(filename) {
  return filename.slice(((filename.lastIndexOf('.') - 1) >>> 0) + 2)
}
