export function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export function getFileExtesion(filename) {
  // eslint-disable-next-line no-bitwise
  return filename.slice(((filename.lastIndexOf('.') - 1) >>> 0) + 2)
}
