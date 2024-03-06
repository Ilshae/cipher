import styled, { createGlobalStyle } from "styled-components"
import { useState } from "react"

const polishAlphabetString =
  "aąbcćdeęfghijklłmnńoópqrsśtuvwxyzźżAĄBCĆDEĘFGHIJKLŁMNŃOÓPQRSŚTUVWXYZŹŻ"

const polishAlphabetArray = polishAlphabetString.split("")

const shift = 1

const App = () => {
  const [encodedField, setEncodedField] = useState("")
  const [decodedField, setDecodedField] = useState("")
  const [resultField, setResultField] = useState("")

  const encode = () => {
    const shiftedChars = encodedField
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
    setResultField(shiftedChars)
  }
  const decode = () => {
    const shiftedChars = decodedField
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
    setResultField(shiftedChars)
  }

  const handleEncodeChange = (event) => {
    const { target } = event
    const { value } = target
    setEncodedField(value)
  }

  const handleDecodeChange = (event) => {
    const { target } = event
    const { value } = target
    setDecodedField(value)
  }

  return (
    <GlobalContainer>
      <GlobalStyle />
      <Container>
        <Card>
          <h2>Szyfrowanie</h2>
          <textarea
            id="cipher"
            rows={10}
            cols={50}
            onChange={(event) => handleEncodeChange(event)}
          ></textarea>
          <button onClick={encode}>Szyfruj</button>
        </Card>
        <Card>
          <h2>Deszyfrowanie</h2>
          <textarea
            id="decipher"
            rows={10}
            cols={50}
            onChange={(event) => handleDecodeChange(event)}
          ></textarea>
          <button onClick={decode}>Deszyfruj</button>
        </Card>
      </Container>
      <Card>
        <h2>Wynik</h2>
        <textarea rows={10} cols={50} value={resultField} disabled></textarea>
      </Card>
    </GlobalContainer>
  )
}

const GlobalStyle = createGlobalStyle`
  body {
    font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
    line-height: 1.5;
    font-weight: 400;

    color-scheme: light dark;
    color: rgba(255, 255, 255, 0.87);
    background-color: #242424;

    font-synthesis: none;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
`

const GlobalContainer = styled.div`
  margin: 0;
  display: flex;
  min-width: 320px;
  flex-direction: column;
  padding: 16px;

  h1 {
    font-size: 3.2em;
    line-height: 1.1;
  }
`

const Container = styled.div`
  display: flex;
  justify-content: space-between;
`

const Card = styled.div`
  padding: 0 15px;
  display: flex;
  flex-direction: column;
`

export default App
