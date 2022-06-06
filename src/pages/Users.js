import { useQuery } from '@apollo/client';
import { USERS } from '../api/query/GetAllUsers';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DefaultLayout from 'components/Layouts/DefaultLayout/DefaultLayout';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
	[`&.${tableCellClasses.head}`]: {
		color: theme.palette.common.black
	},
	[`&.${tableCellClasses.body}`]: {
		fontSize: 14
	}
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
	'&:nth-of-type(odd)': {
		backgroundColor: theme.palette.action.focus
	},
	'&:last-child td, &:last-child th': {
		border: 0
	}
}));
export default function UsersPage() {
	const { data } = useQuery(USERS);
	return (
		<DefaultLayout>
			<TableContainer
				component={Paper}
				style={{ backgroundColor: 'white', color: 'blue' }}
				sx={{
					backdropFilter: 'blur(200px)'
				}}
			>
				<Table aria-label="simple table">
					<TableHead>
						<TableRow>
							<StyledTableCell>Email</StyledTableCell>
							<StyledTableCell align="right">FistName</StyledTableCell>
							<StyledTableCell align="right">LastName</StyledTableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{data?.users?.map((user) => (
							<StyledTableRow key={user.email}>
								<StyledTableCell component="th" scope="row">
									{user.email}
								</StyledTableCell>
								<StyledTableCell align="right">{user.firstName}</StyledTableCell>
								<StyledTableCell align="right">{user.lastName}</StyledTableCell>
							</StyledTableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</DefaultLayout>
	);
}
