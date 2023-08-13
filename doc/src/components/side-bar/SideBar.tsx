import React, { FC } from 'react';
import { ListItem, ListItemText, List } from '@mui/material';
import { CaesarCipherUI } from '../caesar-cipher/CaesarCipher';
import { PlayfairCipherUI } from '../play-cipher/PlayfairCipher';
import { VigenereCipherUI } from '../vigenere-cipher';
import { VernamCipherUI } from '../vernam-cipher';
import { RailFenceCipherUI } from '../rail-fence-cipher';
import { ColumnarCipherUI } from '../columnar-cipher';
import { FeistelCipherUI } from '../feistel-cipher';
import { DesCipherUI } from '../des-cipher';
import { SecurityProtocol } from '../security-protocol';
import { NeedhamSchroederPublicKeyProtocol } from '../needham-schroeder-public-key-protocol';
import { Kerberos } from '../kerberos';
import { FiatShamier } from '../fiat-shamier';
import { RSA } from '../rsa';
import { DiffieHellman } from '../diffie-hellman';
import { MDC } from '../mdc';
import { MAC } from '../mac';

interface linkItem {
  label: string;
  component: React.FC;
}

const links: linkItem[] = [
  {
    label: 'Caesar Cipher (substitution ciphers)',
    component: CaesarCipherUI,
  },
  {
    label: 'Play Cipher (substitution ciphers)',
    component: PlayfairCipherUI,
  },
  {
    label: 'Vigenere Cipher (substitution ciphers)',
    component: VigenereCipherUI,
  },
  {
    label: 'Vernam Cipher (substitution ciphers)',
    component: VernamCipherUI,
  },
  {
    label: 'Rail Fence Cipher (transposition ciphers)',
    component: RailFenceCipherUI,
  },
  {
    label: 'Columnar Cipher (transposition ciphers)',
    component: ColumnarCipherUI,
  },
  {
    label: 'Feistel Cipher (composite ciphers)',
    component: FeistelCipherUI,
  },      
  {
    label: 'DES Cipher (composite ciphers)',
    component: DesCipherUI,
  },
  {
    label: 'Security Protocol',
    component: SecurityProtocol,
  },
  {
    label: 'Needham Schroeder Public Key Protocol',
    component: NeedhamSchroederPublicKeyProtocol,
  },
  {
    label: 'Kerberos',
    component: Kerberos,
  },
  {
    label: 'Fiat shamier',
    component: FiatShamier,
  },
  {
    label: 'RSA',
    component: RSA,
  },
  {
    label: 'Diffie Hell Man',
    component: DiffieHellman,
  },
  {
    label: 'Message Detection Code',
    component: MDC,
  },
  {
    label: 'Message Authentication Code',
    component: MAC,
  }                                                                                        
];

interface SideBarProps {
  onComponentSelect: (component: React.FC) => void;
}

export const SideBar: FC<SideBarProps> = ({
  onComponentSelect
}) => {
  return <List dense>
    {links.map(({label, component}) => 
      <ListItem key={label} sx={{cursor: 'pointer'}}>
         <ListItemText
            primary={label}
            onClick={onComponentSelect.bind(null, component)}
          />
      </ListItem>    
    )}
  </List>
}