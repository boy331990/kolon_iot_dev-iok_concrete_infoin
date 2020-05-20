import React, {useContext} from 'react';
import {useHistory, useRouteMatch} from "react-router-dom";
import {observer} from "mobx-react-lite";
import {Button} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {AddBox as AddBoxIcon} from "@material-ui/icons";
import {EnhancedTableWithoutCheckbox} from "../../../components/molecules";
import {useAxios} from "../../../hooks";
import {StoreContext} from "../../../context";


const useStyles = makeStyles(theme => ({
    content: {
        marginTop: theme.spacing(2)
    },
    button: {
        margin: theme.spacing(1)
    }
}));


const headCells = [
    {id: "code", numeric: false, disablePadding: false, label: "장소 아이디", hide: true, primary: true},
    {id: "name", numeric: false, disablePadding: false, label: "장소명"},
    {id: "details", numeric: false, disablePadding: false, label: "설명"},
    // {id: "add1", numeric: false, disablePadding: false, label: "추가정보1(양생정보)", component: <Button variant={"outlined"} size={"small"}>등록/수정</Button>},
    // {id: "add2", numeric: false, disablePadding: false, label: "추가정보2(배합표)", component: <Button variant={"outlined"} size={"small"}>보기</Button>}
    {id: "add1", numeric: false, disablePadding: false, label: "추가정보1(양생정보)"},
    {id: "add2", numeric: false, disablePadding: false, label: "추가정보2(배합표)"}
];

export const PlaceList = observer(props => {
    const classes = useStyles();
    const {store} = props;
    const history = useHistory();
    const {url} = useRouteMatch();
    const {authentication} = useContext(StoreContext);

    const {loading, data} = useAxios({
        url: process.env.REACT_APP_API_GATEWAY + `/sites/${store.siteCodeData}/places`
        // url: process.env.REACT_APP_API_CONCRETE + `/concrete/sites/${store.siteCodeData}/information`,
        // method: 'get',
        //     headers: {
        //         Accept: "application/json",
        //         "Content-Type": "application/json",
        //         Authorization: "Bearer " + authentication.accessToken
        //     }
    });

    // const handleClick = id => {
    //      history.push("/site/setting/add");
    // };

    const handleAdd = () => {
        history.push(`${url}/add?siteCode=${store.siteCodeData}`);
    };

    return (
        <div className={classes.content}>
            {loading && 'Loading...'}
            {
                data &&
                <EnhancedTableWithoutCheckbox
                    title={"장소목록"}
                    rows={data.data.content}
                    headCells={headCells}
                    orderByKeyword={"attributeId"}
                    orderKeyword={"asc"}
                    //rowClick={handleClick}
                    siteCode={store.siteCodeData}
                    downloadButton={
                        <Button
                            variant={"contained"}
                            color={"primary"}
                            className={classes.button}
                            size={"large"}
                            startIcon={<AddBoxIcon/>}
                            onClick={handleAdd}>등록
                        </Button>
                    }
                    dense
                />
            }
        </div>
    );
});