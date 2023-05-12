import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        //primary: {
        //    main: '#556cd6',
        //},
        //secondary: {
        //    main: '#19857b',
        //},
        //error: {
       //    main: '#ff3333',
        //},
        //background: {
       //    default: '#fff',
        //},
// Ajoutez les nouvelles couleurs en fonction des dernières tendances de design
// Par exemple :
        primary: {
            main: '#89CFF0',
        },
        secondary: {
         main: '#32CD32',
        },
        error: {
         main: '#ff0000',
        },
        background: {
         default: '#f2f2f2',
         },
    },
// Ajoutez d'autres personnalisations selon les dernières tendances de design
// Par exemple :
     typography: {
        fontFamily: 'Lato , sans-serif',
        fontSize: 16,
        // // ...
     },
     shape: {
        borderRadius: 8,
        // // ...
     },
     spacing: 8,
    // ...
});
export default theme;