const POKEMON_BASE_URL = "https://pokeapi.co/api/v2/pokemon";
const DIGIMON_BASE_URL = "https://digi-api.com/api/v1/digimon";


const fetchData = async (url, errorMessage) => {
    const res = await fetch(url);
    if (!res.ok) throw new Error(errorMessage);
    return res.json();
};


export const fetchPokemonList = (limit = 20, offset = 0) =>
    fetchData(`${POKEMON_BASE_URL}?limit=${limit}&offset=${offset}`, "Failed to fetch Pokemon data");


export const fetchPokemonDetails = (id) =>
    fetchData(`${POKEMON_BASE_URL}/${id}`, "Failed to fetch Pokemon details");


export const fetchPokemonSpecies = (pokemonId) =>
    fetchData(`${POKEMON_BASE_URL}-species/${pokemonId}`, "Failed to fetch Pokémon species data");


export const fetchAndProcessPokemonEvolutionChain = async (url) => {
    const evolutionData = await fetchData(url, "Failed to fetch evolution chain");

    const chain = [];
    let current = evolutionData.chain;

    while (current) {
        const speciesUrlParts = current.species.url.split("/");
        const speciesId = speciesUrlParts[speciesUrlParts.length - 2];

        chain.push({
            name: current.species.name,
            image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${speciesId}.png`,
            minLevel: current.evolves_to[0]?.evolution_details[0]?.min_level || null,
        });
        current = current.evolves_to[0];
    }

    return chain;
};


export const fetchDigimonList = async (currentPage = 1, itemsPerPage = 20) => {
    const elementsPerPage = 5;
    const pagesNeeded = Math.ceil(itemsPerPage / elementsPerPage);
    const startPage = (currentPage - 1) * pagesNeeded;

    const requests = Array.from({ length: pagesNeeded }, (_, i) =>
        fetch(`${DIGIMON_BASE_URL}?page=${startPage + i}`)
    );

    const responses = await Promise.all(requests);
    const allData = await Promise.all(responses.map((res) => res.json()));

    const combinedContent = allData.flatMap((data) => data.content);

    return {
        content: combinedContent.slice(0, itemsPerPage),
        pageable: {
            currentPage,
            totalPages: Math.ceil(allData[0].pageable.totalElements / itemsPerPage),
        },
    };
};


export const fetchDigimonDetails = (id) =>
    fetchData(`${DIGIMON_BASE_URL}/${id}`, "Failed to fetch Digimon details");
