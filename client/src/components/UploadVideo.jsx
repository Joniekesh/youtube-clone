import styled from "styled-components";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { useState, useEffect } from "react";
import {
	getStorage,
	ref,
	uploadBytesResumable,
	getDownloadURL,
} from "firebase/storage";
import { app } from "../firebase";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateVideo } from "../redux/videoApi";
import { toast } from "react-toastify";
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

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	gap: 20px;
	background-color: white;
	padding: 20px;
	position: relative;
	height: 600px;
	width: 600px;
	background-color: ${({ theme }) => theme.bgLighter};
	color: ${({ theme }) => theme.text};
	z-index: 999;
	border-radius: 10px;
`;

const Icon = styled.span`
	position: absolute;
	right: 10px;
	top: 10px;
	cursor: pointer;
`;

const Title = styled.h2`
	text-align: center;
`;

const Label = styled.label`
	font-size: 14px;
`;

const Input = styled.input`
	border: 1px solid ${({ theme }) => theme.soft};
	color: ${({ theme }) => theme.text};
	border-radius: 3px;
	padding: 10px;
	background-color: transparent;
	z-index: 999;
`;
const TextArea = styled.textarea`
	border: 1px solid ${({ theme }) => theme.soft};
	color: ${({ theme }) => theme.text};
	border-radius: 3px;
	padding: 10px;
	background-color: transparent;
`;

const Button = styled.button`
	border-radius: 3px;
	border: none;
	padding: 10px 20px;
	font-weight: 500;
	cursor: pointer;
	background-color: ${({ theme }) => theme.soft};
	color: ${({ theme }) => theme.textSoft};
`;

const UploadVideo = ({ setOpen, isUpdate, setIsUpdate, currentVideo }) => {
	const [video, setVideo] = useState(undefined);
	const [img, setImg] = useState(undefined);
	const [videoPerc, setVideoPerc] = useState(0);
	const [imgPerc, setImgPerc] = useState(0);
	const [inputs, setInputs] = useState({});
	const [tags, setTags] = useState([]);

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const { currentUser } = useSelector((state) => state.user);
	const TOKEN = currentUser?.token;

	const { error } = useSelector((state) => state.video);

	const handleChange = (e) => {
		setInputs((prev) => {
			return { ...prev, [e.target.name]: e.target.value };
		});
	};

	const handleTags = (e) => {
		setTags(e.target.value.split(","));
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
				urlType === "imgUrl"
					? setImgPerc(Math.round(progress))
					: setVideoPerc(Math.round(progress));
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
					toast.error("Error with data upload", { theme: "colored" });
				}
			},
			() => {
				getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
					setInputs((prev) => {
						return {
							...prev,
							[urlType]: downloadURL,
						};
					});
				});
			}
		);
	};

	useEffect(() => {
		video && uploadFile(video, "videoUrl");
	}, [video]);

	useEffect(() => {
		img && uploadFile(img, "imgUrl");
	}, [img]);

	if (isUpdate) {
	}

	const handleCreate = async (e) => {
		e.preventDefault();

		const config = {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${TOKEN}`,
			},
		};
		try {
			const res = await makeRequest.post(
				"/videos",
				{ ...inputs, tags },
				config
			);
			setOpen(false);
			if (res.status === 200) {
				navigate(`/video/${res.data._id}`);
				toast.success("Video created.", { theme: "colored" });
			}
		} catch (error) {
			toast.error("Error with upload.", { theme: "colored" });
		}
	};

	const handleEdit = async (e) => {
		e.preventDefault();

		if (error) {
			toast.error("Error with video upload.", { theme: "colored" });
		} else {
			dispatch(updateVideo(currentVideo._id, { ...inputs, tags }));
			setOpen(false);
			setIsUpdate(false);
			toast.success("Video updated.", { theme: "colored" });
		}
	};

	const handleClose = () => {
		setOpen(false);
		setIsUpdate(false);
	};

	return (
		<Container>
			<Wrapper>
				<Icon onClick={handleClose}>
					<CancelOutlinedIcon />
				</Icon>
				{isUpdate ? (
					<Title>Edit Video</Title>
				) : (
					<Title>Upload a new Video</Title>
				)}
				<Label>Video:</Label>

				{videoPerc > 0 ? (
					"Uploading:" + videoPerc + "%"
				) : (
					<Input
						type="file"
						accept="video/*"
						onChange={(e) => setVideo(e.target.files[0])}
					/>
				)}
				{isUpdate ? (
					<Input
						type="text"
						name="title"
						placeholder="Title"
						onChange={handleChange}
						defaultValue={currentVideo?.title}
					/>
				) : (
					<Input
						type="text"
						name="title"
						placeholder="Title"
						onChange={handleChange}
					/>
				)}
				{isUpdate ? (
					<TextArea
						name="desc"
						placeholder="Description"
						rows={8}
						onChange={handleChange}
						defaultValue={currentVideo.desc}
					></TextArea>
				) : (
					<TextArea
						name="desc"
						placeholder="Description"
						rows={8}
						onChange={handleChange}
					></TextArea>
				)}
				{isUpdate ? (
					<Input
						type="text"
						placeholder="Separate the tags with commas"
						onChange={handleTags}
						defaultValue={currentVideo?.tags}
					/>
				) : (
					<Input
						type="text"
						placeholder="Separate the tags with commas"
						onChange={handleTags}
					/>
				)}

				<Label>Image:</Label>

				{imgPerc > 0 ? (
					"Uploading:" + imgPerc + "%"
				) : (
					<Input
						type="file"
						accept="image/*"
						onChange={(e) => setImg(e.target.files[0])}
					/>
				)}
				{isUpdate ? (
					<Button type="submit" onClick={handleEdit}>
						Update
					</Button>
				) : (
					<Button type="submit" onClick={handleCreate}>
						Upload
					</Button>
				)}
			</Wrapper>
		</Container>
	);
};

export default UploadVideo;
