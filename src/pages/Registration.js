import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApolloClient } from '@apollo/client';

import useAuthUser from 'globals/AuthUser';
import signUp from 'api/mutations/signUp';

import emailValidator from 'validators/stringValidators/emailValidator';
import useSharedValidation from 'validators/useSharedValidation';
import getFirstError from 'validators/helpers/getFirstError';
import emptyValidator from 'validators/stringValidators/emptyValidator';
import latinNumbersValidator from 'validators/stringValidators/latinNumbersValidator';
import minLengthValidatorBuilder from 'validators/stringValidators/minLengthValidatorBuilder';
import maxLengthValidatorBuilder from 'validators/stringValidators/maxLengthValidatorBuilder';
import useRequiredFieldsFilled from 'validators/useRequiredFieldsFilled';
import useHandleChangeField from 'components/form/utils/useHandleChangeField';
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

const INITIAL_FORM_STATE = {
	email: '',
	firstName: '',
	lastName: '',
	password: ''
};

const VALIDATION_CONFIG = {
	email: (value) => getFirstError([emptyValidator, emailValidator], value),
	firstName: (value) =>
		getFirstError([emptyValidator, minLengthValidatorBuilder(2), maxLengthValidatorBuilder(10), latinNumbersValidator], value),
	lastName: (value) =>
		getFirstError([emptyValidator, minLengthValidatorBuilder(2), maxLengthValidatorBuilder(10), latinNumbersValidator], value),
	password: (value) => getFirstError([emptyValidator, minLengthValidatorBuilder(8)], value)
};

const theme = createTheme();

export default function SignUp() {
	const [formState, setFormState] = useState(INITIAL_FORM_STATE);
	const [errorsState, isHasClientError] = useSharedValidation(formState, VALIDATION_CONFIG);

	const isRequiredFieldFilled = useRequiredFieldsFilled(formState, Object.keys(INITIAL_FORM_STATE));

	const handleEvents = useHandleChangeField(setFormState);

	const { isLoading, user } = useAuthUser();
	const navigate = useNavigate();
	useEffect(() => {
		if (isLoading === false && user) {
			navigate('/', { replace: true });
		}
	}, [isLoading, user]);

	const client = useApolloClient();
	const [isSignUpLogin, setIsSignUpLoading] = useState(false);
	const [signUpError, setSignUpError] = useState();
	const handleRegister = async (event) => {
		event.preventDefault();
		if (!isHasClientError && isRequiredFieldFilled) {
			setIsSignUpLoading(false);
			try {
				await signUp(client, formState);
			} catch (error) {
				setSignUpError(error);
			} finally {
				setIsSignUpLoading(true);
			}
		}
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		console.log({
			email: data.get('email'),
			password: data.get('password')
		});
	};

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
						Sign up
					</Typography>
					<Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
						<Grid container spacing={2}>
							<Grid item xs={12} sm={6}>
								<TextField
									autoComplete="given-name"
									required
									fullWidth
									label="First Name"
									id={'firstName'}
									error={errorsState.firstName}
									value={formState.firstName}
									onChange={handleEvents}
									onBlur={handleEvents}
									autoFocus
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<TextField
									required
									fullWidth
									label="Last Name"
									name="lastName"
									id={'lastName'}
									error={errorsState.lastName}
									value={formState.lastName}
									onChange={handleEvents}
									onBlur={handleEvents}
									autoComplete="family-name"
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									required
									fullWidth
									label="Email Address"
									name="email"
									autoComplete="email"
									id={'email'}
									onChange={handleEvents}
									onBlur={handleEvents}
									value={formState.email}
									error={errorsState.email}
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									required
									fullWidth
									name="password"
									type="password"
									label={'Password'}
									id={'password'}
									onChange={handleEvents}
									onBlur={handleEvents}
									value={formState.password}
									error={errorsState.password}
									autoComplete="new-password"
								/>
							</Grid>
						</Grid>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							disabled={isSignUpLogin || isHasClientError || !isRequiredFieldFilled || isLoading}
							onClick={handleRegister}
							sx={{ mt: 3, mb: 2 }}
						>
							Sign Up
						</Button>
						<Grid container justifyContent="flex-end">
							<Grid item>
								<Link href="/login" variant="body2">
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
