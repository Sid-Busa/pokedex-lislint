import PropTypes from "prop-types";
import "./style.scss";
const PokemonCard = ({ id, image, name, type }) => {
	const style = type + " thumb-container";
	return (
		<div className={style}>
			<div className="number">
				<small>#0{id}</small>
			</div>
			<img src={image} alt={name} />
			<div className="detail-wrapper">
				<h3>{name}</h3>
				<small>Type: {type}</small>
			</div>
		</div>
	);
};

PokemonCard.propTypes = {
	id: PropTypes.number.string,
	image: PropTypes.func.string,
	name: PropTypes.func.string,
	type: PropTypes.bool.string
};

export default PokemonCard;
