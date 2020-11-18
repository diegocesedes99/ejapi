//
// Ejemplo conexión a API.
//

// addCharacters(): Agrega los personajes a la lista.
function addCharacters(characters) {
  // Obtiene el elemento de la lista de personajes.
  const characterList = document.getElementById('character-list');
  // Se limpia la lista de personajes antes de agregar los nuevos.
  characterList.innerHTML = '';
  // Se hace scroll a la parte superior de la ventana.
  window.scroll(0, 0);
  // Itera sobre los personajes.
  for (let i = 0; i < characters.length; i += 1) {
    // Item de la lista.
    const listItem = document.createElement('li');
    characterList.appendChild(listItem);
    // Se crea un string con el HTML de la ficha de cada personaje.
    const content = `
      <div class="left">
        <img src="${characters[i].image}" alt="Foto de ${characters[i].name}" />
      </div>
      <div class="right">
        <h2 class="character-name">${characters[i].name}</h2>
        <p>${characters[i].species}</p>
      </div>
    `;
    listItem.innerHTML = content;
  }
}

// URL a la próxima página.
let nextPage = '';

// Conexión al API usando fetch.
fetch('https://rickandmortyapi.com/api/character')
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    // Add characters to list.
    addCharacters(data.results);
    // Save the next page URL.
    nextPage = data.info.next;
  });

// Botón para cargar más personajes.
const loadMore = document.getElementById('load-more');
loadMore.addEventListener('click', () => {
  fetch(nextPage)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      // Add characters to list.
      addCharacters(data.results);
      // Save the next page URL.
      nextPage = data.info.next;
    });
});
