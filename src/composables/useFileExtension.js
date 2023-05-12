export default function fileExtension(fileName) {
  return fileName.split('.').at(-1)
}