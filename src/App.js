import { Button, Grid, Drawer } from '@mui/material';
import React, {useState} from 'react';
import SaveSegment from './component/SaveSegment';


function App(){
    const [savingSegmentOpen, setSavingSegmentOpen] = useState(false);
  const toggleDrawer = () => {
    setSavingSegmentOpen(!savingSegmentOpen);
  };
    return (
        <Grid container xs={12} alignItem="center" sx={{m:10}}>
            <Button variant="outlined" onClick={toggleDrawer}>
                Save Segment
            </Button>
            <Drawer anchor="right" open={savingSegmentOpen} onClose={toggleDrawer}>
            <SaveSegment onClose={toggleDrawer}/>
            </Drawer>
        </Grid>
    )
}


export default App