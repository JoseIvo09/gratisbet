const jsonFile = 'fh.json';
const apiUrl = 'https://flex.smokace718.com/pt-br/game/launch';
let games = [];
let categories = new Map();
let favorites = new Set(); // Conjunto para armazenar os IDs dos jogos favoritos

async function loadGames() {
    try {
        const response = await fetch(jsonFile);
        if (!response.ok) throw new Error("Erro ao carregar o JSON");
        const data = await response.json();
        games = data.result || [];
        loadFavorites(); // Carrega os favoritos armazenados
        extractCategories(games);
        displayGames(games);
    } catch (error) {
        alert('Erro ao carregar os jogos: ' + error.message);
    }
}

// Exibe apenas os jogos favoritos
function displayFavorites() {
    const favoriteGames = games.filter(game => favorites.has(game.alias));
    displayGames(favoriteGames);
}

function extractCategories(gameList) {
    categories.clear();
    gameList.forEach(game => {
        if (game.categories) {
            game.categories.forEach(cat => categories.set(cat.category_id, cat.name));
        }
    });
    populateCategoryFilter();
}

function populateCategoryFilter() {
    const categorySelect = document.getElementById('categoryFilter');
    categorySelect.innerHTML = '<option value="">Todas as Categorias</option>' +
        Array.from(categories.entries()).map(([id, name]) => `<option value="${id}">${name}</option>`).join('');
}

function displayGames(gameList) {
    const container = document.getElementById('gameContainer');
    container.innerHTML = gameList.map(game => `
        <div class="game-card">
            <img src="${game.images.small}" alt="${game.name}" class="game-image">
            <div class="game-title">${game.name}</div>
            <div class="game-categories">Categorias: ${game.categories.map(cat => cat.name).join(', ')}</div>
            <button onclick="startGame('${game.alias}')">Jogar</button>
            <button onclick="toggleFavorite('${game.alias}')">${isFavorite(game.alias) ? 'Remover Favorito' : 'Favoritar'}</button>
        </div>
    `).join('');
}

function filterGames() {
    const query = document.getElementById('searchBox').value.toLowerCase();
    const selectedCategory = document.getElementById('categoryFilter').value;

    const filteredGames = games.filter(game =>
        game.name.toLowerCase().includes(query) &&
        (selectedCategory === "" || game.categories.some(cat => cat.category_id == selectedCategory))
    );

    displayGames(filteredGames);
}

async function startGame(gameAlias) {
    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify({ alias: gameAlias, mode: 'demo' })
        });
        if (!response.ok) throw new Error(`Erro: ${response.status}`);
        const data = await response.json();
        if (data.result?.url) {
            const gameUrl = new URL(data.result.url);
            gameUrl.searchParams.set("jurisdiction", "BR");
            gameUrl.searchParams.set("lobbyUrl", "http%3A%2F%2Flocalhost%3A8004%2Fson%2Fgato%2Fruper.html");
            gameUrl.searchParams.set("lang", "pt");
            gameUrl.searchParams.set("cur", "BRL");

            // Abre o modal com o jogo
            openModal(gameUrl.toString());
        } else {
            alert('Erro ao iniciar o jogo.');
        }
    } catch (error) {
        alert('Falha ao iniciar o jogo: ' + error.message);
    }
}

function openModal(gameUrl) {
    const modal = document.getElementById('gameModal');
    const iframe = document.getElementById('gameFrame');
    const closeButton = document.querySelector('.close-btn');

    iframe.src = gameUrl;
    modal.style.display = 'block';

    closeButton.addEventListener('click', () => {
        modal.style.display = 'none';
        iframe.src = 'http://localhost:8006/rupp.html'; // Para parar o jogo ao fechar o modal
    });
}

// Adiciona ou remove um jogo dos favoritos e salva no LocalStorage
function toggleFavorite(gameAlias) {
    if (favorites.has(gameAlias)) {
        favorites.delete(gameAlias);
    } else {
        favorites.add(gameAlias);
    }
    saveFavorites(); // Salva os favoritos no LocalStorage
    displayGames(games); // Reexibir os jogos para refletir a mudança de favoritos
}

// Salva os favoritos no LocalStorage
function saveFavorites() {
    localStorage.setItem('favoriteGames', JSON.stringify(Array.from(favorites)));
}

// Carrega os favoritos do LocalStorage ao iniciar
function loadFavorites() {
    const storedFavorites = localStorage.getItem('favoriteGames');
    if (storedFavorites) {
        favorites = new Set(JSON.parse(storedFavorites));
    }
}

// Verifica se um jogo está favoritado
function isFavorite(gameAlias) {
    return favorites.has(gameAlias);
}

window.onload = loadGames;
