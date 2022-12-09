import { css } from "styled-components";

export const responsive768 = (props) => {
	return css`
		@media only screen and (max-width: 830px) {
			${props}
		}
	`;
};

export const responsive965 = (props) => {
	return css`
		@media only screen and (max-width: 965px) {
			${props}
		}
	`;
};

export const responsive678 = (props) => {
	return css`
		@media only screen and (max-width: 678px) {
			${props}
		}
	`;
};

export const responsive615 = (props) => {
	return css`
		@media only screen and (max-width: 615px) {
			${props}
		}
	`;
};

export const responsive483 = (props) => {
	return css`
		@media only screen and (max-width: 483px) {
			${props}
		}
	`;
};
