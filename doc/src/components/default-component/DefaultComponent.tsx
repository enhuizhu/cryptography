import React, { FC } from "react";
import {
  Box,
} from "@mui/material";
import { DocumentWrapper } from "../document-wrapper";

export const DefaultComponent: FC = () => {
  return (
    <DocumentWrapper
      title="Introduction"
      description={
        <Box marginBottom="1rem">
          <p>
          Security properties are: confidentiality, integrity, availability, authentication,
          non-repudiation, accountability, privacy, anonymity, unobservability, untracebility,
          timeliness.
          </p>
          <p>
            <div>
                Traditional security properties and goals
            </div>
            <ul>
                <li>
                    1. Confidentiality (secrecy)
                    <p>no improper disclosure of information</p>
                </li>
                <li>
                    2. Integrity 
                    <p>no improper modification of information</p>
                </li>
                <li>
                    3. Availability 
                    <p>no improper impairment of functionality/service</p>
                </li>
            </ul>
          </p>
          <p>
            <div>Security properties and security mechanisms summary</div>
            <ul>
                <li>
                    1. Confidentiality: Information is not learned by unauthorized principles
                </li>
                <li>
                    2. integrity: Data has not been altered.
                </li>
                <li>
                    3. Availability: Data/Services can be accessed when desired.
                </li>
                <li>
                    4. Accountability: Actions can be traced to responsible principles.
                </li>
                <li>
                    5. Authentication: Principles or data origin can be identified accurately.
                </li>
            </ul>
          </p>
        </Box>
      }
    >
    </DocumentWrapper>
  );
};
