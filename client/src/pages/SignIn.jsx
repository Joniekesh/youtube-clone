import styled from "styled-components";
import Login from "../components/Login";
import Register from "../components/Register";

const Container = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	height: 100vh;
`;

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	border: 1px solid #ddd;
	padding: 20px;
`;
const Texts = styled.div`
	text-align: center;
`;

const TextLarge = styled.h3`
	color: ${({ theme }) => theme.text};
`;

const TextSmall = styled.span`
	font-size: 14px;
	color: ${({ theme }) => theme.text};
`;

const Or = styled.span`
	text-align: center;
	color: ${({ theme }) => theme.text};
`;

const SignIn = () => {
	return (
		<Container>
			<Wrapper>
				<Texts>
					<TextLarge>Sign in</TextLarge>
					<TextSmall>to continue to JonieTube</TextSmall>
				</Texts>
				<Login />
				<Or>or</Or>
				<Register />
			</Wrapper>
		</Container>
	);
};

export default SignIn;
