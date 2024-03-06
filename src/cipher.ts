export const encode = (text: string, shift: number): string => {
  return text
    .split("")
    .map((char) => {
      if (polishAlphabetArray.includes(char)) {
        const isUpperCase = char === char.toUpperCase()
        const alphabet = isUpperCase
          ? polishAlphabetString.toUpperCase()
          : polishAlphabetString.toLowerCase()
        const index = alphabet.indexOf(char)
        const encryptedIndex = (index + shift) % alphabet.length
        return alphabet[encryptedIndex]
      } else {
        return char
      }
    })
    .join("")
}

export const decode = (text: string, shift: number): string => {
  return text
    .split("")
    .map((char) => {
      if (polishAlphabetArray.includes(char)) {
        const isUpperCase = char === char.toUpperCase()
        const alphabet = isUpperCase
          ? polishAlphabetString.toUpperCase()
          : polishAlphabetString.toLowerCase()
        const index = alphabet.indexOf(char)
        let decryptedIndex = (index - shift) % alphabet.length
        // To handle negative shifts, add the alphabet length to the decrypted index
        if (decryptedIndex < 0) {
          decryptedIndex += alphabet.length
        }
        return alphabet[decryptedIndex]
      } else {
        return char
      }
    })
    .join("")
}

const polishAlphabetString =
  "aąbcćdeęfghijklłmnńoópqrsśtuvwxyzźżAĄBCĆDEĘFGHIJKLŁMNŃOÓPQRSŚTUVWXYZŹŻ"

const polishAlphabetArray = polishAlphabetString.split("")
