import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Container from '@mui/material/Container';
import { useAppDispatch } from '../../redux/hooks';
import { useNavigate } from 'react-router-dom';
import { verifyUser } from '../../utils/LoginServices';
import jwt_decode from 'jwt-decode';
import listyLogoBlack from '../../assets/listyLogoBlack.svg';

const theme = createTheme();

export default function LoginPage() {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const data = new FormData(event.currentTarget);

		const result = await verifyUser(data.get('email'), data.get('password'));
		if (result instanceof Error) return alert('Problem with log in.');
		// Result should be a jwt string, which we can decode to get the user ID
		const decoded: { expiresAt: number; userId: string; iat: number } =
			jwt_decode(result);
		// Update the state to include the JWT and set a cookie
		dispatch({ type: 'LOGIN', payload: decoded.userId });
		navigate('/mainfeed');
	};

	return (
		<ThemeProvider theme={theme}>
			<Container
				component='main'
				maxWidth='xs'
				className='flex-col h-[60vh] m-auto shadow-2xl'
			>
				<CssBaseline />
				<div className='flex flex-col items-center justify-evenly h-full py-4'>
					<img
						className='black-listy-nav-logo  h-1/5'
						src={listyLogoBlack}
					/>
				
					<Box
						sx={{
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
							
						}}
					>
						<Typography component='h3' variant='h6'>
							Sign in
						</Typography>
					</Box>
					<Box
						component='form'
						sx={{
							display: 'flex',
							alignItems: 'center',
							flexDirection: 'column',
							justifyContent: 'center',
							position: 'static',
							padding: '0 3rem',
						}}
						onSubmit={handleSubmit}
						noValidate
					>
						<TextField
							margin='dense'
							required
							fullWidth
							id='email'
							label='Email Address'
							name='email'
							autoComplete='email'
							autoFocus
							data-testid='input-text'
						/>
						<TextField
							margin='dense'
							required
							fullWidth
							name='password'
							label='Password'
							type='password'
							id='password'
							autoComplete='current-password'
							data-testid='input-text'
						/>
						<FormControlLabel
							control={<Checkbox value='remember' color='primary' />}
							label='Remember me'
						/>
						<Button
							type='submit'
							fullWidth
							variant='contained'
							sx={{ mt: 1, mb: 2, backgroundColor: '#6b9080' }}
						>
							Sign In
						</Button>
						<Grid
							container
							sx={{
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'center',
							}}
						>
							<Grid item xs></Grid>
							<Grid item>
								<Link href='/register' variant='body2' sx={{ color: '#6b9080' }}>
									{"Don't have an account? Sign Up"}
								</Link>
							</Grid>
						</Grid>
					</Box>
				</div>
				{/* </Box> */}
			</Container>
		</ThemeProvider>
	);
}
