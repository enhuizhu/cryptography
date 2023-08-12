import React, { FC } from "react";
import {
  Box,
} from "@mui/material";
import { DocumentWrapper } from "../document-wrapper";

export const NeedhamSchroederPublicKeyProtocol: FC = () => {
  return (
    <DocumentWrapper
      title="Needham Schroeder Public Key Protocol"
      description={
        <Box marginBottom="1rem">
          <p>NSPK protocol can be represented base follows:</p>
          <p>A &#8594; B: &#123;NA, A&#125;<sub>K<sub>B</sub></sub></p>
          <p>B &#8594; A: &#123;NA, NB&#125;<sub>K<sub>A</sub></sub></p>
          <p>A &#8594; B: &#123;NB&#125;<sub>K<sub>B</sub></sub></p>
          
          the Above protocol is not perfect, it still can have man-in-the-middle attack. To
          avoid it, we can improve the protocol as follows:
          <p>A &#8594; B: &#123; NA, A &#125;<sub>K<sub>B</sub></sub></p>
          <p>B &#8594; A: &#123; NA, NB, B &#125;<sub>K<sub>A</sub></sub></p>
          <p>A &#8594; B: &#123; NB &#125;<sub>K<sub>B</sub></sub></p>

          We can now see that at the second stage of the NSL protocol, Alice will realize that the message from Charlie does not have Charlie's name in it (but, rather, Bob's) and, therefore, she will abort the protocol.
          The new protocol is called Needhan-Schroeder-Lowe(NSL) protocol.
        </Box>
      }
    >
    </DocumentWrapper>
  );
};
