import { createMuiTheme } from '@material-ui/core/styles';

const myGreen = '#50ab8a';
const myYellow = '#fbb61a';

export default createMuiTheme({
    palette:{
        common:{
            blue: `${myGreen}`,
            orange: `${myYellow}`
        },
        primary:{
            main: `${myGreen}`
        },
        secondary:{
            main: `${myYellow}`
        }
    }
});