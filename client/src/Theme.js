import { createMuiTheme } from '@material-ui/core/styles';

const myGreen = '#50ab8a';
const myYellow = '#fbb61a';
const myBlack = '#0c1613';

export default createMuiTheme({
    palette:{
        common:{
            blue: `${myGreen}`,
            orange: `${myYellow}`,
            black: `${myBlack}`
        },
        primary:{
            main: `${myGreen}`
        },
        secondary:{
            main: `${myYellow}`
        }
    }
});