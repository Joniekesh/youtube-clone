import styled from "styled-components";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	getStorage,
	ref,
	uploadBytesResumable,
	getDownloadURL,
} from "firebase/storage";
import { app } from "../firebase";
import { useEffect } from "react";
import {
	resetProfile,
	updateProfileFail,
	updateProfileRequest,
	updateProfileSuccess,
} from "../redux/profileRedux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/userRedux";
import { responsive483 } from "../responsive";
import makeRequest from "../utils/makeRequest";

const Container = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100vh;
	background-color: #000000a7;
	display: flex;
	align-items: center;
	justify-content: center;
`;

const Main = styled.div`
	position: relative;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	margin: auto;
	width: 50%;
	height: 500px;
	background-color: ${({ theme }) => theme.bgLighter};
	color: ${({ theme }) => theme.text};
	border-radius: 8px;
	padding: 10px;
	z-index: 99999;
	${responsive483({
		width: "90%",
	})}
`;

const Cancel = styled.span`
	position: absolute;
	top: 10px;
	right: 10px;
	cursor: pointer;
	color: ${({ theme }) => theme.text};
`;

const Title = styled.h2`
	margin-bottom: 10px;
	color: ${({ theme }) => theme.text};
`;

const Form = styled.form`
	display: flex;
	flex-direction: column;
	gap: 30px;
`;

const InputGroup = styled.div`
	display: flex;
	flex-direction: column;
	gap: 5px;
`;

const Label = styled.label`
	font-weight: 500;
`;

const Input = styled.input`
	width: 100%;
	padding: 6px;
	border: 1px solid ${({ theme }) => theme.soft};
	color: ${({ theme }) => theme.text};
	background-color: transparent;
`;

const Button = styled.button`
	border: none;
	padding: 6px;
	cursor: pointer;
	background-color: ${({ theme }) => theme.soft};
	color: ${({ theme }) => theme.textSoft};
`;

const Logout = styled.button`
	margin-top: 10px;
	border: none;
	padding: 6px;
	cursor: pointer;
	background-color: crimson;
	font-weight: bold;
	border-radius: 5px;
	color: ${({ theme }) => theme.textSoft};
`;

const UserModal = ({ setOpenModal }) => {
	const { currentProfile } = useSelector((state) => state.profile);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [inputs, setInputs] = useState({
		name: currentProfile?.name,
		email: currentProfile?.email,
		password: currentProfile?.password,
	});
	const [img, setImg] = useState("");
	const [imgPerc, setImgPerc] = useState(0);

	const { currentUser } = useSelector((state) => state.user);
	const TOKEN = currentUser?.token;

	const handleChange = (e) => {
		setInputs((prev) => {
			return { ...prev, [e.target.name]: e.target.value };
		});
	};

	const uploadFile = (file, urlType) => {
		const storage = getStorage(app);
		const fileName = new Date().getTime() + file.name;
		const storageRef = ref(storage, fileName);

		const uploadTask = uploadBytesResumable(storageRef, file);

		uploadTask.on(
			"state_changed",
			(snapshot) => {
				const progress =
					(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
				urlType === "imgUrl" && setImgPerc(Math.round(progress));
				switch (snapshot.state) {
					case "paused":
						console.log("Upload is paused");
						break;
					case "running":
						console.log("Upload is running");
						break;
					default:
						break;
				}
			},
			(error) => {
				if (error) {
					toast.error("Error with photo upload.", { theme: "colored" });
				}
			},
			() => {
				getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
					setInputs((prev) => {
						return {
							...prev,
							img: downloadURL,
						};
					});
				});
			}
		);
	};

	useEffect(() => {
		img && uploadFile(img, "imgUrl");
	}, [img]);

	const submitHandler = async (e) => {
		e.preventDefault();

		const config = {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${TOKEN}`,
			},
		};
		dispatch(updateProfileRequest());
		try {
			const res = await makeRequest.put("/users/me", { ...inputs }, config);
			dispatch(updateProfileSuccess(res.data));
			if (res.status === 200) {
				setOpenModal(false);
				toast.success("Profile Updated.", { theme: "colored" });
			}
		} catch (error) {
			console.log(error);
			dispatch(updateProfileFail());
			toast.error("Error updating profile.", { theme: "colored" });
		}
	};

	const handleLogout = () => {
		dispatch(logout());
		dispatch(resetProfile());
		navigate("/");
		setOpenModal(false);
	};

	return (
		<Container>
			<Main>
				<Cancel onClick={() => setOpenModal(false)}>
					<CancelOutlinedIcon />
				</Cancel>
				<Title>Update Your Profile</Title>
				<Form onSubmit={submitHandler}>
					<InputGroup>
						<Label htmlFor="imgUpload">Image:</Label>
						{imgPerc > 0 ? (
							"Uploading:" + imgPerc + "%"
						) : (
							<Input
								type="file"
								id="imgUpload"
								onChange={(e) => setImg(e.target.files[0])}
							/>
						)}
					</InputGroup>
					<InputGroup>
						<Label>Full Name</Label>
						<Input
							type="text"
							name="name"
							value={inputs.name}
							onChange={handleChange}
						/>
					</InputGroup>
					<InputGroup>
						<Label>Email</Label>
						<Input
							type="email"
							name="email"
							value={inputs.email}
							onChange={handleChange}
						/>
					</InputGroup>
					<InputGroup>
						<Label>Password</Label>
						<Input type="password" name="password" onChange={handleChange} />
					</InputGroup>
					<Button type="submit">Update</Button>
				</Form>
				<Logout onClick={handleLogout}>Logout</Logout>
			</Main>
		</Container>
	);
};

export default UserModal;
