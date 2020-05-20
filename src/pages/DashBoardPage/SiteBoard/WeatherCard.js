import React from 'react';
import {Box, Paper} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import clsx from "clsx";
import {makeStyles} from "@material-ui/core/styles";
import {blue, red} from "@material-ui/core/colors";



const useStyles = makeStyles(theme => ({
    icon: {
        fontSize: 80
    },
    svg: {
        height: 80
    },
    paper: {
        height: '100%'
    },
    weather: {
        '&.sunny': {
            height: 120
        },
        '&.temperature': {
            height: 50
        },
        '&.humidity': {
            height: 50
        },
        '&.dust': {
            height: 80
        },
        '&.minWidth': {
            minWidth: 200
        },
        '&.weatherMinWidth': {
            minWidth: 780
        }
    },
    boardLabel: {
        fontWeight: 600
    },
    board: {
        fontWeight: 700,
        '&.red': {
            color: red[500]
        },
        '&.blue': {
            color: blue[500]
        }
    },
    box: {
        height: '100%',
        '&.center': {
            textAlign: 'center'
        }
    },
    emptyBox: {
        height: 155
    }
}));

export const WeatherCard = () => {
    const classes = useStyles();

    return (
        <Paper className={classes.paper}>
            <Box p={3}>
                <Grid container direction={"column"}>
                    <Typography className={classes.boardLabel} variant={"h5"} gutterBottom>관리현장</Typography>
                    <Grid item container direction={"row"} alignItems={"center"} spacing={3} justify={"center"}>
                        <Grid item sm={3} xs>
                            <Box className={clsx(classes.box, 'center')}>
                                <img className={clsx(classes.weather, 'sunny')} src={process.env.PUBLIC_URL + '/images/sunny.svg'} alt={"sunny"}/>
                                <Typography variant={"h6"} align={"center"}>오존</Typography>
                            </Box>
                        </Grid>
                        <Grid item sm={3} xs className={clsx(classes.weather, 'minWidth')}>
                            <Grid container spacing={2}>
                                <Grid item container spacing={1}>
                                    <Grid item>
                                        <img className={clsx(classes.weather, 'temperature')} src={process.env.PUBLIC_URL + '/images/temperature.svg'}
                                             alt={"temperature"}/>
                                    </Grid>
                                    <Grid item>
                                        <Typography variant={"h6"}>6℃</Typography>
                                        <Typography variant={"h6"} align={"center"}>어제보다 0℃</Typography>
                                    </Grid>
                                </Grid>
                                <Grid item container>
                                    <Grid item>
                                        <img className={clsx(classes.weather, 'humidity')} src={process.env.PUBLIC_URL + '/images/humidity.svg'}
                                             alt={"humidity"}/>
                                    </Grid>
                                    <Grid item>
                                        <Typography variant={"h6"} align={"center"}>85%</Typography>
                                        <Typography variant={"h6"} align={"center"}>습도</Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs>
                            <Grid container spacing={2} justify={"space-evenly"}>
                                <Grid item>
                                    <Box className={clsx(classes.box, 'center')}>
                                        <img className={clsx(classes.weather, 'dust')} src={process.env.PUBLIC_URL + '/images/cloud.svg'} alt={"dust"}/>
                                        <Typography variant={"h6"} align={"center"}>미세먼지(PM10)</Typography>
                                    </Box>
                                </Grid>
                                <Grid item>
                                    <Box className={clsx(classes.box, 'center')}>
                                        <img className={clsx(classes.weather, 'dust')} src={process.env.PUBLIC_URL + '/images/cloud.svg'} alt={"ultra dust"}/>
                                        <Typography variant={"h6"} align={"center"}>초미세먼지(PM2.5)</Typography>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </Paper>
    );
}