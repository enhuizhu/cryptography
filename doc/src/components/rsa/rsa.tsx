import React, { FC } from "react";
import {
  Box,
} from "@mui/material";
import { DocumentWrapper } from "../document-wrapper";

export const RSA: FC = () => {
  return (
    <DocumentWrapper
      title="RSA"
      description={
        <Box marginBottom="1rem">
          <ul>
            <li>1. We need two prime number p and q, it can generate number n = p x q. O(n) = (p - 1) x (q - 1)</li>
            <li>2. generate e which is range from 1 to O(n), gcd(e, O(n)) = 1</li>
            <li>3. generate d = e<sup>-1</sup>% O(n)</li>
            <li>4. C = M ^ e % n</li>
            <li>5. M = C ^ d % n</li>
          </ul>
        </Box>
      }
    >
    </DocumentWrapper>
  );
};
