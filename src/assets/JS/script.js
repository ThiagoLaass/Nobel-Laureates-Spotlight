async function fetchProductData() {
    const response = await fetch('https://jsonserver-2--thiagolaass202.repl.co/albums');
    const data = await response.json()
    return data;
}

// Card function
function renderCard(data) {
    const cardDiv = document.createElement('div');
    cardDiv.className = "col-lg-3 col-md-4 col-sm-6 mb-3";

    cardDiv.innerHTML = `
        <div class="card">
            <img src="${data.image}" id="card-img" class="object-fit-cover" height="200px" alt="image">
        <div class="card-body d-flex flex-column">
            <h5 class="card-title">${data.name}</h5>
            <br><p class="card-text">${data.description}</p><br>
            <a class="card-button btn btn-primary align-self-end" href="./details.html?id=${data.id}">Ver Álbum</a>
        </div>
    </div>
    `;
    return cardDiv;
}

// Mapbox
function getMap() {
    const centralCoord = [-32.920371052764025, 52.41913859649995];

    mapboxgl.accessToken = '';

    const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v12',
        center: centralCoord,
        zoom: 3
    });
    return map;
}

// Mapbox markers 

function get_card_marker(item) {
    const card = `
            <div class="card-map">
            <a href="./details.html?id=${item.id}">
                <img src="${item.aboutimage}" alt="img-mark" class="img-mark object-fit-cover"> 
            </a>
                <div class="card-body-map">
                    <h5 class="card-title">${item.name}</h5>
                <p class="card-text">${item.about}</p>
            </div>
        </div>
        `;
    return card;
}

// Mapbox

function get_locations(map) {
    fetch('/data/content.json')
        .then((response) => {
            return response.json();
        })
        .then((array_data) => {
            array_data.forEach((item) => {
                let popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
                    get_card_marker(item)
                );
                new mapboxgl.Marker({ color: "black" })
                    .setLngLat(item.coordinates)
                    .setPopup(popup)
                    .addTo(map);
            });
        });
}

//Render function

async function renderPage() {
    const cardContainer = document.getElementById('container');

    const data = await fetchProductData();
    console.log(data);

    for (let i = 0; i < data.length; i++) {
        const card = renderCard(data[i]);
        cardContainer.appendChild(card);
    }
}

renderPage();
const map = getMap();
get_locations(map);
