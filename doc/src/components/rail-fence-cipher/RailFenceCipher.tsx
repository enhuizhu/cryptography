import React, { FC, useState, useCallback } from "react";
import {
  Box,
  Divider,
  Table,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import { DocumentWrapper } from "../document-wrapper";
import { CommonCipherUI } from "../common-cipher-ui";
import { RailFenceCipher } from "ciphers";

const railFenceCipher = new RailFenceCipher(2);

export const RailFenceCipherUI: FC = () => {
  const [cipherTexts, setCipherTexts] = useState<string>("");
  const [plainTexts, setPlainTexts] = useState<string>("");

  const handleEncryption = useCallback((plainTexts: string, key: string) => {
    railFenceCipher.setDepth(Number(key));
    setCipherTexts(railFenceCipher.encrypt(plainTexts));
  }, []);

  const handleDecryption = useCallback((cipherTexts: string, key: string) => {
    railFenceCipher.setDepth(Number(key));
    setPlainTexts(railFenceCipher.decrypt(cipherTexts));
  }, []);

  return (
    <DocumentWrapper
      title="Rail Fence Cipher"
      description={
        <Box marginBottom="1rem">
          <Box fontWeight="bold" margin="1rem 0">Encryption</Box>
          <Box>
            Rail Fence cipher is also called zig-zag cipher. Here are the steps for the encryption:
            <Box marginTop='1rem'>
              1. Base on the value of depth 'n'. we can generate array with 'n' rows, each row is another
              array.
            </Box>
            <Box marginTop='1rem'>
              2. Put the letters into 'n' rows grid from top to bottom, if it reaches the last row of the grid,
              then put letters into the rows from bottom to top, it it reaches to the first row of the grid, and
              then put the letters into the rows from top to bottom again.
            </Box>
            <Box marginTop='1rem'>
              3. Once all the letters are filled into the rows, then read the letters from left to right, top to bottom.
            </Box>
            <Box marginTop='1rem' fontWeight='bold'>
              Example:
            </Box>
            <Box marginTop='1rem'>
              Let say plain text is "hello", the value of depth is 2, then we can put "hello" into the following table
              <TableContainer>
                <Table>
                    <TableRow>
                        <TableCell>H</TableCell>
                        <TableCell></TableCell>
                        <TableCell>L</TableCell>
                        <TableCell></TableCell>
                        <TableCell>O</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell></TableCell>
                        <TableCell>E</TableCell>
                        <TableCell></TableCell>
                        <TableCell>L</TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </Table>
              </TableContainer>
              <Box marginTop='1rem'>
                We read the letters from left to right, top to bottom, and we can get the the cipher texts "HLOEL"
              </Box>
            </Box>
          </Box>
        </Box>
      }
    >
      <Divider sx={{ margin: "1rem 0" }} />
      <CommonCipherUI
        onButtonClick={handleEncryption}
        result={cipherTexts}
        labelOfKey="depth"
        withKey
      />
      <Divider sx={{ margin: "1rem 0" }} />
      <CommonCipherUI
        onButtonClick={handleDecryption}
        result={plainTexts}
        labelOfKey="depth"
        withKey
        isEncryption={false}
      />
    </DocumentWrapper>
  );
};
