import React, { FC, useState } from 'react';
import { TextField, Typography, Button, Box } from '@mui/material';

export interface CommonCipherUIProps {
  result?: string;
  key?: string;
  onButtonClick: (text: string, key: string) => void;
  withKey?: boolean;
  isEncryption?: boolean;
}

export const CommonCipherUI: FC<CommonCipherUIProps> = ({
  result,
  onButtonClick,
  withKey = false,
  isEncryption = true,
}) => {
  const [texts, setTexts] = useState('');
  const [key, setKey] = useState<string>('');

  return <>
    <Box>
      <Box>
        <TextField 
          type='text'
          value={texts}
          onChange={(e) => setTexts(e.target.value)}
          aria-label={isEncryption ? 'plain texts' : 'cipher texts'}
          label={isEncryption ? 'plain texts' : 'cipher texts'}
          variant='standard'
        />
      </Box>
      
      {withKey && <Box>
        <TextField 
          type='text'
          value={key}
          onChange={(e) => setKey(e.target.value)}
          aria-label='key'
          label='key'
          variant='standard'
        />
      </Box>}

      <Typography margin='1rem 0'>
        {isEncryption ? 'Cipher Texts' : 'Plain Texts'} : {result}
      </Typography>

      <Button variant='contained' onClick={() => onButtonClick(texts, key)}>Generate {isEncryption ? 'Cipher Texts' : 'Plain Texts'}</Button> 
    </Box>
  </>
}


