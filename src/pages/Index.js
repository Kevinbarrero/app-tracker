import React, { /* useState, */ useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import useAuthUser from 'globals/AuthUser';
import useCreateProject from 'hooks/mutations/useCreateProject';
import useRemoveProject from 'hooks/mutations/useRemoveProject';
import useUpdateProject from 'hooks/mutations/useUpdateProject';

import DefaultLayout from 'components/Layouts/DefaultLayout/DefaultLayout';
import EntityListWrapper from 'components/entity/EntityListWrapper/EntityListWrapper';
import CreateEntityBlock from 'components/entity/CreateEntityBlock';
import OutlinedCard from '../components/entity/OutlinedCard';
export default function Index() {
	const { user, isLoading } = useAuthUser();
	const navigate = useNavigate();

	const { create } = useCreateProject();
	const { remove } = useRemoveProject();
	const { update } = useUpdateProject();

	useEffect(() => {
		if (isLoading === false && !user) {
			navigate('/login');
		}
	}, [user, isLoading]);

	return (
		<DefaultLayout title="Task Tracker">
			<CreateEntityBlock entity="project" createRequest={create} />
			<EntityListWrapper>
				{user?.projects?.map(({ id, name, description }) => (
					<OutlinedCard
						key={id}
						id={id}
						title="Project"
						name={name}
						description={description}
						onRemoveClick={remove}
						onUpdateClick={update}
					/>
				))}
			</EntityListWrapper>
		</DefaultLayout>
	);
}
