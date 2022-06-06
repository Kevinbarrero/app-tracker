import React from 'react';

import { Content, MainBlock } from './components';
import ResponsiveAppBar from '../Navbar';
export default function DefaultLayout({ children }) {
	return (
		<Content>
			<ResponsiveAppBar></ResponsiveAppBar>
			<MainBlock>{children}</MainBlock>
		</Content>
	);
}
