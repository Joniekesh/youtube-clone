import styled from "styled-components";
import HomeIcon from "@mui/icons-material/Home";
import ExploreIcon from "@mui/icons-material/Explore";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import RestoreIcon from "@mui/icons-material/Restore";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import SportsBasketballIcon from "@mui/icons-material/SportsBasketball";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import MovieCreationIcon from "@mui/icons-material/MovieCreation";
import ArticleIcon from "@mui/icons-material/Article";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import SettingsIcon from "@mui/icons-material/Settings";
import FlagOutlinedIcon from "@mui/icons-material/FlagOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import SettingsBrightnessOutlinedIcon from "@mui/icons-material/SettingsBrightnessOutlined";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
import YoutubeLogo from "../images/logo.png";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { responsive768 } from "../responsive";
import { toast } from "react-toastify";

const Container = styled.div`
	flex: 1;
	background-color: ${({ theme }) => theme.bgLighter};
	color: ${({ theme }) => theme.text};
	height: 100vh;
	font-size: 12px;
	position: sticky;
	top: 0;
	${responsive768({
		width: "40px",
	})}
`;

const Wrapper = styled.div`
	padding: 8px;
`;

const MenuTop = styled.div`
	display: flex;
	align-items: center;
	gap: 5px;
`;

const Logo = styled.div`
	display: flex;
	align-items: center;
	font-weight: bold;
	font-size: 20px;
	cursor: pointer;
`;

const Image = styled.img`
	width: 24px;
	height: 20px;
	border-radius: 3px;
`;

const TopLogoTitle = styled.h4`
	${responsive768({
		display: "none",
	})}
`;

const MenuItem = styled.div`
	display: flex;
	align-items: center;
	gap: 4px;
	padding: 6px;

	cursor: pointer;
	&:hover {
		background-color: ${({ theme }) => theme.soft};
	}
`;

const ButtonDiv = styled.div`
	display: flex;
	flex-direction: column;
	padding: 8px;
	${responsive768({
		display: "none",
	})}
`;

const Desc = styled.span`
	font-size: 10px;
`;

const Button = styled.button`
	display: flex;
	align-items: center;
	border: 1px solid teal;
	margin-top: 3px;
	padding: 2px 5px;
	color: teal;
	height: max-content;
	width: 90px;
	cursor: pointer;
`;

const Hr = styled.hr`
	margin: 8px 0;
	border: 0.5px solid ${({ theme }) => theme.soft};
	opacity: 0.5;
`;

const Title = styled.span`
	margin-left: 8px;
	${responsive768({
		display: "none",
	})}
`;

const LogoTitle = styled.h2`
	font-size: 14px;
	font-weight: 500;
	color: #aaaaaa;
	margin-bottom: 20px;
	${responsive768({
		display: "none",
	})}
`;

const Menu = ({ lightMode, setLightMode, setMenuOpen }) => {
	const { currentUser } = useSelector((state) => state.user);
	const TOKEN = currentUser?.token;
	const isAuthenticated = currentUser?.token;

	const handleClick = () => {
		if (!TOKEN) {
			toast.error("Please sign in to view your subscriptios.", {
				theme: "colored",
			});
		}
	};

	return (
		<Container>
			<Wrapper>
				<MenuTop>
					<MenuIcon
						onClick={() => setMenuOpen(false)}
						style={{
							textDecoration: "none",
							color: "inherit",
							cursor: "pointer",
						}}
					/>

					<Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
						<Logo>
							<Image src={YoutubeLogo} alt="" />
							<TopLogoTitle>JonieTube</TopLogoTitle>
						</Logo>
					</Link>
				</MenuTop>
				<Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
					<MenuItem>
						<HomeIcon style={{ fontSize: "18px" }} />
						<Title>Home</Title>
					</MenuItem>
				</Link>
				<Link to="trends" style={{ textDecoration: "none", color: "inherit" }}>
					<MenuItem>
						<ExploreIcon style={{ fontSize: "18px" }} />
						<Title>Explore</Title>
					</MenuItem>
				</Link>
				<Link
					to="subscriptions"
					style={{ textDecoration: "none", color: "inherit" }}
					onClick={handleClick}
				>
					<MenuItem>
						<SubscriptionsIcon style={{ fontSize: "18px" }} />
						<Title>Subscriptions</Title>
					</MenuItem>
				</Link>
				<Hr />
				<MenuItem>
					<VideoLibraryIcon style={{ fontSize: "18px" }} />
					<Title>Library</Title>
				</MenuItem>
				<MenuItem>
					<RestoreIcon style={{ fontSize: "18px" }} />
					<Title>History</Title>
				</MenuItem>
				<Hr />
				{!isAuthenticated && (
					<ButtonDiv>
						<Desc>Sign in to like vides,comment and reply</Desc>
						<Link
							to="/signin"
							style={{ textDecoration: "none", color: "inherit" }}
						>
							<Button>
								<AccountCircleIcon />
								SIGN IN
							</Button>
						</Link>
					</ButtonDiv>
				)}
				<LogoTitle>BEST JONIETUBE</LogoTitle>
				<Hr />
				<MenuItem>
					<LibraryMusicIcon style={{ fontSize: "18px" }} />
					<Title>Music</Title>
				</MenuItem>
				<MenuItem>
					<SportsBasketballIcon style={{ fontSize: "18px" }} />
					<Title>Sports</Title>
				</MenuItem>
				<MenuItem>
					<SportsEsportsIcon style={{ fontSize: "18px" }} />
					<Title>Gaming</Title>
				</MenuItem>
				<MenuItem>
					<MovieCreationIcon style={{ fontSize: "18px" }} />
					<Title>Movies</Title>
				</MenuItem>
				<MenuItem>
					<ArticleIcon style={{ fontSize: "18px" }} />
					<Title>News</Title>
				</MenuItem>
				<MenuItem>
					<LiveTvIcon style={{ fontSize: "18px" }} />
					<Title>Life</Title>
				</MenuItem>
				<Hr />
				<MenuItem>
					<SettingsIcon style={{ fontSize: "18px" }} />
					<Title>Settings</Title>
				</MenuItem>
				<MenuItem>
					<FlagOutlinedIcon style={{ fontSize: "18px" }} />
					<Title>Report</Title>
				</MenuItem>
				<MenuItem>
					<HelpOutlineOutlinedIcon style={{ fontSize: "18px" }} />
					<Title>Help</Title>
				</MenuItem>
				<MenuItem onClick={() => setLightMode(!lightMode)}>
					<SettingsBrightnessOutlinedIcon style={{ fontSize: "18px" }} />
					<Title>{lightMode ? "Dark" : "Light"} Mode</Title>
				</MenuItem>
			</Wrapper>
		</Container>
	);
};

export default Menu;
