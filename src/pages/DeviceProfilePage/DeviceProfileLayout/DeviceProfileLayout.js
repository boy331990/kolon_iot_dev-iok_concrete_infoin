import React from 'react';
import {Grid, Typography} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import {makeStyles} from "@material-ui/core/styles";
import {PowerSettingsNew as PowerSettingsNewIcon} from '@material-ui/icons';
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import {DeviceOperations} from "./DeviceOperations";
import {DeviceAttributes} from "./DeviceAttributes";
import {useAxios} from "../../../hooks";

const useStyles = makeStyles(theme => ({
    box: {
        height: 700,
        minWidth: 500
    },
    power: {
        fontSize: 80
    },
    button: {
        display: 'block',
        marginTop: theme.spacing(2),
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
}));

export const DeviceProfileLayout = () => {
    const classes = useStyles();
    const [age, setAge] = React.useState('');
    const [open, setOpen] = React.useState(false);
    const [age1, setAge1] = React.useState('');
    const [open1, setOpen1] = React.useState(false);

    const {loading, data} = useAxios({
        url: process.env.REACT_APP_API_GATEWAY + "/devices/DEVICE-baf0c063811c44a7ada1274ce658ecd3"
    });

    const handleChange = event => {
        setAge(event.target.value);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleChange1 = event => {
        setAge1(event.target.value);
    };

    const handleClose1 = () => {
        setOpen1(false);
    };

    const handleOpen1 = () => {
        setOpen1(true);
    };

    return (
        <Grid container spacing={2}>
            <Grid item xs={4} container justify={"center"} alignItems={"flex-start"}>
                <Paper>
                    <Box className={classes.box} p={3}>
                        <Grid container direction={"column"} justify={"center"} alignItems={"center"} spacing={9}>
                            <Grid item>
                                <Typography variant={"h4"}>{data && data.data.content.name}</Typography>
                                <Typography variant={"h6"} align={"center"}>{data && data.data.content.model.manufacturer.name}</Typography>
                                <Typography variant={"h6"} align={"center"}>{data && data.data.content.model.name + ' : ' + data.data.content.model.code}</Typography>
                            </Grid>
                            <Grid item>
                                <PowerSettingsNewIcon className={classes.power}/>
                            </Grid>
                            <Grid item>
                                <div>
                                    <FormControl className={classes.formControl}>
                                        <InputLabel id="demo-controlled-open-select-label">모드</InputLabel>
                                        <Select
                                            labelId="demo-controlled-open-select-label"
                                            id="demo-controlled-open-select"
                                            open={open}
                                            onClose={handleClose}
                                            onOpen={handleOpen}
                                            value={age}
                                            onChange={handleChange}
                                        >
                                            <MenuItem value=''>
                                                <em>None</em>
                                            </MenuItem>
                                            <MenuItem value={'10'}>AUTO</MenuItem>
                                            <MenuItem value={'20'}>MANUAL</MenuItem>
                                            <MenuItem value={'30'}>SLEEP</MenuItem>
                                        </Select>
                                    </FormControl>
                                </div>
                                <div>
                                    <FormControl className={classes.formControl}>
                                        <InputLabel id="select-label-set">설정온도</InputLabel>
                                        <Select
                                            labelId="select-label-set"
                                            id="open-select"
                                            open={open1}
                                            onClose={handleClose1}
                                            onOpen={handleOpen1}
                                            value={age1}
                                            onChange={handleChange1}
                                        >
                                            <MenuItem value=''>
                                                <em>None</em>
                                            </MenuItem>
                                            <MenuItem value={'10'}>10%</MenuItem>
                                            <MenuItem value={'20'}>20%</MenuItem>
                                            <MenuItem value={'30'}>30%</MenuItem>
                                        </Select>
                                    </FormControl>
                                </div>
                            </Grid>
                        </Grid>
                    </Box>
                </Paper>
            </Grid>
            {loading && 'loading...'}
            {data &&
            <Grid item xs container spacing={1} direction={"row"}>
                <Grid item xs>
                    <DeviceAttributes rows={data.data.content.model.attributes ? data.data.content.model.attributes : []}/>
                </Grid>
                <Grid item xs>
                    <DeviceOperations rows={data.data.content.model.operations ? data.data.content.model.operations : []}/>
                </Grid>
            </Grid>
            }
        </Grid>
    );
};