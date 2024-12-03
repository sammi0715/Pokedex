const POKEMON_BASE_URL = 'https://pokeapi.co/api/v2/pokemon';
const DIGIMON_BASE_URL = 'https://digi-api.com/api/v1/digimon';

export const fetchPokemonList = async (limit = 20, offset = 0) => {
    const res = await fetch(`${POKEMON_BASE_URL}?limit=${limit}&offset=${offset}`);
    if (!res.ok) throw new Error('Failed to fetch Pokemon data');
    return res.json();

};

export const fetchPokemonDetails = async (id) => {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    if (!res.ok) throw new Error('Failed to fetch Pokemon details');
    return res.json();
};


export const fetchDigimonList = async (currentPage = 1, itemsPerPage = 20) => {
    const elementsPerPage = 5;
    const pagesNeeded = Math.ceil(itemsPerPage / elementsPerPage);
    const startPage = (currentPage - 1) * pagesNeeded;


    const requests = [];
    for (let i = 0; i < pagesNeeded; i++) {
        requests.push(fetch(`${DIGIMON_BASE_URL}?page=${startPage + i}`));
    }

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