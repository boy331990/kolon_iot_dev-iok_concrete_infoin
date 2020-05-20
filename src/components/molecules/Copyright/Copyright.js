import {Container, Link, Typography} from "@material-ui/core";
import React from "react";

export const Copyright = () => {
    return (
        <Container maxWidth={"sm"}>
            <Typography variant="body2" color="textSecondary" align="center">
                {'© '}
                <Link color="inherit" href="http://kolonbenit.com/">
                    KOLON BENIT
                </Link>{' '}
                {new Date().getFullYear()}
                {' ALL RIGHT RESERVED.'}
            </Typography>
        </Container>
    )
};
