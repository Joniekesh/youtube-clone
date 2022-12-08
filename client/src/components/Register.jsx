import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getProfile } from "../redux/profileApi";
import {
	registerFail,
	registerRequest,
	registerSuccess,
} from "../redux/userRedux";

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

const Register = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const handleRegister = async (e) => {
		e.preventDefault();

		if (password !== confirmPassword) {
			alert("Passwords do not match");
		} else {
			dispatch(registerRequest());
			try {
				const res = await axios.post("/auth", { name, email, password });
				dispatch(registerSuccess(res.data));
				dispatch(getProfile());
				res.status === 201 && navigate("/");
			} catch (err) {
				dispatch(registerFail());
			}
		}
	};

	return (
		<Container onSubmit={handleRegister}>
			<Input
				type="text"
				placeholder="Full name"
				value={name}
				onChange={(e) => setName(e.target.value)}
				required
			/>
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
			<Input
				type="password"
				placeholder="confirmPassword"
				value={confirmPassword}
				onChange={(e) => setConfirmPassword(e.target.value)}
			/>
			<Button type="submit">Sign up</Button>
		</Container>
	);
};

export default Register;