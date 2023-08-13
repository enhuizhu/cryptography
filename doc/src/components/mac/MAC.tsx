import React, { FC } from "react";
import {
  Box,
} from "@mui/material";
import { DocumentWrapper } from "../document-wrapper";

export const MAC: FC = () => {
  return (
    <DocumentWrapper
      title="Message Authentication Code"
      description={
        <Box marginBottom="1rem">
          <ul>
            <li>1. Alice chose a hash function Hk which can accept symmetric key as parameter, and generate MDC = Hk(M)</li>
            <li>2. Alice send both M and MAC to Bob </li>
            <li>3. Bob use hash function Hk to calculate MAC' = H(M), if MAC' === MAC, then message has not been modified and it's sent by Alice</li>
          </ul>
        </Box>
      }
    >
    </DocumentWrapper>
  );
};
