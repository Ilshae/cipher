import { ChangeEvent, useState } from "react"
import { Button, TextField, Box, Container, Paper } from "@mui/material"
import { decode, encode } from "./cipher.ts"

const SENTENCE_END_REGEX = /[^.!?]+[.!?]+/g

const App = () => {
  const [encodedField, setEncodedField] = useState("")
  const [decodedField, setDecodedField] = useState("")
  const [resultField, setResultField] = useState("")

  // cipher oscilates between keys 10-5
  const handleEncode = () => {
    let shift = 11
    const sentences = encodedField.match(SENTENCE_END_REGEX)
    const results: string[] = []

    if (sentences) {
      sentences?.forEach((sentence) => {
        shift--
        if (shift === 4) shift = 10
        results.push(encode(sentence, shift))
      })
    } else {
      shift--
      if (shift === 4) shift = 10
      results.push(encode(encodedField, shift))
    }

    setResultField(results.join(""))
  }

  const handleDecode = () => {
    let shift = 11
    const sentences = decodedField.match(SENTENCE_END_REGEX)
    const results: string[] = []

    if (sentences) {
      sentences?.forEach((sentence) => {
        shift--
        if (shift === 4) shift = 10
        results.push(decode(sentence, shift))
      })
    } else {
      shift--
      if (shift === 4) shift = 10
      results.push(decode(decodedField, shift))
    }

    setResultField(results.join(""))
  }

  const handleResults = async () => {
    const copyText = document.getElementById("results")!.innerHTML

    try {
      await navigator.clipboard.writeText(copyText)
    } catch (err) {
      console.error("Failed to copy: ", err)
    }
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
    <Paper sx={{ minHeight: "100vh", paddingBottom: "40px" }}>
      <Container>
        <Box sx={{ paddingTop: "40px" }}>
          <h1>Pomoc do dziennika Calypso :)</h1>
          <Box sx={{ display: "flex", paddingTop: "10px" }}>
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
                onClick={handleEncode}
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
                onClick={handleDecode}
              >
                Deszyfruj
              </Button>
            </Box>
          </Box>
        </Box>
        <Box sx={{ width: "100%", paddingTop: "70px" }}>
          <TextField
            id={"results"}
            label="Rezultaty"
            multiline
            fullWidth
            value={resultField}
            disabled
          />
          <Button
            sx={{ marginTop: "20px" }}
            variant="contained"
            onClick={handleResults}
          >
            Kopiuj rezultaty
          </Button>
        </Box>
      </Container>
    </Paper>
  )
}

export default App
