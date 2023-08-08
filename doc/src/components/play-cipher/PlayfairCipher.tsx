import React, { FC, useState, useCallback } from "react";
import {
  TableContainer,
  Table,
  TableRow,
  TableCell,
  TableBody,
  Box,
  Divider,
  Alert,
  colors,
} from "@mui/material";
import { DocumentWrapper } from "../document-wrapper";
import { CommonCipherUI } from "../common-cipher-ui";
import { PlayfairCipher } from "ciphers";

const playfairCipher = new PlayfairCipher();
const redCell = {
  color: colors.red[500],
};

export const PlayfairCipherUI: FC = () => {
  const [cipherTexts, setCipherTexts] = useState<string>("");
  const [plainTexts, setPlainTexts] = useState<string>("");

  const handleEncryption = useCallback((plainTexts: string, key: string) => {
    setCipherTexts(playfairCipher.encrypt(plainTexts, key));
  }, []);

  const handleDecryption = useCallback((cipherTexts: string, key: string) => {
    setPlainTexts(playfairCipher.decrypt(cipherTexts, key));
  }, []);

  return (
    <DocumentWrapper
      title="Playfair Cipher"
      description={
        <Box marginBottom="1rem">
          <Box>
            <Box fontWeight="bold" marginBottom="1rem">
              Encryption
            </Box>
            the following are the steps to generate cipher text base paly
            fair.
            <Box marginTop="1rem">
              1. Split the message into pairs, if pair contains the same letter,
              for example: ["L", "L"], then we need to append X to the pair, so
              it will become ['L', 'X'], the remaining 'L' should construct new
              pair with the next letter, if last pair does not contain two
              letters, then we need to add 'X' to the array. for example ['A']
              will become ['A', 'X']. base on the above rules. "HELLOT" can be
              divided into the following pairs ['H', 'E'], ['L', 'X'], ['L',
              'O'],['T', 'X'].
              <Alert security="warning" sx={{ marginTop: "1rem" }}>
                note: if the message contains 'J', then 'J' will be converted
                into 'I'
              </Alert>
            </Box>
            <Box marginTop="1rem">
              2. Delete duplicate letters from the key, for example "HHLLCC"
              should become "HLC".
            </Box>
            <Box marginTop="1rem">
              3. Should construct 5 x 5 table base on the key, I/J should occupy
              the same cell, and all the letters inside the key, should be filled
              into the 5 x 5 table first, then fill the rest letters into
              the table. for example, if the key is "HLC", then the 5 x 5 table
              should be like below.
              <TableContainer>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell sx={redCell}>H</TableCell>
                      <TableCell sx={redCell}>L</TableCell>
                      <TableCell sx={redCell}>C</TableCell>
                      <TableCell>A</TableCell>
                      <TableCell>B</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>D</TableCell>
                      <TableCell>E</TableCell>
                      <TableCell>F</TableCell>
                      <TableCell>G</TableCell>
                      <TableCell>I/J</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>K</TableCell>
                      <TableCell>M</TableCell>
                      <TableCell>N</TableCell>
                      <TableCell>O</TableCell>
                      <TableCell>P</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Q</TableCell>
                      <TableCell>R</TableCell>
                      <TableCell>S</TableCell>
                      <TableCell>T</TableCell>
                      <TableCell>U</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>V</TableCell>
                      <TableCell>W</TableCell>
                      <TableCell>X</TableCell>
                      <TableCell>Y</TableCell>
                      <TableCell>Z</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
            <Box marginTop="1rem">
              4. If the plaintext pair is on the same row, then the cipher text
              should be letter right to the original letter, for example ['D',
              'F'] is on the same row, so the cipher pair should be ['E', 'G'].
              if the original letter is the last letter of the row, then the
              cipher letter should be the first element of the row. for example
              cipher pair for ['N', 'P'] should be ['O', 'K'].
            </Box>
            <Box marginTop="1rem">
              5. If the plaintext pair is on the same column, then the cipher
              text should be letter below to the original letter, for example
              ['D', 'Q'] is on the same column, so the cipher pair should be
              ['K', 'V']. if the original letter is the last letter of the
              column, then the cipher letter should be the first element of the
              column. for example cipher pair for ['D', 'V'] should be ['K',
              'H'].
            </Box>
            <Box marginTop="1rem">
              6. If the plaintext pair is on neither the same row nor the same
              column, then the cipher letter should be on the same row of the
              original letter, and should be the same column of another letter
              in the pair. for example cipher letters for ['D', 'M'] should be
              should be ['E', 'K'].
            </Box>
          </Box>

          <Box>
            <Box fontWeight="bold" marginTop="1rem">
              Decryption
            </Box>
            <Box marginTop="1rem">
              To decrypt it, we need to do the opposite operations:
            </Box>
            <Box marginTop="1rem">1. Put the cipher text into pairs.</Box>
            <Box marginTop="1rem">
              2. If the pair letters are on the same row, then the original
              letter should be on the left of the cipher letter. if the cipher
              letter is the first letter of the row, then the original letter
              should be the last letter of the row.
            </Box>
            <Box marginTop="1rem">
              3. If the pair letters are on the same column, then the original
              letter should be on the top of the cipher letter. if the cipher
              letter is the first letter of the column, then the original letter
              should be the last letter of the column.
            </Box>
            <Box marginTop="1rem">
              4. If the cipher text pair is on neither the same row nor the same
              column, then the plain text letter should be on the same row of
              the cipher letter, and should be the same column of another cipher
              letter in the pair. for example plain letters for ['E', 'K']
              should map to ['D', 'M'].
            </Box>
          </Box>
        </Box>
      }
    >
      <Divider sx={{ margin: "1rem 0" }} />
      <CommonCipherUI
        onButtonClick={handleEncryption}
        result={cipherTexts}
        withKey
      />
      <Divider sx={{ margin: "1rem 0" }} />
      <CommonCipherUI
        onButtonClick={handleDecryption}
        result={plainTexts}
        withKey
        isEncryption={false}
      />
    </DocumentWrapper>
  );
};
