import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { Button, Input, FormGroup, Label } from "reactstrap";
import "./style.scss";
import Select from "react-select";

const Filters = ({ limit, setLimit, setFilter, isFilter }) => {
	const [name, setName] = useState("");
	const [selectedType, setSelectedType] = useState([]);

	const [allTypes, setAllTypes] = useState([]);

	const allType = "https://pokeapi.co/api/v2/type";
	useEffect(() => {
		(async () => {
			try {
				const types = await fetch(allType);
				const data = await types.json();
				setAllTypes(
					data.results.map((type) => ({
						value: type?.name,
						label: type?.name
					}))
				);
			} catch (err) {
				console.log(err);
			}
		})();
	}, []);

	const handleChange = async (e) => {
		setName(e.target.value);
		if (!e.target.value) {
			setFilter({
				isFiltered: false,
				filteredData: []
			});
		}
	};

	const handleSelectChange = async (value) => {
		setSelectedType(value);
		if (!value || value?.length === 0) {
			setFilter({
				isFiltered: false,
				filteredData: []
			});
		}
	};

	const handleSearchByName = async () => {
		const api = `https://pokeapi.co/api/v2/pokemon/${name}`;

		try {
			const types = await fetch(api);
			const data = await types.json();
			setFilter({
				isFiltered: true,
				filteredData: [data]
			});
		} catch (e) {
			setFilter({
				isFiltered: true,
				filteredData: []
			});
			console.log(e);
		}
	};
	const handleSearchByType = async (e) => {
		try {
			let filteredPokemonWithType = [];
			let listAllFilteredPokemon = [];
			const data = await Promise.all(
				selectedType.map((type) =>
					fetch(`https://pokeapi.co/api/v2/type/${type.value}`)
				)
			).then((responses) => Promise.all(responses.map((r) => r.json())));
			data.forEach((res) => {
				res.pokemon.forEach((r) => {
					filteredPokemonWithType = [...filteredPokemonWithType, r.pokemon];
				});
			});
			const pokemonData = await Promise.all(
				filteredPokemonWithType.map((pokemon) =>
					fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
				)
			).then((responses) => Promise.all(responses.map((r) => r.json())));
			pokemonData.forEach(
				(res) => (listAllFilteredPokemon = [...listAllFilteredPokemon, res])
			);
			setFilter({
				isFiltered: true,
				filteredData: listAllFilteredPokemon.sort((a, b) => a.id - b.id)
			});
		} catch (e) {
			setFilter({
				isFiltered: true,
				filteredData: []
			});
			console.log(e);
		}
	};

	return (
		<>
			<div className="filter-container my-3">
				<div className="input-container">
					<Input
						value={name}
						name="name"
						onChange={handleChange}
						placeholder="Search pokemon by name"
					/>
					<Button color="primary" onClick={handleSearchByName}>
						Search
					</Button>
				</div>

				<div className="input-container">
					<Select
						isMulti
						className="select-pokemon-type"
						options={allTypes}
						placeholder="Search pokemon with type"
						onChange={handleSelectChange}
						value={selectedType}
					/>
					<Button color="primary" onClick={handleSearchByType}>
						Search
					</Button>
				</div>
			</div>

			{!isFilter && (
				<div className="select-limit-container">
					<FormGroup>
						<Label for="exampleSelect">Select Limit</Label>
						<Input
							id="exampleSelect"
							name="select"
							value={limit}
							onChange={(e) => setLimit(e.target.value)}
							type="select"
						>
							<option value={10}>10</option>
							<option value={20}>20</option>
							<option value={50}>50</option>
						</Input>
					</FormGroup>
				</div>
			)}
		</>
	);
};

Filters.propTypes = {
	limit: PropTypes.number.isRequired,
	setLimit: PropTypes.func.isRequired,
	setFilter: PropTypes.func.isRequired,
	isFilter: PropTypes.bool.isRequired
};

export default Filters;
