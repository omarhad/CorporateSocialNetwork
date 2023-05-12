import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles({
  loginPage: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  },
  doodle_login_page: {
    width: "100vw",
    height: "100vh",
  },
  button: {
    marginTop: "1rem",
  },
  form: {
    padding: "2rem",
    maxHeight: "80vh", /* La valeur doit être supérieure à la hauteur maximale attendue pour vos formulaires */
    overflow: "hidden",
    "&.fade-enter": {
      opacity: 0,
      maxHeight: 0,
    },
    "&.fade-enter-active": {
      opacity: 1,
      maxHeight: "80vh", /* La valeur doit être supérieure à la hauteur maximale attendue pour vos formulaires */
      transition: "opacity 300ms ease-in-out, max-height 300ms ease-in-out",
    },
    "&.fade-exit": {
      opacity: 1,
      maxHeight: "80vh", /* La valeur doit être supérieure à la hauteur maximale attendue pour vos formulaires */
    },
    "&.fade-exit-active": {
      opacity: 0,
      maxHeight: 0,
      transition: "opacity 300ms ease-in-out, max-height 300ms ease-in-out",
    },
  },
});
