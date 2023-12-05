async function fetchAlbumDetails(albumId) {
  try {
    const response = await fetch(`${urlBase}/photos?albumId=${albumId}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    throw new Error('Failed to fetch album details');
  }
}

function renderCard(data) {
  const cardDiv = document.createElement('div');
  cardDiv.className = 'col-lg-3 col-md-4 col-sm-6 mb-3';

  cardDiv.innerHTML = `
   <div class="card" style="width: 18rem;">
    <img src="${data.image}" id="card-img" class="object-fit-cover" alt="detailsIMG" height="200px">
    <div class="card-body">
      <p class="card-text">${data.description}</p>
      <button type="button" class="btn btn-primary align-self-end" data-bs-toggle="modal" data-bs-target="#modal-fotos">
        Ver Destaques
      </button>
    </div>
  </div>
  `;
  return cardDiv;
}

async function renderCardDetails(albumId) {

    const data = await fetchAlbumDetails(albumId);

    const cardContainer = document.getElementById('card-container');
    cardContainer.innerHTML = '';

    for (let i = 0; i < data.length; i++) {
      const card = renderCard(data[i]);
      cardContainer.appendChild(card);
    }
}

function getUrlParameter() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('id');
}
const albumIdFromURL = getUrlParameter('albumId');

if (albumIdFromURL) {
  renderCardDetails(albumIdFromURL);
} else {
  console.error('Album ID not found in the URL');
}