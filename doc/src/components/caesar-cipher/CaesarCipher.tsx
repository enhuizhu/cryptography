import React, { FC, useState, useCallback } from "react";
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  Box,
  Divider,
} from "@mui/material";
import { DocumentWrapper } from "../document-wrapper";
import { CommonCipherUI } from "../common-cipher-ui";
import { CaesarCipher } from "ciphers";

const caesarCipher = new CaesarCipher();

export const CaesarCipherUI: FC = () => {
  const [cipherTexts, setCipherTexts] = useState<string>("");
  const [plainTexts, setPlainTexts] = useState<string>("");

  const handleEncryption = useCallback((plainTexts: string, key: string) => {
    setCipherTexts(caesarCipher.encryptText(plainTexts, Number(key)));
  }, []);

  const handleDecryption = useCallback((cipherTexts: string, key: string) => {
    setPlainTexts(caesarCipher.decryptText(cipherTexts, Number(key)));
  }, []);

  return (
    <DocumentWrapper
      title="Caesar Cipher"
      description={
        <Box marginBottom="1rem">
          <Typography>
            The Caesar is an example of monoalphabetic cipher. In a
            monoalphabetic cipher, you use the same substitution rule to find
            the replacement ciphertext letter for each letter of the alphabet in
            the plaintext message. we can map each alphabet to a number base on
            the following table:
            <TableContainer
              component={Paper}
              sx={{ marginTop: "1rem", marginBottom: "1rem" }}
            >
              <Table>
                <TableHead>
                  <TableRow>
                    {caesarCipher.alphabets.map((letter) => (
                      <TableCell>{letter}</TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    {caesarCipher.alphabets.map((_, index) => (
                      <TableCell>{index}</TableCell>
                    ))}
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Typography>
          <Typography>
            User can pass key which is number and then generate new alphabet
            base on the key value. Let's Say C is the encryption result, P is
            the position of the original letter, and K is the key, then the
            whole process can be simplified as the following formula:
            <Box fontWeight={"bold"} component={"div"} margin={"1rem 0"}>
              C = (P + K) mod 26
            </Box>
            The decryption process is:
            <Box fontWeight={"bold"} component={"div"} margin={"1rem 0"}>
              C = (P - K) mod 26
            </Box>
            if (P - K) is less then 0, for example P - K equal to -1, then we
            should add 26, to make it map to the correct value, for this example
            if P - K equal to -1, then (P - K) mod 26 should be 25.
          </Typography>
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
