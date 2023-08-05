import React, { createContext, useState, useContext, Dispatch, SetStateAction, FC } from 'react';
import { Typography } from '@mui/material';

export interface CipherContextProps {
    CipherComponent: React.FC;
    setCipherComponent: Dispatch<SetStateAction<FC<{}>>>;

}

const cipherContextDefaultState: CipherContextProps = {
    CipherComponent: () => <>
        <Typography>welcome to the cipher world!</Typography>
    </>,
    setCipherComponent: () => {},
};

export const CipherContext = createContext<CipherContextProps>(
    cipherContextDefaultState
);

export const useCipherContextState = () => {
    return useContext(CipherContext);
};

export const CipherProvider = (props: React.PropsWithChildren) => {
    const [cipherComponent, setCipherComponent] = useState<React.FC>(() => <></>);
    return (
        <CipherContext.Provider
            value={{
                CipherComponent: cipherComponent,
                setCipherComponent
            }}
        >
            {props.children}
        </CipherContext.Provider>
    );
};
