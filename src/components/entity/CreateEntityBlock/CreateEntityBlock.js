import React, { useState } from 'react';

import useHandleChangeField from 'components/form/utils/useHandleChangeField';
import FormError from 'components/form/FormError';
import TextField from '@mui/material/TextField';
import { CreateBlock, Title, Form, StyledButton } from './components';
import AddIcon from '@mui/icons-material/Add';
const INITIAL_FORM_STATE = { name: '', description: '' };

export default function CreateEntityBlock({ entity, createRequest, error }) {
	const [formState, setFormState] = useState(INITIAL_FORM_STATE);
	const handleEvents = useHandleChangeField(setFormState);

	const handleCreateClick = async (event) => {
		event.preventDefault();

		await createRequest(formState.name, formState.description);
		setFormState(INITIAL_FORM_STATE);
	};

	return (
		<div>
			<CreateBlock>
				{error && <FormError>{error.message}</FormError>}
				<Title>{`Create new ${entity}:`}</Title>
				<Form>
					<TextField id="name" label="Name" value={formState.name} onChange={handleEvents} onBlur={handleEvents} required />
					<TextField id="description" label="Description" value={formState.description} onChange={handleEvents} onBlur={handleEvents} />
					<StyledButton type="submit" onClick={(event) => handleCreateClick(event)} disabled={formState.name.trim() === ''}>
						New<AddIcon></AddIcon>
					</StyledButton>
				</Form>
			</CreateBlock>
		</div>
	);
}
