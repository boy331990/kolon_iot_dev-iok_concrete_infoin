import React, {forwardRef, useMemo, useState} from 'react';
import {Link} from "react-router-dom";
import {Collapse, List, ListItem, ListItemIcon, ListItemText} from "@material-ui/core";
import {ExpandLess, ExpandMore} from "@material-ui/icons";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    nested: {
        paddingLeft: theme.spacing(9),
    },
}));

export const ListItemLink = (props) => {
    const {icon, title, path, routes, className} = props;
    const [open, setOpen] = useState(false);
    const classes = useStyles();
    const handleOpen = () => {
        setOpen(!open);
    };

    const renderLink = useMemo(
        () => forwardRef((itemProps, ref) => <Link to={path} ref={ref} {...itemProps}/>),
        [path]
    );

    return (
        <>
            <ListItem button component={path && renderLink} onClick={handleOpen} className={className}>
                {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
                <ListItemText primary={title}/>
                {routes && (open ? <ExpandLess/> : <ExpandMore/>)}
            </ListItem>
            {
                routes &&
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        {routes.map((route, index) => (
                            <ListItemLink key={index} {...route} className={classes.nested}/>
                        ))}
                    </List>
                </Collapse>
            }
        </>
    )
};