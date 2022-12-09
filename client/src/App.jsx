import styled from "styled-components";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "./utils/Theme";
import { useState } from "react";
import Menu from "./components/Menu";
import Home from "./pages/Home";
import Video from "./pages/Video";
import Navbar from "./components/Navbar";
import SignIn from "./pages/SignIn";
import Search from "./pages/Search";
import { useSelector } from "react-redux";
import Posts from "./pages/Posts";
import Post from "./pages/Post";
import UserModal from "./components/UserModal";
import { responsive768 } from "./responsive";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Container = styled.div`
	display: flex;
`;

const Main = styled.div`
	flex: 7;
	background-color: ${({ theme }) => theme.bg};
	overflow-y: scroll;
	::-webkit-scrollbar {
		width: 8px;
		background-color: teal;
	}
	/* ::-webkit-scrollbar-track {
		background-color: white;
	} */
`;

const Wrapper = styled.div`
	padding: 20px 50px;
	${responsive768({
		padding: "20px 10px",
	})}
`;

function App() {
	const [lightMode, setLightMode] = useState(false);
	const [openModal, setOpenModal] = useState(false);
	const [open, setOpen] = useState(false);
	const [menuOpen, setMenuOpen] = useState(true);

	const { currentUser } = useSelector((state) => state.user);
	const isAuthenticated = currentUser?.token;

	return (
		<ThemeProvider theme={lightMode ? lightTheme : darkTheme}>
			<Container>
				<Router>
					<ToastContainer />
					{menuOpen && (
						<Menu
							lightMode={lightMode}
							setLightMode={setLightMode}
							menuOpen={menuOpen}
							setMenuOpen={setMenuOpen}
						/>
					)}
					<Main>
						<Navbar
							lightMode={lightMode}
							setLightMode={setLightMode}
							setOpenModal={setOpenModal}
							open={open}
							setOpen={setOpen}
							menuOpen={menuOpen}
							setMenuOpen={setMenuOpen}
						/>
						{openModal && <UserModal setOpenModal={setOpenModal} />}
						<Wrapper>
							<Routes>
								<Route path="/">
									<Route index element={<Home type="random" />} />
									<Route path="trends" element={<Home type="trend" />} />
									<Route path="subscriptions" element={<Home type="sub" />} />
									<Route path="search" element={<Search />} />
									<Route
										path="signin"
										element={isAuthenticated ? <Home /> : <SignIn />}
									/>
									<Route path="video">
										<Route
											path=":id"
											element={<Video setOpen={setOpen} open={open} />}
										/>
									</Route>
								</Route>
								<Route path="post/:id" element={<Post />}></Route>
								<Route path="post" element={<Posts />}></Route>
							</Routes>
						</Wrapper>
					</Main>
				</Router>
			</Container>
		</ThemeProvider>
	);
}

export default App;
