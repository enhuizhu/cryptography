import React, { FC, useState, useCallback } from "react";
import {
  Typography,
  Box,
  Divider,
} from "@mui/material";
import { DocumentWrapper } from "../document-wrapper";
import { CommonCipherUI } from "../common-cipher-ui";
import { VernamCipher } from "ciphers";

const vernamCipher = new VernamCipher();

export const VernamCipherUI: FC = () => {
  const [cipherTexts, setCipherTexts] = useState<string>("");
  const [plainTexts, setPlainTexts] = useState<string>("");

  const handleEncryption = useCallback((plainTexts: string, key: string) => {
    vernamCipher.setKey(key);
    setCipherTexts(vernamCipher.encrypt(plainTexts));
  }, []);

  const handleDecryption = useCallback((cipherTexts: string, key: string) => {
    vernamCipher.setKey(key);
    setPlainTexts(vernamCipher.decrypt(cipherTexts));
  }, []);

  return (
    <DocumentWrapper
      title="Vernam Cipher"
      description={
        <Box marginBottom="1rem">
          <Box fontWeight="bold" margin="1rem 0">Encryption</Box>
          <Box>
            Here are the steps for the encryption:
            <Box>
              1. Base on the length of message, you may need to expand the key.
              for example if the message is "HELLOWORLD" and the original key is
              "AB", then you need to expand it to make it have exactly same
              length as "HELLOWORLD", so the expanded key should be
              "ABABABABAB".
            </Box>
            <Box>
              2. Let's say the position (in alphabets list A,B,C,D ....X,Y,Z) of
              each letter is Pi, the position of of each key letter is Ki, and the
              position of each cipher letter is Ci. we will have the following
              formula:
              <Typography fontWeight="bold">Ci = (Pi xor Ki) mod 26</Typography>
            </Box>
            <Box>
              3. To decrypt it, we can use the following formula:
              <Typography fontWeight="bold">Pi = (Ci xor Ki) mod 26</Typography>
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
