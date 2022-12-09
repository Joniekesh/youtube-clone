import styled from "styled-components";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ModeNightOutlinedIcon from "@mui/icons-material/ModeNightOutlined";
import VideoCallOutlinedIcon from "@mui/icons-material/VideoCallOutlined";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/userRedux";
import { useState } from "react";
import UploadVideo from "./UploadVideo";
import { resetProfile } from "../redux/profileRedux";
import MenuIcon from "@mui/icons-material/Menu";
import LightModeIcon from "@mui/icons-material/LightMode";
import { responsive768, responsive615, responsive483 } from "../responsive";

const Container = styled.div`
	background-color: ${({ theme }) => theme.bgLighter};
	display: flex;
	align-items: center;
	padding: 10px 20px;
	width: 100%;
	position: sticky;
	top: 0;
	height: 50px;
`;

const Div = styled.div`
	display: flex;
	justify-content: space-between;
	width: 100%;
`;

const Hamburger = styled.div`
	color: ${({ theme }) => theme.text};
	cursor: pointer;
	margin-right: 10px;
`;

const InputContainer = styled.div`
	display: flex;
	align-items: center;
	border: 1px solid #ddd;
	font-size: 14px;
	padding: 0 3px;
	width: 50%;
	color: ${({ theme }) => theme.text};
`;

const Input = styled.input`
	border: none;
	width: 100%;
	background-color: transparent;
	outline: none;
	color: ${({ theme }) => theme.text};
`;

const Theme = styled.span`
	color: ${({ theme }) => theme.text};
	cursor: pointer;
	display: flex;
	align-items: center;
	font-size: 14px;
`;

const Mode = styled.span`
	${responsive768({
		display: "none",
	})}
`;

const Icon = styled.span`
	display: flex;
	align-items: center;
`;

const Button = styled.button`
	display: flex;
	align-items: center;
	font-size: 14px;
	border: 1px solid teal;
	padding: 2px 5px;
	color: teal;
	height: max-content;
	cursor: pointer;
`;

const UserDiv = styled.div`
	display: flex;
	align-items: center;
	gap: 10px;
`;

const User = styled.div`
	display: flex;
	align-items: center;
	font-weight: 500;
	gap: 10px;
	color: ${({ theme }) => theme.text};
`;

const UserInfo = styled.div`
	display: flex;
	align-items: center;
	gap: 4px;
	cursor: pointer;
`;

const Avatar = styled.img`
	width: 30px;
	height: 30px;
	border-radius: 50%;
	object-fit: cover;
`;

const Uname = styled.span`
	${responsive483({
		display: "none",
	})}
`;

const Logout = styled.p`
	font-size: 14px;
	color: crimson;
	font-weight: 500;
	cursor: pointer;
	${responsive615({
		display: "none",
	})}
`;

const Navbar = ({
	lightMode,
	setLightMode,
	setOpenModal,
	open,
	setOpen,
	menuOpen,
	setMenuOpen,
}) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [q, setQ] = useState("");

	const { currentProfile } = useSelector((state) => state.profile);

	const { currentUser } = useSelector((state) => state.user);
	const isAuthenticated = currentUser?.token;

	const handleLogout = () => {
		dispatch(logout());
		dispatch(resetProfile());
		navigate("/");
	};

	const handleNavigate = () => {
		q.length > 0 && navigate(`/search?q=${q}`);
	};

	return (
		<>
			<Container>
				<Div>
					{!menuOpen && (
						<Hamburger onClick={() => setMenuOpen(!menuOpen)}>
							<MenuIcon />
						</Hamburger>
					)}
					<InputContainer>
						<Input
							type="text"
							placeholder="Search"
							onChange={(e) => setQ(e.target.value)}
						/>
						<Icon>
							<SearchIcon
								onClick={handleNavigate}
								style={{ cursor: "pointer" }}
							/>
						</Icon>
					</InputContainer>
					<Theme onClick={() => setLightMode(!lightMode)}>
						{lightMode ? <ModeNightOutlinedIcon /> : <LightModeIcon />}
						<Mode>{lightMode ? "Dark" : "Light"} Mode</Mode>
					</Theme>
					{isAuthenticated ? (
						<UserDiv>
							<User>
								<VideoCallOutlinedIcon
									onClick={() => setOpen(true)}
									style={{ cursor: "pointer" }}
								/>
								<UserInfo onClick={() => setOpenModal(true)}>
									<Avatar src={currentProfile?.img} alt="" />
									<Uname>{currentProfile?.name}</Uname>
								</UserInfo>
							</User>
							<Logout onClick={handleLogout}>LOGOUT</Logout>
						</UserDiv>
					) : (
						<Link
							to="/signin"
							style={{ textDecoration: "none", color: "inherit" }}
						>
							<Button>
								<AccountCircleIcon />
								SIGN IN
							</Button>
						</Link>
					)}
				</Div>
			</Container>
			{open && <UploadVideo setOpen={setOpen} />}
		</>
	);
};

export default Navbar;
