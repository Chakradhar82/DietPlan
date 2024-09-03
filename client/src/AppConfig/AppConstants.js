import { theme } from 'antd';
const { darkAlgorithm } = theme;

export let THEME_DARK = {
    "algorithm": darkAlgorithm,
    "token": {
        "fontFamily": "Archivo",
        "colorPrimary": "#dc4446",
        "colorInfo": "#2eb8c1",
        "colorSuccess": "#82b44f",
        "colorWarning": "#f2c357",
        "colorLink": "#dc4446",
        "colorBgBase": "#21272f",
        "borderRadius": "4px"
    },
    "components": {
        "Typography": {
            "colorLink": "#dc4446",
            "colorLinkHover": "#e5e5e5"
        },
        "Tabs": {
            "inkBarColor": "white",
            "itemColor": "white",
        },
        "Menu": {
            "colorBgContainer": "rgb(220, 68, 70)",
            "colorText": "white",
            "itemSelectedBg": "rgb(220, 68, 70)",
        },
        "Button": {
            "colorTextLightSolid": "#ffffff",
            "defaultColor": "#e4e4e4",
            "defaultShadow": "",
            "primaryShadow": "",
            "dangerShadow": "",
            "colorPrimary": "#dc4446"
        },
        "Table": {
            "headerSplitColor": "#444444",
            "headerBorderRadius": 4,
            "headerSortHoverBg": "#4a5668",
            "bodySortBg": "#323b47",
            "headerBg": "#495668",
            "headerFilterHoverBg": "#4a5668",
            "headerSortActiveBg": "#4a5668",
            "headerColor": "#ffffff",
            "padding": 8,
            "fontWeightStrong": 400
        },
        "Input": {
            "colorBorder": "rgb(71, 84, 99)"
        },
        "Card": {
            "headerBg": "#495668",
            "colorTextHeading": "#ffffff",
            "fontWeightStrong": 400,
            "fontSize": 14,
            "fontSizeLG": 14,
            "padding": 8,
        }
    },
};
