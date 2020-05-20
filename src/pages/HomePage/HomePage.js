import React from 'react';
import {PageTemplate} from '../../components/templates';
import {Footer, Header, Menu} from "../../components/organisms";
import {Redirect, Route, Switch} from "react-router-dom";
import {CustomerPage, DashBoardPage, DeviceHistoryPage, DeviceProfilePage, ManagerPage, ProductPage, SitePage, SitePlacePage} from "../index";
import {MonitoringPage} from "../MonitoringPage/MonitoringPage";
import {MixTablePage} from "../MixTablePage/MixTablePage";
import {SiteSettingPage} from "../SiteSettingPage/SiteSettingPage";
export const HomePage = () => {
    const [open, setOpen] = React.useState(true);

    const handleOpen = () => {
        setOpen(!open);
    };
    return (
        <PageTemplate
            header={<Header open={open} onDrawer={handleOpen}/>}
            menu={<Menu open={open} onDrawer={handleOpen}/>}
            footer={<Footer open={open}/>}
        >
            <Switch>
                <Route path={"/"} exact children={<DashBoardPage/>}/>
                <Route path={"/customer"} children={<CustomerPage/>}/>
                <Route path={"/manager"} children={<ManagerPage/>}/>
                <Route path={"/monitoring"} children={<MonitoringPage/>}/>
                <Route path={"/mix-table"} children={<MixTablePage/>}/>
                <Route path={"/site/setting/add"} children={<SiteSettingPage/>}/>
                <Route path={"/site/place"} children={<SitePlacePage/>}/>
                <Route path={"/site"} children={<SitePage/>}/>
                <Route path={"/device/profile"} children={<DeviceProfilePage/>}/>
                <Route path={"/device/history"} children={<DeviceHistoryPage/>}/>
                <Route path={"/products"} children={<ProductPage/>}/>
                <Route path={"*"}>
                    <Redirect to={"/not-found"}/>
                </Route>
            </Switch>
        </PageTemplate>
    );
};