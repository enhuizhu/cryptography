import React, {useState, useCallback, FC} from 'react';
import { Grid, Container } from '@mui/material';
import { SideBar } from './components/side-bar';

function App() {
  const [CipherComponent, setCipherComponent] = useState<React.ReactNode>(<>hello</>)
  const handleComponentChange = useCallback((Component: FC) => {
    const Node = <Component />
    setCipherComponent(Node);
  }, []);

  const Component = () => {
    return <>
      {CipherComponent}
    </>
  };

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={3}>  
          <SideBar onComponentSelect={handleComponentChange}/>
        </Grid >
        <Grid item xs={12} sm={9}>
          <Component />
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
