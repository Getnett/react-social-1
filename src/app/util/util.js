export function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export function getFileExtesion(filename) {
  // eslint-disable-next-line no-bitwise
  return filename.slice(((filename.lastIndexOf('.') - 1) >>> 0) + 2)
}
export function structureComments(comments) {
  const commentStruture = Object.create(null)

  comments.forEach((comment) => {
    commentStruture[comment.id] = { ...comment, replys: [] }
  })

  const newComments = []
  comments.forEach((comment) => {
    if (comment.parentId) {
      commentStruture[comment.parentId].replys.push(commentStruture[comment.id])
    } else {
      newComments.push(commentStruture[comment.id])
    }
  })
  return newComments
}
