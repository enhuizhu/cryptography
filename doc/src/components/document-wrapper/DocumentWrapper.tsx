import React, {FC} from 'react';
import { Typography } from '@mui/material';


export interface DocumentWrapperProps {
    title: string;
    description: React.ReactNode | string,
    children: React.ReactNode
}


export const DocumentWrapper: FC<DocumentWrapperProps> = ({
    title,
    description,
    children
}) => {
    return (<div>
        <h3>{title}</h3>
        <Typography>{description}</Typography>
        {children}
    </div>)
}
