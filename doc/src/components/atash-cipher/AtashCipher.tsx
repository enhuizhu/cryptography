import React, { FC, useState, useCallback } from 'react';
import { DocumentWrapper } from '../document-wrapper';
import { CommonCipherUI } from '../common-cipher-ui';
import { AtbashCipher } from 'ciphers';

const atbashCipher = new AtbashCipher();

export const AtashCipher: FC = () => {
  const [cipherTexts, setCipherTexts] = useState('');
  
  const handleButtonClick = useCallback((plainTexts: string) => {
      setCipherTexts(atbashCipher.encrypt(plainTexts));
  }, []);

  return <DocumentWrapper
      title="Atash Cipher"
      description="Simplest Cipher in the history"
  >
      <CommonCipherUI
        onButtonClick={handleButtonClick}   
        result={cipherTexts}
      />
  </DocumentWrapper>   
}