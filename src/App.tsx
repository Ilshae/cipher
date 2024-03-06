import { ChangeEvent, useState } from "react"
import { Button, TextField, Box, Container, Paper } from "@mui/material"

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

  const handleEncodeChange = (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const { target } = event
    const { value } = target
    setEncodedField(value)
  }

  const handleDecodeChange = (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const { target } = event
    const { value } = target
    setDecodedField(value)
  }

  return (
    <Paper sx={{ height: "100vh" }}>
      <Container>
        <Box sx={{ display: "flex", paddingTop: "70px" }}>
          <Box sx={{ width: "50%", paddingRight: "20px" }}>
            <TextField
              label="Szyfrowanie"
              placeholder="Wpisz coś..."
              multiline
              fullWidth
              onChange={(event) => handleEncodeChange(event)}
            />

            <Button
              sx={{ marginTop: "20px" }}
              variant="contained"
              onClick={encode}
            >
              Szyfruj
            </Button>
          </Box>
          <Box sx={{ width: "50%", paddingLeft: "20px" }}>
            <TextField
              label="Deszyfrowanie"
              placeholder="Wpisz coś..."
              multiline
              fullWidth
              onChange={(event) => handleDecodeChange(event)}
            />
            <Button
              sx={{ marginTop: "20px" }}
              variant="contained"
              onClick={decode}
            >
              Deszyfruj
            </Button>
          </Box>
        </Box>
        <Box sx={{ width: "100%", paddingTop: "70px" }}>
          <TextField
            label="Rezultaty"
            multiline
            fullWidth
            value={resultField}
            disabled
          />
        </Box>
      </Container>
    </Paper>
  )
}

export default App
