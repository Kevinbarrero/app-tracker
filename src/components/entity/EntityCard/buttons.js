import * as React from 'react';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';
export const ButtonInEditMode = ({ onAcceptClick, onDiscardClick, isDisableAccept }) => (
	<>
		<Button
			variant="contained"
			endIcon={<SaveIcon />}
			disabled={isDisableAccept}
			onClick={(event) => {
				onAcceptClick(event);
			}}
		>
			Save
		</Button>

		<Button variant="outlined" startIcon={<CancelPresentationIcon />} onClick={onDiscardClick}>
			Cancel
		</Button>
	</>
);

export const ButtonInShowMode = ({ editClick, removeClick }) => (
	<>
		<Button variant="contained" endIcon={<EditIcon />} onClick={editClick}>
			Edit
		</Button>
		<Button variant="outlined" startIcon={<DeleteIcon />} onClick={removeClick}>
			Delete
		</Button>
	</>
);
