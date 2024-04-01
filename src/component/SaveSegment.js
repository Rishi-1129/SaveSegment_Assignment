import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid, AppBar, Toolbar, IconButton, Typography, Box, TextField, FormControl, Select, MenuItem, Button } from "@mui/material";
import RemoveIcon from '@mui/icons-material/Remove';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
function SaveSegment(props) {
    const [segmentName, setSegmentName] = useState('')
    const [currentSelected, setCurrentSelected] = useState('')
    const [selectedSchema, setSelectedSchema] = useState([])
    const schemaOptions = [
        { label: 'First Name', value: 'first_name' },
        { label: 'Last Name', value: 'last_name' },
        { label: 'Gender', value: 'gender' },
        { label: 'Age', value: 'age' },
        { label: 'Account Name', value: 'account_name' },
        { label: 'City', value: 'city' },
        { label: 'State', value: 'state' },
    ];

    const handleSave = async () => {
        let schema = [];
        schemaOptions.map((item) => {
            if (selectedSchema.includes(item.value)) {
                return schema.push({
                    [item.value]: item.label
                })
            } else return null;
        })
        const data = {
            segment_name: segmentName,
            schema: schema
        }
        await axios.post('https://webhook.site/160a59ee-a63d-4ef5-8b8f-19648406fc02', data, {
            headers: { "Access-Control-Allow-Origin": "*" }
        })

    }
    useEffect(() => {
    }, [selectedSchema])
    return (
        <Grid container xs={12} flexDirection="column" style={{

            width: "30vw",


        }}>

            <Grid item >
                <Box sx={{ flexGrow: 1 }}>
                    <AppBar position="static">
                        <Toolbar>
                            <IconButton
                                size="large"
                                edge="start"
                                color="inherit"
                                onClick={props.onClose}
                            >
                                <ChevronLeftIcon />
                            </IconButton>
                            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                                Saving Segment
                            </Typography>
                        </Toolbar>
                    </AppBar>
                </Box>
            </Grid>
            <Box maxHeight='100%' sx={{ m: 2 }}>
                <Grid item m={2} >
                    <Typography > Enter the name of the Segment</Typography>
                    <TextField
                        placeholder="Name of the Segment"
                        value={segmentName}
                        onChange={(e) => setSegmentName(e.target.value)}

                    />
                    <Typography sx={{ mt: 2 }}> To save your, you need to add the schemas to build the query</Typography>
                </Grid>

                {selectedSchema.map((item1) => (
                    <Grid key={item1.value}>
                        <FormControl sx={{ m: 1, width: 250 }}>
                            <Select
                                value={item1}
                                onChange={(e) => {
                                    setSelectedSchema([...selectedSchema.filter(data1 => data1 !== item1), e.target.value])
                                }}
                                displayEmpty
                                inputProps={{ 'aria-label': 'Without label' }}

                            >
                                {schemaOptions.map((item) => {
                                    if (item?.value === item1 || !selectedSchema.includes(item.value)) {
                                        return (
                                            <MenuItem key={item.value} value={item?.value}>{item.label}</MenuItem>
                                        )
                                    } else { return null }
                                })}

                            </Select>

                        </FormControl>
                        <RemoveIcon style={{ cursor: "pointer", marginTop: 20 }} onClick={() => { setSelectedSchema(selectedSchema.filter(data => data !== item1)) }} />

                    </Grid>



                ))}

                <Grid item >
                    <FormControl sx={{ m: 1, width: 250 }}>
                        <Select
                            value={currentSelected}
                            onChange={(e) => { setCurrentSelected(e.target.value) }}
                            displayEmpty
                            inputProps={{ 'aria-label': 'Without label' }}

                        >
                            <MenuItem value="" disable>
                                Add Schema to segment
                            </MenuItem>
                            {schemaOptions.map((item) => {
                                if (!selectedSchema.includes(item.value)) {
                                    return (
                                        <MenuItem key={item.value} value={item.value}>{item.label}</MenuItem>
                                    )
                                } else { return null }
                            })}


                        </Select>

                    </FormControl>

                </Grid>
                <Grid item marginTop={2}>

                    <Button size="small" sx={{ color: '#74AA9C' }} onClick={() => {
                        if (currentSelected !== "") {
                            setSelectedSchema([...selectedSchema, currentSelected])
                            setCurrentSelected("")

                        } else {
                            alert("Select a schema to add")
                        }
                    }}> + Add to Schema</Button>
                </Grid>

                <Grid item marginTop={10} >
                    <Button variant="contained"
                     size="small" 
                     style={{ color: 'white', background: '#74AA9C', marginRight: 15, marginLeft: 15 }} 
                     onClick={() => { handleSave(); props.onClose(); setSegmentName(''); setCurrentSelected(''); }}>
                        Save the Segment
                    </Button>
                    <Button variant="contained" 
                    size="small"
                     style={{ color: 'red', background: 'white' }} 
                     onClick={() => { props.onClose(); setCurrentSelected(''); setSegmentName(''); }} >
                         Cancel
                    </Button>
                </Grid>
            </Box>
        </Grid>

    )
}

export default SaveSegment