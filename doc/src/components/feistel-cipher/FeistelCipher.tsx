import React, { FC, useState, useCallback } from "react";
import {
  Typography,
  Box,
  Divider,
  Alert,
} from "@mui/material";
import { DocumentWrapper } from "../document-wrapper";
import { CommonCipherUI } from "../common-cipher-ui";
import { FeistelCipher } from "ciphers";

const feistelCipher = new FeistelCipher([], (input, k) => {
    return (input ^ k) % 26;
  });

export const FeistelCipherUI: FC = () => {
  const [cipherTexts, setCipherTexts] = useState<string>("");
  const [plainTexts, setPlainTexts] = useState<string>("");

  const handleEncryption = useCallback((plainTexts: string, key: string) => {
    feistelCipher.setKey(key.split(',').map(Number));
    setCipherTexts(feistelCipher.encryptMessage(plainTexts));
  }, []);

  const handleDecryption = useCallback((cipherTexts: string, key: string) => {
    feistelCipher.setKey(key.split(',').map(Number));
    setPlainTexts(feistelCipher.decryptMessage(cipherTexts));
  }, []);

  return (
    <DocumentWrapper
      title="Feistel Cipher"
      description={
        <Box marginBottom="1rem">
          <Box fontWeight="bold" margin="1rem 0">Encryption</Box>
          <Box>
            Here are the steps for the encryption:
            <Box marginTop='1rem'>
              1. generate key base on number of rounds, if it's 16 rounds, then it needs 16 keys.
            </Box>
            <Box marginTop='1rem'>
              2. divide the message into blocks and each block has same length.
            </Box>
            <Box marginTop='1rem'>
              3. each block divide into two parts with same length.
            </Box>
            <Box marginTop='1rem'>
              4. use encrypt function to encrypt the right part, the result of the encryption xor with
              the left part. the result of xor become the new right part, the original right part become
              the left part.
            </Box>
            <Box marginTop='1rem'>
              5. repeat the step until it runs out of the keys.
            </Box>
            <Box marginTop='1rem'>
              6. the whole process can be represented as follows: <br/>
              LE(i + 1) = RE(i);<br/>
              RE(i + 1) = E(RE(i), K(i+1)) xor LE(i);<br/>
            </Box>
            
          </Box>
          <Box fontWeight="bold" margin="1rem 0">Decryption</Box>
          <Box marginTop='1rem'>
            1. Divide cipher texts into blocks with same length.
          </Box>
          <Box marginTop='1rem'>
            2. Divide each block into two parts with same length.
          </Box>
          <Box marginTop='1rem'>
            3. LD(i) = RE(totalRound - i); <br/>
               RD(i) = LE(totalRound - i); <br/>

               RD(i + 1) = E(RD(i), K(totalRound - i)) xor LD(i);<br/>
               LD(i + i) = RD(i)
          </Box>
          <Box marginTop='1rem'>
            The whole encryption and decryption can be depicted as the following image:
            <img src='/cryptography/assets/feistel-cipher.png' alt="feistel cipher" width={'100%'}/>
          </Box>
        </Box>
      }
    >
      <Divider sx={{ margin: "1rem 0" }} />
      <Alert security="info" sx={{marginBottom: '1rem'}}>
        in this example, I use the following encrypt function:
        <code>
            {
                `
                 (input, k) => {
                    return (input ^ k) % 26;
                 }            
                `
            }
        
        </code>
        so the key must be number, and please split keys with ','. For example:
        1, 2, 3
      </Alert>
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
