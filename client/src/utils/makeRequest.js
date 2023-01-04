import axios from "axios";

const makeRequest = axios.create({
	baseURL: "https://mern-youtube-clone-api.onrender.com/api",
});

export default makeRequest;
