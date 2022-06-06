import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApolloClient } from '@apollo/client';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import useAuthUser from 'globals/AuthUser';
import signIn from 'api/mutations/signIn';
import useHandleChangeField from 'components/form/utils/useHandleChangeField';
import emailValidator from 'validators/stringValidators/emailValidator';
import useSharedValidation from 'validators/useSharedValidation';
import getFirstError from 'validators/helpers/getFirstError';
import emptyValidator from 'validators/stringValidators/emptyValidator';
import minLengthValidatorBuilder from 'validators/stringValidators/minLengthValidatorBuilder';
import useRequiredFieldsFilled from 'validators/useRequiredFieldsFilled';

const INITIAL_FORM_STATE = { login: '', password: '' };
const VALIDATION_CONFIG = {
	login: (value) => getFirstError([emptyValidator, emailValidator], value),
	password: (value) => getFirstError([emptyValidator, minLengthValidatorBuilder(8)], value)
};

const theme = createTheme();

export default function Login() {
	const [formState, setFormState] = useState(INITIAL_FORM_STATE);
	const [errorsState] = useSharedValidation(formState, VALIDATION_CONFIG);

	const isRequiredFieldFilled = useRequiredFieldsFilled(formState, Object.keys(INITIAL_FORM_STATE));

	const handleEvents = useHandleChangeField(setFormState);

	const { user, isLoading } = useAuthUser();
	const client = useApolloClient();

	const [isSignInLoading, setIsSignInLoading] = useState(false);
	const [setSignInError] = useState();
	const handleSignIn = async (event) => {
		event.preventDefault();
		if (isRequiredFieldFilled) {
			setIsSignInLoading(true);
			try {
				await signIn(client, formState);
			} catch (error) {
				setSignInError(error);
			} finally {
				setIsSignInLoading(false);
			}
		}
	};

	const navigate = useNavigate();
	useEffect(() => {
		if (isLoading === false && user) {
			navigate('/', { replace: true });
		}
	}, [isLoading, user]);

	return (
		<ThemeProvider theme={theme}>
			<Container component="main" maxWidth="xs">
				<CssBaseline />
				<Box
					sx={{
						marginTop: 8,
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center'
					}}
				>
					<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component="h1" variant="h5">
						Sign in
					</Typography>
					<Box component="form" noValidate sx={{ mt: 1 }}>
						<TextField
							margin="normal"
							value={formState.login}
							onChange={handleEvents}
							error={errorsState.login}
							required
							fullWidth
							id="login"
							label="Email Address"
							name="email"
							autoComplete="email"
							autoFocus
						/>
						<TextField
							margin="normal"
							value={formState.password}
							error={errorsState.password}
							onChange={handleEvents}
							onBlur={handleEvents}
							required
							fullWidth
							name="password"
							label="Password"
							type="password"
							id="password"
							autoComplete="current-password"
						/>

						<Button
							type="submit"
							disabled={isSignInLoading || !isRequiredFieldFilled || isLoading}
							onClick={handleSignIn}
							fullWidth
							variant="contained"
							sx={{ mt: 3, mb: 2 }}
						>
							Sign In
						</Button>
						<Grid container>
							<Grid item>
								<Link href="/registration" variant="body2">
									{"Don't have an account? Sign Up"}
								</Link>
							</Grid>
						</Grid>
					</Box>
				</Box>
			</Container>
		</ThemeProvider>
	);
}
