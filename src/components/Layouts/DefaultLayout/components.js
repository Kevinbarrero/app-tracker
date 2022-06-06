import styled from 'styled-components';
import img from './backgroud.jpg';
export const Header = styled.header`
	position: sticky;
	display: flex;
	justify-content: space-between;
	padding: 1.5em;

	// background-color: white;
	background-image: url(${img});
`;

export const HeaderTitle = styled.h1`
	font-size: 1.5em;
	color: white;
	background-image: url(${img});
`;

export const AppName = styled.div`
	font-size: 1.5em;
	color: white;
`;

export const Content = styled.main`
	background-image: url(${img});
	height: 100%;
	background-position: center;
	background-repeat: no-repeat;
	background-size: cover;
`;

export const MainBlock = styled.main`
	background-image: url(${img});
`;
