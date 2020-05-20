import React from "react";
import {DevicesOther, Home, HomeWork, PeopleAlt, Person, WbIncandescent} from "@material-ui/icons";
import {CustomerPage, DeviceHistoryPage, DeviceProfilePage, HomePage, ManagerPage, ProductPage, SignInPage, SitePage, SitePlacePage} from "./pages";

export const routes = [
    {
        path: "/",
        exact: true,
        title: "대시보드",
        icon: <Home/>,
        component: () => <HomePage/>
    },
    {
        path: "/login",
        title: "로그인",
        icon: <Person/>,
        component: () => <SignInPage/>
    },
    {
        title: "사용자",
        icon: <PeopleAlt/>,
        routes: [
            {
                path: "/customer",
                title: "관리자",
                component: () => <CustomerPage/>
            },
            {
                path: "/manager",
                title: "운영자",
                component: () => <ManagerPage/>
            }
        ]
    },
    {
        title: "현장",
        icon: <HomeWork/>,
        routes: [
            {
                path: "/site",
                title: "현장 관리",
                component: () => <SitePage/>
            },
            {
                path: "/site/place",
                title: "장소 관리",
                component: () => <SitePlacePage/>
            }
        ]
    },
    {
        path: "/products",
        title: "제품",
        icon: <DevicesOther/>,
        component: () => <ProductPage/>
    },
    {
        title: "장비 프로파일",
        icon: <WbIncandescent/>,
        routes: [
            {
                path: "/device/profile",
                title: "장비 프로파일",
                component: () => <DeviceProfilePage/>
            },
            {
                path: "/device/history",
                title: "장비 사용이력",
                component: () => <DeviceHistoryPage/>
            },
        ]
    }
];