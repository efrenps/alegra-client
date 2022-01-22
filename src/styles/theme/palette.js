import { colors } from '@material-ui/core';
import { alpha } from '@material-ui/core/styles';

function createGradient(color1, color2) {
    return `linear-gradient(to bottom, ${color1}, ${color2})`;
}

// SETUP COLORS
const GREY = {
    0: '#FFFFFF',
    100: '#F9FAFB',
    200: '#F4F6F8',
    300: '#DFE3E8',
    400: '#C4CDD5',
    500: '#919EAB',
    600: '#637381',
    700: '#454F5B',
    800: '#212B36',
    900: '#161C24',
    500_8: alpha('#919EAB', 0.08),
    500_12: alpha('#919EAB', 0.12),
    500_16: alpha('#919EAB', 0.16),
    500_24: alpha('#919EAB', 0.24),
    500_32: alpha('#919EAB', 0.32),
    500_48: alpha('#919EAB', 0.48),
    500_56: alpha('#919EAB', 0.56),
    500_80: alpha('#919EAB', 0.8),
};

const GREEN = {
    lighter: '#C8FACD',
    light: '#5BE584',
    main: '#00AB55',
    dark: '#007B55',
    darker: '#005249',
    contrastText: '#fff',
};
const SECONDARY = {
    lighter: '#D6E4FF',
    light: '#84A9FF',
    main: '#3366FF',
    dark: '#1939B7',
    darker: '#091A7A',
    contrastText: '#fff',
};
const INFO = {
    lighter: '#D0F2FF',
    light: '#74CAFF',
    main: '#1890FF',
    dark: '#0C53B7',
    darker: '#04297A',
    contrastText: '#fff',
};
const SUCCESS = {
    lighter: '#E9FCD4',
    light: '#AAF27F',
    main: '#54D62C',
    dark: '#229A16',
    darker: '#08660D',
    contrastText: GREY[800],
};
const WARNING = {
    lighter: '#FFF7CD',
    light: '#FFE16A',
    main: '#FFC107',
    dark: '#B78103',
    darker: '#7A4F01',
    contrastText: GREY[800],
};
const ERROR = {
    lighter: '#FFE7D9',
    light: '#FFA48D',
    main: '#FF4842',
    dark: '#B72136',
    darker: '#7A0C2E',
    contrastText: '#fff',
};

const GRADIENTS = {
    green: createGradient(GREEN.light, GREEN.main),
    info: createGradient(INFO.light, INFO.main),
    success: createGradient(SUCCESS.light, SUCCESS.main),
    warning: createGradient(WARNING.light, WARNING.main),
    error: createGradient(ERROR.light, ERROR.main),
};

const white = '#FFFFFF';
const green = '#008000';
const danger = '#dc3545';

const palette = {
    primary: {
        contrastText: white,
        main: '#34214F',
    },
    secondary: {
        contrastText: white,
        dark: colors.blue[900],
        main: colors.blue.A700,
        light: colors.blue.A400,
        ...SECONDARY,
    },
    error: {
        contrastText: white,
        dark: colors.red[900],
        main: colors.red[600],
        light: colors.red[400],
    },
    errorSecondary: {
        main: '#FE7F9B',
    },
    warning: {
        main: '#d6a000',
        dark: '#a77e04',
    },
    success: {
        main: '#20b118',
        dark: '#138c0c',
    },
    secondaryInfo: {
        main: '#5D89FF',
        dark: '#5272cb',
        contrastText: '#fff',
    },
    cancel: {
        main: '#E3E3E3',
    },
    text: {
        primary: colors.blueGrey[900],
        secondary: '#8580a6',
        contrastTextPurpure: '#a9a4bb',
        link: '#007AFF',
        default: '#777879',
        purpure: '#34214F',
        purplelight: '#615bd8',
        grayLabel: '#616161',
        gray: '#858585',
        shark: '#212529',
        darkShark: '#1B1E21',
        emperor: '#505050',
        blueGrey: '#757ea7',
        grayShark: '#212529',
        infoDark: '#2748AC',
        stormGray: '#727082',
        minsk: '#3F366B',
        poloBlue: '#8E9ECB',
        waterloo: '#707090',
        scorpion: '#5E5E5E',
        boulder: '#777777',
        boulderGray: '#767676',
        tundora: '#444444',
        shipCove: '#7080B9',
        white,
        royalBlue: '#4067E3',
        tacao: '#F1C082',
        geraldine: '#F88584',
        deYork: '#71C48E',
        butterflyBush: '#564CA1',
        fruitSalad: '#4CAF50',
        nevada: '#636e72',
        green,
        whiteTransparent: '#ffffff69',
        outerSpace: '#263238',
        dodgerBlue: '#1890FF',
        oldBrick: '#942424',
        wildBlueYonder: '#63679f',
    },
    link: colors.blue[800],
    icon: colors.blueGrey[600],
    background: {
        default: '#F7FAFF',
        white,
        primary: '#F2F3FD',
        secondary: '#E9E9FF',
        gray: '#f4f4f9',
        selago: '#F4F5FD',
        alabaster: '#F8F8F8',
        outerSpace: '#2E353B',
        dodgerBlue: '#1890FF',
        lightShadeRed: '#FFF7F7',
        lightShadeYellow: '#FFFFE0',
        lightShadeGreen: '#E9FFDB',
        silver: '#BDBDBD',
        snowyMint: '#c6fcc7',
        wildBlueYonder: '#7281B5',
        purpleHeart: '#6624cc',
        black: '#000',
        green,
        danger,
        forestGreen: '#23963B',
        eucalyptus: '#29A744',
        tacao: '#F0C085',
        cornFlowerBlueTrans: '#7080b936',
        fruitSalad: '#4CAF50',
        red: '#FF0000',
        athensGray: '#E9ECEF',
    },
    rgb: {
        purple: '150,104,211',
        gray: '244,244,249',
        lightWhite: '252,252,252',
        black: '0,0,0',
    },
    divider: colors.grey[200],
    rating: '#ffb400',
    listColor: [
        '#9668D3',
        '#F06CD8',
        '#FFB522',
        '#FD732B',
        '#527dff',
        '#fe7391',
    ],
    border: {
        primary: '#DDDDDD',
        secondary: '#EFEFEF',
        nobel: '#B7B7B7',
        lightRed: '#FCB9B9',
        darkRed: '#CF7777',
        darkYellow: '#8B8000',
        darkGreen: '#006400',
        dustyGray: '#999999',
        geyser: '#DFE6E9',
        malibu: '#80BDFF',
        gallery: '#eeeeee',
        cadetGrey: '#949494',
        gunmetal: '#263238',
        ghost: '#CED4DA',
        alto: '#D9D9D9',
        mercury: '#E5E5E5',
    },
    gradients: GRADIENTS,
    grey: GREY,
    info: { ...INFO },
    green: { ...GREEN },
    red: { ...ERROR },
    warn: { ...WARNING },
};

export default palette;
