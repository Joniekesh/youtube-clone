import axios from "axios";

const makeRequest = axios.create({
	baseURL: "https://youtube-clone-api-gdq4.onrender.com/api",
});

export default makeRequest;
