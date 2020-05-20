import React from "react";
import clsx from "clsx";
import {Header, StickyFooter} from "../../components/organisms";
import {PageTemplate} from "../../components/templates";
import {makeStyles} from "@material-ui/core/styles";
import {Button} from "@material-ui/core";
import {useHistory} from "react-router-dom";

const useStyles = makeStyles(theme => ({
    wrap: {
        width: '100%',
        textAlign: 'center'
    },
    heading: {
        fontSize: '5rem',
        fontWeight: 500,
        textAlign: 'center',
        margin: 0,
        marginTop: '0.85714em',
        marginBottom: '0.57142em'
    }
}));

export const NotFoundPage = () => {
    const classes = useStyles();
    const history = useHistory();
    const handleBack = () => history.go(-1);

    return (
        <PageTemplate header={<Header open={false}/>} footer={<StickyFooter/>}>
            <h1 className={clsx(classes.heading)}>404 Not Found</h1>
            <div className={classes.wrap}>
                <Button variant={"contained"} color={"primary"} onClick={handleBack}>Return to website</Button>
            </div>
        </PageTemplate>
    )
};