import React, { FC } from "react";
import {
  Box,
} from "@mui/material";
import { DocumentWrapper } from "../document-wrapper";
import { MathPow } from "../math-pow/MathPow";


export const SecurityProtocol: FC = () => {
  return (
    <DocumentWrapper
      title="Security Protocol"
      description={
        <Box marginBottom="1rem">
          <Box>
            A security protocol uses cryptographic mechanisms to achieve security objectives. examples include:
            <ul>
              <li>entity or message authentication</li>
              <li>key establishment</li>
              <li>integrity</li>
              <li>timelines</li>
              <li>fair exchange</li>
              <li>non-repudiation</li>
            </ul>

            <Box marginTop='1rem' fontWeight='bold'>
              Keys and Encryption
            </Box>

            <Box marginTop='1rem'>
              <p>A key is K and its inverse key is <MathPow base='K' exponent='-1'/> </p>
            </Box>
            <Box marginTop='1rem'>
              Encryption is represented as &#123;M&#125;<sub>K</sub>
              <ul>
                <li>Encryption with A's public Key &#123;M&#125;<sub>K<sub>A</sub></sub>.</li>
                <li>Encryption by A or B with their symmetric key: &#123;M&#125;<sub>K<sub>AB</sub></sub>.</li>
                <li>Encryption by A's private key &#123;M&#125;<sub>K<sub>A</sub><sup>-1</sup></sub>.</li>
              </ul>
            </Box>
            <Box marginTop='1rem' fontWeight='bold'>
              Nonces and timestamp
            </Box>
            <Box marginTop='1rem'>
              <p>
                Nonces NA, N1 and so on, are fresh data items used for challenges or responses.
              </p>
              <p>
                A timestamp T denotes the time, which is used, for example, for key expiration.
              </p>
            </Box>
            <Box marginTop='1rem' fontWeight='bold'>
              Communication between principles
            </Box>
            <Box marginTop='1rem'>
              <p>
                Alice send a message A, T1, K<sub>AB</sub> to Bob and they are encrypted by K<sub>B</sub> is represented as: 
                <div>
                  A -{'>'} B: &#123;A, T1, K<sub>AB</sub>&#125;<sub>K<sub>B</sub></sub>
                </div>
              </p>
              <p>
                A timestamp T denotes the time, which is used, for example, for key expiration.
              </p>
            </Box>
          </Box>
        </Box>
      }
    >
    </DocumentWrapper>
  );
};
