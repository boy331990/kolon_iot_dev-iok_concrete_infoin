import React from 'react';
import {Box, Paper} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import {PinDropOutlined as PinDropOutlinedIcon} from "@material-ui/icons";
import {blue, grey, red} from "@material-ui/core/colors";
import {makeStyles} from "@material-ui/core/styles";
import {useAxios} from "../../../hooks";


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

export const SiteCard = () => {
    const classes = useStyles();

    const {data} = useAxios({
        url: process.env.REACT_APP_API_GATEWAY + "/sites"
    });

    return (
        <Paper className={classes.paper}>
            <Box className={classes.box} p={3}>
                <Typography className={classes.boardLabel} variant={"h5"}>관리현장</Typography>
                <Grid item container xs={12} direction={"row"} alignItems={"center"}>
                    <Grid item xs={6}>
                        <PinDropOutlinedIcon className={classes.icon} htmlColor={grey[700]}/>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography className={classes.board} variant={"h3"} color={"primary"} align={"center"}>{data && data.data.totalElements}</Typography>
                    </Grid>
                    <Grid item xs>
                        <div className={classes.emptyBox}/>
                    </Grid>
                </Grid>
            </Box>
        </Paper>
    );
};