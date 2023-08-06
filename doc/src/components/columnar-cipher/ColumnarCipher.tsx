import React, { FC, useState, useCallback } from "react";
import {
  Box,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { DocumentWrapper } from "../document-wrapper";
import { CommonCipherUI } from "../common-cipher-ui";
import { ColumnarCipher } from "ciphers";

const columnarCipher = new ColumnarCipher();

export const ColumnarCipherUI: FC = () => {
  const [cipherTexts, setCipherTexts] = useState<string>("");
  const [plainTexts, setPlainTexts] = useState<string>("");

  const handleEncryption = useCallback((plainTexts: string, key: string) => {
    columnarCipher.setKey(key);
    setCipherTexts(columnarCipher.encrypt(plainTexts, 1));
  }, []);

  const handleDecryption = useCallback((cipherTexts: string, key: string) => {
    columnarCipher.setKey(key);
    setPlainTexts(columnarCipher.decrypt(cipherTexts, 1));
  }, []);

  return (
    <DocumentWrapper
      title="Columnar Cipher"
      description={
        <Box marginBottom="1rem">
          <Box fontWeight="bold" margin="1rem 0">
            Encryption
          </Box>
          <Box>
            Here are the steps for the encryption:
            <Box marginTop="1rem">
              1. Let say the length of key is 'n', then we can generate table
              with 'n' column.
            </Box>
            <Box marginTop="1rem">
              2. Put the letters from left to right into table.
            </Box>
            <Box marginTop="1rem">
              3. Base on the order of the key, read the correspond column from
              top to bottom.
            </Box>
            <Box marginTop="1rem" fontWeight="bold">
              Example:
            </Box>
            <Box marginTop="1rem">
              Let say plain text is "hello", and key is "4321", base on the
              above rules, we can generate the following table:
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>4</TableCell>
                      <TableCell>3</TableCell>
                      <TableCell>2</TableCell>
                      <TableCell>1</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>H</TableCell>
                      <TableCell>E</TableCell>
                      <TableCell>L</TableCell>
                      <TableCell>L</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>O</TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
              <Box marginTop="1rem">
                We read the letters base on the column order, we can get 'LLEHO'
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
