async function fetchAlbumDetails(albumId) {
  try {
    const response = await fetch(`./data/content.json`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

// Function to display the album details

function updateAlbumDetails(album) {
  if (album) {
    document.getElementById('albumName').innerHTML = album.name;
    document.getElementById('albumImage').src = album.cover;
    document.getElementById('albumDescription').innerHTML = album.description;
    document.getElementById('albumLocation').innerHTML = album.country;
    document.getElementById('albumLat').innerHTML = `<strong>LAT:</strong> ${album.coordinates[0]}`;
    document.getElementById('albumLong').innerHTML = `<strong>LONG:</strong> ${album.coordinates[1]}`;
    document.getElementById('albumDate').innerHTML = `Data da premiação: ${album.date}`;
  } else {
    alert('Data not found');
  }

  if (album.highlights.length > 0) {
    setHighligth(album.highlights);
  }
}

async function renderDetails() {
  const urlParams = new URLSearchParams(window.location.search);
  const albumId = urlParams.get('id');
  const album = await fetchAlbumDetails(albumId);
  updateAlbumDetails(album);
}

let idDestaque = null;

function initiateCheckbox() {

  const checkbox = document.getElementById('highlight');

  checkbox.addEventListener('change', function (event) {
    if (event.target.checked) {
      addHighligth()
      console.log('Checked!');
    } else {
      removeHighligth()
      console.log('Unchecked!');
    }
  });
}

function setHighligth(highlights) {
  const checkbox = document.getElementById("highlight");

  if (highlights && highlights[0]) {
    checkbox.checked = true;
    idDestaque = highlights[0].id;
  }
}

function addHighligth() {
  const urlParams = new URLSearchParams(window.location.search);
  const albumId = urlParams.get('id');
  idDestaque = albumId;

  const url = `${urlBase}/highlights`;
  const data = { albumId: parseInt(albumId) };
  const request = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };
  fetch(url, request).then((response) => {
    console.log(response);
  });
  return true;
}

function removeHighligth() {
  const url = `${urlBase}/highlights/${idDestaque}`;
  const request = { method: "DELETE" };
  fetch(url, request).then((response) => {
    console.log(response);
  });
  return true;
}

async function fetchEspecificAlbum(photos) {
  try {
    const response = await fetch(`${urlBase}/${photos}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

function filterPhotosByAlbumId(albumId) {
  return data.photos.filter((photo) => photo.albumId === albumId);
}

renderDetails();
initiateCheckbox();