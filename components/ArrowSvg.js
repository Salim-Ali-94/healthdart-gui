import React from "react";
import Svg, { Path } from "react-native-svg";


export default function ArrowSvg(props) {

	return (

		<Svg width="40%" height="40%" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 11" {...props} >

		    <Path scale={1} d="M11.5 6a.5.5 0 0 0 0-1v1Zm-10 0h10V5h-10v1Z" fill="#281D3F" />
		    <Path scale={1} d="M6 1 1 5.5 6 10" stroke="#281D3F" strokeLinecap="round" />

 		 </Svg>

	);

}
