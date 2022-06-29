import React from "react";
import Svg, { Path } from "react-native-svg";



export default function LogoSvg(props) {

	return (

		<Svg width="60%" height="60%" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 22" {...props} >

		    <Path scale={1} d="m7.086 6.307 10.472 15.577C13.753 21.14 2.238 18.276.201 11.115c-1.33-4.681 4.245-5.618 6.884-4.808Z" fill="#00A4A4" />
		    <Path scale={1} d="M5.147 8.711c.842 2.322 4.253 5.5 12.41 13.174L7.088 6.307s-2.897-.234-1.94 2.404Z" fill="#7CF7F7" />
		    <Path scale={1} d="m7.086 6.307 10.472 15.578c.751-3.773 2.415-15.702-3.49-20.29-3.593-2.79-6.735 1.984-6.982 4.712Z" fill="#32E0E0" />

		</Svg>
  	);

}
