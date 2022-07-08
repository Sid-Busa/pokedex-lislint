import { useEffect, useState } from "react";

import { Button } from "reactstrap";
import Filters from "./components/Filters";
import Loader from "./components/Loader";
import PokemonList from "./components/PokemonList";

function App () {
	const [loading, setLoading] = useState(true);
	const [allPokemons, setAllPokemons] = useState([]);
	const [totalRecord, setTotalRecord] = useState(0);
	const [limit, setLimit] = useState(10);

	const [filter, setFilter] = useState({
		isFiltered: false,
		filteredData: []
	});

	const getPokemons = async () => {
		setLoading(true);
		const res = await fetch(
			`https://pokeapi.co/api/v2/pokemon?offset=${allPokemons.length}&limit=${limit}`
		);
		const data = await res.json();
		setTotalRecord(data.count);
		Array.isArray(data?.results)
			? data?.results.forEach(async (pokemon) => {
				const res = await fetch(
					`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
				);
				const data = await res.json();
				setAllPokemons((currentList) => [...currentList, data]);
				await allPokemons.sort((a, b) => a.id - b.id);
			  })
			: setAllPokemons([]);
		setLoading(false);
	};

	useEffect(() => {
		getPokemons();
	}, [limit]);

	if (loading) {
		return <Loader />;
	}

	return (
		<>
			<div className='app-contaner'>
				<h1>Pokemons</h1>
				<Filters
					limit={limit}
					setLimit={setLimit}
					isFilter={filter.isFiltered}
					setFilter={setFilter}
				/>

				{filter.isFiltered
				  ? (
				  filter.filteredData.length > 0
				        ? (
								<PokemonList allPokemons={filter.filteredData} />
				  )
				        : (
								<p> No Record Found </p>
				  )
				    )
				  : allPokemons.length > 0
				    ? (
							<>
								<PokemonList allPokemons={allPokemons} getPokemons={getPokemons} />
								{totalRecord !== allPokemons.length && !filter.isFiltered && (
									<Button
										color='primary'
										className='my-3'
										onClick={() => getPokemons()}
									>
								Load more
									</Button>
								)}
							</>
				      )
				    : (
							<p> No Record Found </p>
				      )}
			</div>
		</>
	);
}

export default App;
