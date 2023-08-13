import React, { FC } from "react";
import {
  Box,
} from "@mui/material";
import { DocumentWrapper } from "../document-wrapper";

export const MDC: FC = () => {
  return (
    <DocumentWrapper
      title="Message Detection Code"
      description={
        <Box marginBottom="1rem">
          <ul>
            <li>1. Alice chose a hash function H, and generate MDC = H(M)</li>
            <li>2. Alice Send both M and MDC to Bob </li>
            <li>3. Bob use hash function H to calculate MDC' = H(M), if MDC' === MDC, then message has not been modified</li>
          </ul>
        </Box>
      }
    >
    </DocumentWrapper>
  );
};
