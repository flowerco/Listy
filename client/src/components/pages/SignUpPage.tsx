import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useAppDispatch } from '../../redux/hooks';
import { createUser } from '../../utils/SignUpServices';
const blackListyLogo = require('../../assets/listyLogoBlack.svg');

function Copyright(props: any) {
	return (
		<Typography
			variant='body2'
			color='text.secondary'
			align='center'
			{...props}
		>
			{'Copyright © '}
			<Link color='inherit' href='https://mui.com/'>
				Your Website
			</Link>{' '}
			{new Date().getFullYear()}
			{'.'}
		</Typography>
	);
}

const theme = createTheme();

export default function SignUp() {
	const dispatch = useAppDispatch();
	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		// extract data from form
		const data = new FormData(event.currentTarget);
		console.log({
			email: data.get('email'),
			password: data.get('password'),
		});

		// call async API service
		const result = await createUser(data.get('email'), data.get('password'));
		// handle error case
		if (result instanceof Error) return alert('Oops! Something went wrong...');
		console.log(result);
		// dispatch user data to necesasry app state
		dispatch({ type: 'LOGIN' });
	};

	return (
		<ThemeProvider theme={theme}>
			<Container component='main' maxWidth='xs'>
				<CssBaseline />
				<Box
					sx={{
						marginTop: 8,
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
					}}
				>
					<Typography component='h1' variant='h5'>
						Sign up
					</Typography>
					<Box
						component='form'
						noValidate
						onSubmit={handleSubmit}
						sx={{
							display: 'flex',
							mt: 2,
							alignItems: 'center',
							flexDirection: 'column',
							margin: 'auto',
							justifyContent: 'center',
							position: 'static',
							padding: '0 3rem',
						}}
					>
						<Grid container spacing={2}>
							<Grid item xs={12} sm={6}>
								<TextField
									autoComplete='given-name'
									name='firstName'
									required
									fullWidth
									id='firstName'
									label='First Name'
									autoFocus
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<TextField
									required
									fullWidth
									id='lastName'
									label='Last Name'
									name='lastName'
									autoComplete='family-name'
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									required
									fullWidth
									id='email'
									label='Email Address'
									name='email'
									autoComplete='email'
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									required
									fullWidth
									name='password'
									label='Password'
									type='password'
									id='password'
									autoComplete='new-password'
								/>
							</Grid>
						</Grid>
						<Button
							type='submit'
							fullWidth
							variant='contained'
							sx={{ mt: 3, mb: 2 }}
						>
							Sign Up
						</Button>
						<Grid
							container
							sx={{
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'center',
							}}
						>
							<Grid item>
								<Link href='#' variant='body2'>
									Already have an account? Sign in
								</Link>
							</Grid>
						</Grid>
					</Box>
				</Box>
			</Container>
		</ThemeProvider>
	);
}
