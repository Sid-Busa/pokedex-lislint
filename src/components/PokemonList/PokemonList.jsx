import PropTypes from "prop-types";
import PokemonCard from "../PokemonCard";

const PokemonList = ({ allPokemons }) => {
	return (
		<div className="pokemon-container">
			<div className="all-container">
				{allPokemons.map((pokemonStats, index) => (
					<PokemonCard
						key={index}
						id={pokemonStats.id}
						image={pokemonStats.sprites.other.dream_world.front_default}
						name={pokemonStats.name}
						type={pokemonStats.types.map(({ type }) => type.name).join(",")}
					/>
				))}
			</div>
		</div>
	);
};

PokemonList.propTypes = {
	allPokemons: PropTypes.array.isRequired
};

export default PokemonList;
