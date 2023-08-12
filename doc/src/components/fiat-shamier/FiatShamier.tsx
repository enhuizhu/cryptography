import React, { FC } from "react";
import {
  Box,
} from "@mui/material";
import { DocumentWrapper } from "../document-wrapper";

export const FiatShamier: FC = () => {
  return (
    <DocumentWrapper
      title="Fiat Shamier"
      description={
        <Box marginBottom="1rem">
          <ul>
            <li>1. We need two prime number p and q, it can generate number n = p x q.</li>
            <li>2. generate random number s (1 to n - 1)as private key</li>
            <li>3. generate v as public key v = s ^ 2 % n</li>
            <li>4. generate random number r (commitment) and x = r ^ 2 % n </li>
            <li>5. x is sent to verifier</li>
            <li>6. verifier generate c which is equal to 0 or 1 to prover</li>
            <li>7, prover generate Y = (r * s ^ c) % n and send to verifier</li>
            <li>
              8. verifier calculate Y^2 = (r^2 * s^(2*c)) % n,
              and also calculate (x * v ^ c) % n = r^2*s^(2*c) %n,
              we can get (Y^2) % n == (x * v ^ c) % n
            </li>
          </ul>
          
          <p><b>How can attacker cheat during the process</b></p>
          <p>
            let say attacker generate r/2, and send x = (r/2) ^ 2 to to verifier,
            verifier send c = 0 to attacker, attacker generate Y = r/2 * 1 and send back to 
            verifier verifier calculate Y^2 % n = r^2/4 % n = x % n, it will pass, but when c = 1, it will fail.
          </p>
        </Box>
      }
    >
    </DocumentWrapper>
  );
};
