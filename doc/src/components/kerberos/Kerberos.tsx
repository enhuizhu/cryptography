import React, { FC } from "react";
import {
  Box,
} from "@mui/material";
import { DocumentWrapper } from "../document-wrapper";

export const Kerberos: FC = () => {
  return (
    <DocumentWrapper
      title="Kerberos"
      description={
        <Box marginBottom="1rem">
          <p>Kerberos requirement</p>
          <p>
            Secure: An eavesdropper should not be able to impersonate users.
          </p>
          <p>
            Reliable: As many services depend on Kerberos for access control,
            it must be highly reliable and support a distributed architecture,
            where one system can back up another. 
          </p>
          <p>Transparent: Each user should enter a single password to obtain 
            network service and should be unaware of underlying protocol. Nowadays,
            this is often referred to as single sign-on.
          </p>
          <p>
            Scalable: The system should scale to support large numbers of users and servers.
            This suggest a modular, distributed architecture.
          </p>
          <p>Kerberos version 4: architecture</p>
          <p>
            A kerberos system comprises Kerberos authentication server (KAS) and the Ticket Granting Server (TGS),
            and presides over a number of other servers that manage services and resources (such as computers, printers, databases, etc).

            <p>
                the protocol between the Client A and Kerberos system contains of three phases:
                <ul>
                    <li>authentication (using KAS)</li>
                    <li>authorisation (using TGS)</li>
                    <li>service (where servers check TGS Ticket to control access to services and resources)</li>
                </ul>

                each phase consistsof two messages:

                <p>
                    Authentication phase:
                    <ul>
                        <li>
                            1. Request for ticket-granting ticket.
                            <p>
                                user logs on to the workstation and requests a service from the host.
                            </p>
                        </li>
                        <li>
                            2. Ticket and session key.
                            <p>
                                KAS verifies user's access rights in the database and create a ticket-granting ticket
                                and a session key. The result are encrypted using key derived from the user's password
                                ticket and session key.
                            </p>
                        </li>
                    </ul>
                </p>
                <p>
                    Authorisation phase:
                    <ul>
                        <li>
                            1. Request for service-granting ticket.
                            <p>
                                the workstation prompts the user for a password and uses the password to decrypt the incoming
                                message, it then send the ticket and authenticator that contains the user's name, network address and
                                the time to TGS
                            </p>
                        </li>
                        <li>
                            2. Service ticket and session key.
                            <p>
                                TGS decrypt the ticket and authenticator, verify the request, then create a ticket for the requested server.
                            </p>
                        </li>
                    </ul>
                </p>
                <p>
                    Service phase
                    <ul>
                        <li>
                            1. Request of service
                            <p>the work station sends the service ticket and the authenticator</p>
                        </li>
                        <li>
                            2. Server authenticator
                            <p>
                                The server verify that ticket and authenticator match, and then grant access to 
                                the service. If mutual authentication is required, the server returns an authenticator.
                            </p>
                        </li>
                    </ul>
                </p>
            </p>
          </p>
          <Box marginTop='1rem' fontWeight={'bold'}>
            Authentication phase
          </Box>
          <p>
            <ul>
                <li>1. A -&gt; KAS: A, TGS</li>
                <li>2. KAS -&gt; A: &#123; K<sub>A, TGS</sub>, TGS, T1, &#123; A, TGS, K<sub>A, TGS</sub>, T1 &#125;<sub>K<sub>KAS, TGS</sub></sub> &#125;<sub>K<sub>A, KAS</sub></sub></li>
            </ul>
          </p>
          <Box marginTop='1rem' fontWeight={'bold'}>
            Authorisation phase
          </Box>
          <p>
            <ul>
                <li>3. A -&gt; TGS: &#123; &#123; A, TGS, K<sub>A, TGS</sub>, T1 &#125;<sub>K<sub>KAS, TGS</sub></sub>,   &#123; A, T2 &#125; <sub>K<sub>A, TGS</sub></sub>   &#125;<sub>K<sub>A, TGS</sub></sub>, B</li>
                <li>4. TGS -&gt; A: &#123; K<sub>A, B</sub>, B, T3, &#123; A, B, K<sub>A, B</sub>, T3 &#125;<sub>K<sub>B, TGS</sub></sub> &#125;<sub>K<sub>A, TGS</sub></sub> &#125;K<sub>A, TGS</sub></li>
            </ul>
          </p>
          <Box marginTop='1rem' fontWeight={'bold'}>
            Service phase
          </Box>
          <p>
            <ul>
                <li>4. A -&gt; B: &#123; A, B, K<sub>A, B</sub>, T3 &#125; K<sub>B, TGS</sub>   &#123; A, T4 &#125; K<sub>A, B</sub></li>
                <li>5. B -&gt; A: &#123; T4 + 1 &#125;K<sub>A, B</sub></li>
            </ul>
          </p>
          <Box marginTop='1rem' fontWeight={'bold'}>
            Scalability of Kerberos
          </Box>
          <Box marginTop='1rem'>
            A ream is defined by a kerberos server. The server stores user and application server passwords fro the realm.
            Large networks may be divided into administrative realms as well.
            <p>
                Kerberos supports inter-realm protocols
                <ul>
                    <li>Server register with each other</li>
                    <li>For the client to access a service in another realm, the TGS in the client's realm receives a request and grants a ticket to access the TGS in the service Realm</li>
                    <li>The protocol extension is simple, there are simply tow additional steps. How ever for n realms, we end up with a O(n<sup>2</sup>) key distribution problem, 
                    as every server must negotiate a shared key with any other server it want to collaborate with.
                    </li>
                </ul>

                <p><b>Inter realm communication</b></p>
                <ul>
                    <li>
                        Client request ticket for local TGS
                    </li>
                    <li>
                        Ticket form local TGS
                    </li>
                    <li>
                        Client request ticket for remote TGS
                    </li>
                    <li>ticket for remote TGS</li>
                    <li>    
                        client request ticket for remote service
                    </li>
                    <li>
                        ticket from remote service.
                    </li>
                    <li>
                        client requests remote service.
                    </li>
                </ul>
            </p>
          </Box>
        </Box>
      }
    >
    </DocumentWrapper>
  );
};
