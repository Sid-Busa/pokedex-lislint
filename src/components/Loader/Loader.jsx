import React from "react";
import { Spinner } from "reactstrap";
const Loader = () => {
	return (
		<div className='overlay'>
			<div className='overlay__inner'>
				<div className='overlay__content'>
					<Spinner animation='grow' variant='light' />
				</div>
			</div>
		</div>
	);
};

export default Loader;
