import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getProfile } from "../redux/profileApi";
import { loginFail, loginRequest, loginSuccess } from "../redux/userRedux";

const Container = styled.form`
	display: flex;
	flex-direction: column;
`;

const Input = styled.input`
	margin: 8px 0;
	padding: 8px;
	background-color: transparent;
	outline: none;
	border-radius: 3px;
	border: 1px solid ${({ theme }) => theme.textSoft};
	color: ${({ theme }) => theme.text};
`;

const Button = styled.button`
	background-color: transparent;
	border: none;
	padding: 8px;
	align-self: center;
	background-color: ${({ theme }) => theme.bgLighter};
	color: ${({ theme }) => theme.text};
	cursor: pointer;
`;

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const handleLogin = async (e) => {
		e.preventDefault();
		dispatch(loginRequest());
		try {
			const res = await axios.post("/auth/login", { email, password });
			dispatch(loginSuccess(res.data));
			dispatch(getProfile());
			res.status === 200 && navigate("/");
		} catch (err) {
			dispatch(loginFail());
		}
	};

	return (
		<Container onSubmit={handleLogin}>
			<Input
				type="email"
				placeholder="email"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
				required
			/>
			<Input
				type="password"
				placeholder="password"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
				required
			/>
			<Button type="submit">Sign in</Button>
		</Container>
	);
};

export default Login;
