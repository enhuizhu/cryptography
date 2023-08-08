import React, { FC, useState, useCallback } from "react";
import { Typography, Box, Divider, Alert } from "@mui/material";
import { DocumentWrapper } from "../document-wrapper";
import { CommonCipherUI } from "../common-cipher-ui";
import { DESCipher } from "ciphers";

const encryptFunc = (input: any) => input;

export const DesCipherUI: FC = () => {
  const [cipherTexts, setCipherTexts] = useState<string>("");
  const [plainTexts, setPlainTexts] = useState<string>("");

  const handleEncryption = useCallback((plainTexts: string, key: string) => {
    try {
      const dESCipher = new DESCipher(key, encryptFunc);
      setCipherTexts(dESCipher.encrypt(plainTexts));
    } catch (e: any) {
      alert(e.message)
    }
  }, []);

  const handleDecryption = useCallback((cipherTexts: string, key: string) => {
    try {
      const dESCipher = new DESCipher(key, encryptFunc);
      setPlainTexts(dESCipher.decrypt(cipherTexts));
    } catch (e: any) {
      alert(e.message);
    }
    
  }, []);

  return (
    <DocumentWrapper
      title="DES Cipher"
      description={
        <Box marginBottom="1rem">
          <Box marginTop="1rem">
            We will see that DES works with blocks of 64 bits and with keys of
            64 bits (but actually only 56 of the 64 bits of the key are used).
            DES has the structure of a festel cipher, and the plaintext is
            processed 16 rounds of both permutation and substitutions. Given the
            use of 56 bit keys, DES is no longer secure and alternatives need to
            be considered. It turns out that double DES (two consecutive
            applications of DES with two keys) is not adequate, but triple DES
            (with two or three keys) is and is widely used today.
          </Box>
          <Box marginTop="1rem">
            The following image depict how DES works:
            <img
              src="/cryptography/assets/des.png"
              alt="DES Cipher"
              width={"100%"}
            />
            The following image depict how each round works:
            <img
              src="/cryptography/assets/des_round.png"
              alt="DES Cipher round"
              width={"100%"}
            />
            The following image depict how does key generated for each round:
            <img
              src="/cryptography/assets/des_key_generation.png"
              alt="DES Cipher key generation"
              width={"100%"}
            />
          </Box>
          <Box marginTop='1rem'>
            here are the steps for the encryption

            <p>1. Do initial permutation for the plain text.</p>
            <p>2. The original 64 bit key need to reduce to 56 bit by ignoring every 8th bit, the key for each round is generated dynamically base on the following rules:</p>
            <ul>
              <li>divide the key into two groups, each groups contains same length of bit string.
                let say left part of the key is LKey, right part of the key is RKey.
              </li>
              <li>get left shift value from bit rotation table base on round number. let say bit shift value is S</li>
              <li>base on shift value S, we need to circular left shift S bit for both LKey and RKey  </li>
              <li>after we get round key, we need to use permuted choice two table to reduce the key size form 56 to 48 </li>
            </ul> 
            <p>
              3. divided the permuted 64 bit string into two 32 bit string.
            </p>
            <p>
              4. right 32 bit string need to expanded to 48 bit.
            </p>
            <p>
              5. Use encryption function to encrypt the 32 bit string.
            </p>
            <p>
              6. Encrypted result xor with 48 bit key.
            </p>
            <p>
              7. use 8 s-boxes to reduce the 48 bit string xor result to 32 bit string
            </p>
            <p>
              8. use permutation table to permute 32 bit string.
            </p>
            <p>
              9. left 32 bit string xor with the permutation result.
            </p>
            <p>
              10. original right 32 bit string, become left 32 bit string. the result of step
              9 become new right 32 bit string.
            </p>
            <p>
              11. repeat step 4 - 10 16 times.
            </p>
          </Box>
          <Box marginTop="1rem" fontWeight="bold">
            Decryption DES
          </Box>
          <Box marginTop="1rem">
            <p>
              After all the substitution, permutation, XORs, and shifting
              around, you might think that the decryption algorithm is
              completely different and just sa confusing as the encryption
              algorithm. On the contrary, the various operations were chosen to
              produce a very useful property. The same algorithm works for both
              encryption and decryption.
            </p>
            <p>
              With DES it is possible to use the same function to encrypt or
              decrypt a block. Then only difference is that the keys must be
              used in the reverse order. That is, if the encryption keys for
              each round are k1, k2, k3 ..., k16, then the decryption keys are
              k16, k15, k14, ... k1. the algorithm that generate the key used
              for each round is circular as well.
            </p>
          </Box>
        </Box>
      }
    >
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
