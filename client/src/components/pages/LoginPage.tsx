import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Container from "@mui/material/Container";
import SignUpButton from "../buttons/SignUpButton";
const blackListyLogo = require("../../assets/listyLogoBlack.svg");

const theme = createTheme();

export default function LoginPage() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
        </Box>
        <Box
          component="form"
          sx={{
            display: "flex",
            mt: 2,
            alignItems: "center",
            flexDirection: "column",
            margin: "auto",
            justifyContent: "center",
            position: "static",
            padding: "0 3rem",
          }}
          onSubmit={handleSubmit}
          noValidate
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid
            container
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
        {/* </Box> */}
      </Container>
    </ThemeProvider>
  );
}
// import LoginButton from '../buttons/LoginButton';
// import SignUpButton from '../buttons/SignUpButton';
// import { ReactElement } from 'react';
// import { useAppSelector } from '../../redux/hooks';
// const blackListyLogo = require("../../assets/listyLogoBlack.svg");

// export const LoginPage = (): ReactElement => {
// 	const authState = useAppSelector((state) => state.authReducer);

// 	return !authState.isAuthenticated ? (
// 		<>
// 			<div className='login-page'>
// 				<img className='black-listy-logo' src={blackListyLogo} />

// 				<LoginButton />
// 				<SignUpButton />
// 			</div>
// 		</>
// 	) : (
// 		<></>
// 	);
// };
