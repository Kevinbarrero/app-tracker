import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { ButtonInShowMode, ButtonInEditMode } from './EntityCard/buttons';
import React, { useState } from 'react';
import TextField from '@mui/material/TextField';

export default function OutlinedCard({ title, name, id, description, onRemoveClick, onUpdateClick }) {
	const INITIAL_FORM_STATE = { name, description };

	const [isEditMode, setIsEditMode] = useState(false);
	const [formState, setFormState] = useState(INITIAL_FORM_STATE);

	const handleEvent = (event, formFieldName) => {
		const { value } = event.target;
		const { type } = event;

		setFormState((currentState) => ({
			...currentState,
			[formFieldName]: type === 'blur' ? value.trim() : value
		}));
	};

	const handleUpdate = async (event) => {
		event.preventDefault();

		await onUpdateClick(id, formState.name, formState.description);
	};

	const acceptClick = (event) => {
		setIsEditMode(false);
		handleUpdate(event);
	};

	const discardClick = () => {
		setIsEditMode(false);
		setFormState(INITIAL_FORM_STATE);
	};

	const editClick = () => {
		setIsEditMode(true);
	};

	const removeClick = () => {
		onRemoveClick(id);
	};

	return (
		<Box>
			<Card>
				<React.Fragment>
					<CardContent>
						{isEditMode ? (
							<ButtonInEditMode onAcceptClick={acceptClick} onDiscardClick={discardClick} isDisableAccept={formState.name.trim() === ''} />
						) : (
							<ButtonInShowMode editClick={editClick} removeClick={removeClick} />
						)}
						<Typography gutterBottom variant="h6" component="div">
							{title}
						</Typography>

						<TextField
							id={`name-for-${id}-${title.toLowerCase()}`}
							label={isEditMode ? 'Name*' : 'Name'}
							value={formState.name}
							disabled={!isEditMode}
							onChange={(event) => handleEvent(event, 'name')}
							onBlur={(event) => handleEvent(event, 'name')}
							required
						/>
						<TextField
							id={`description-for-${id}-${title.toLowerCase()}`}
							label="Description"
							value={formState.description}
							disabled={!isEditMode}
							onChange={(event) => handleEvent(event, 'description')}
							onBlur={(event) => handleEvent(event, 'description')}
						/>
					</CardContent>
				</React.Fragment>
			</Card>
		</Box>
	);
}
