import React, { FC } from "react";
import {
  Box,
} from "@mui/material";
import { DocumentWrapper } from "../document-wrapper";

export const DiffieHellman: FC = () => {
  return (
    <DocumentWrapper
      title="Diffie-hell-man"
      description={
        <Box marginBottom="1rem">
          <ul>
            <li>1. we need prime number p and a, a is primitive root</li>
            <li>2. Alice generate private number Xa, and public number Ya = a ^ Xa % q</li>
            <li>3. Bob generate private number Xb, and public number Yb = a ^ Xb % q.</li>
            <li>4. Alice send Ya to Bob, Bob generate K = Ya ^ Xb % q = a ^ (Xa * Xb) % q</li>
            <li>5. Bob send Yb to Alice, Alice generate K = Yb ^ Xa % q = a ^ (Xb * Xa) % q</li>
            <li>6. At the end both Alice and Bob have the same key</li>
          </ul>
        </Box>
      }
    >
    </DocumentWrapper>
  );
};
