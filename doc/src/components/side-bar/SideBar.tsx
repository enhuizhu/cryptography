import React, { FC } from 'react';
import { ListItem, ListItemText, List } from '@mui/material';
import { AtashCipher } from '../atash-cipher/AtashCipher';
import { CaesarCipherUI } from '../caesar-cipher/CaesarCipher';
import { PlayfairCipherUI } from '../play-cipher/PlayfairCipher';
import { VigenereCipherUI } from '../vigenere-cipher';
import { VernamCipherUI } from '../vernam-cipher';
import { RailFenceCipherUI } from '../rail-fence-cipher';
import { ColumnarCipherUI } from '../columnar-cipher';
import { FeistelCipherUI } from '../feistel-cipher';

interface linkItem {
  label: string;
  component: React.FC;
}

const links: linkItem[] = [
  {
    label: 'Atash Cipher (substitution ciphers)',
    component: AtashCipher,
  },
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