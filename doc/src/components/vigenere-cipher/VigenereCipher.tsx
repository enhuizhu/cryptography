import React, { FC, useState, useCallback } from "react";
import {
  Typography,
  Box,
  Divider,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { DocumentWrapper } from "../document-wrapper";
import { CommonCipherUI } from "../common-cipher-ui";
import { VigenereCipher } from "ciphers";

const vigenereCipher = new VigenereCipher();

export const VigenereCipherUI: FC = () => {
  const [cipherTexts, setCipherTexts] = useState<string>("");
  const [plainTexts, setPlainTexts] = useState<string>("");

  const handleEncryption = useCallback((plainTexts: string, key: string) => {
    vigenereCipher.setKey(key);
    setCipherTexts(vigenereCipher.encryptMsg(plainTexts));
  }, []);

  const handleDecryption = useCallback((cipherTexts: string, key: string) => {
    vigenereCipher.setKey(key);
    setPlainTexts(vigenereCipher.decryptMsg(cipherTexts));
  }, []);

  return (
    <DocumentWrapper
      title="Vigenere Cipher"
      description={
        <Box marginBottom="1rem">
          <Box fontWeight="bold" marginBottom="1rem">Polyalphabetic substitution cipher</Box>
          <Box marginBottom="1rem">
            This kind of of ciphers use different monoalphabetic substitutions
            as one proceeds through the plaintext message, the idea is to
            conceal distribution using a family of mapping.
          </Box>
          <Box>
            Two general features common to all such ciphers:
            <List>
              <ListItem>
                <ListItemText>
                  1. A set of related monoalphabethic substitution rules is used
                </ListItemText>
              </ListItem>
              <ListItem>
                <ListItemText>
                  2. A key determines which particular rule is chosen for given
                  transformation
                </ListItemText>
              </ListItem>
            </List>
          </Box>

          <Box>Best known, perhaps simplest is the Vigenere cipher.</Box>
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
              <Typography fontWeight="bold">Ci = (Pi + Ki) mod 26</Typography>
            </Box>
            <Box>
              3. To decrypt it, we can use the following formula:
              <Typography fontWeight="bold">Pi = (Ci - Ki) mod 26</Typography>
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
