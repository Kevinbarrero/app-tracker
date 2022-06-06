import styled, { css } from 'styled-components';
import Button from 'components/form/inputs/Button';

export const Wrapper = styled.div(
	() => css`
		display: flex;
		justify-content: space-between;
		align-items: center;

		padding: 10em;
		margin-bottom: 1em;
		border: 3px solid #6f6c9e;
		text-color: black;

		background-color: blue;
	`
);

export const CreateBlock = styled.div`
	margin-top: 2rem;
	border: 2px solid #22568a;
	padding: 1rem;
	background-color: white;
	display: flex;
	border-radius: 2rem;
	justify-content: center;
	align-items: center;
	margin-bottom: 3rem;
	margin-right: 1rem;
	margin-left: 1rem;
`;

export const Title = styled.div`
	color: black;
	margin-right: 1em;
	font-size: 20px;
	font-weight: 600;
`;

export const Form = styled.form`
	text-color: black;
	display: flex;
	align-items: center;

	> :nth-child(n):not(:last-child) {
		margin-right: 0.5em;
	}
`;

export const StyledButton = styled(Button)`
	height: 40px;
	border: none;
`;
