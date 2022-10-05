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
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { createUser } from '../../utils/SignUpServices';
import { Navigate, useNavigate } from 'react-router-dom';
import listyLogoBlack from '../../assets/listyLogoBlack.svg';

const theme = createTheme();

export default function SignUpPage() {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		const result = await createUser(data.get('email'), data.get('password'));
		if (result instanceof Error) return alert('Problem with sign up.');
		dispatch({ type: 'LOGIN', payload: result._id });
		navigate('/mainfeed');
	};

	return (
		<ThemeProvider theme={theme}>
			<Container
				component='main'
				maxWidth='xs'
				className='flex flex-col  h-[50vh] m-auto shadow-2xl'
			>
				<CssBaseline />
				<div className='flex justify-center'>
					<img
						className='black-listy-nav-logo  h-[10vh]'
						src={listyLogoBlack}
					/>
				</div>
				<Box
					sx={{
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
							sx={{ mt: 3, mb: 2, backgroundColor: '#6b9080' }}
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
								<Link href='/login' variant='body2' sx={{ color: '#6b9080' }}>
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
