export default function(word: string) {
  return word.split('').map((w, index) => index === 0 ? w.toUpperCase() : w).join('')
}
