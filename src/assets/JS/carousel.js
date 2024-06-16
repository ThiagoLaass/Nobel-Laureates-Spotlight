function loadCarousel() {
    fetch('./content.json')
        .then((response) => {
            return response.json();
        })
        .then(data => {
            const carouselIndicators = document.querySelector('.carousel-indicators');
            const carouselInner = document.querySelector('.carousel-inner');

            // Creating the indicators
            for (let index = 0; index < data.length; index++) {
                const item = data[index];

                const indicator = document.createElement('button');
                indicator.setAttribute('type', 'button');
                indicator.setAttribute('data-bs-target', '#carouselExampleIndicators');
                indicator.setAttribute('data-bs-slide-to', index.toString());
                if (index === 0) {
                    indicator.classList.add('active');
                }
                carouselIndicators.appendChild(indicator);


                // Creating the banner
                const carouselItem = document.createElement('div');
                carouselItem.classList.add('carousel-item');
                if (index === 0) {
                    carouselItem.classList.add('active');
                }

                const banner = `
                    <a href="./details.html?id=${item.album.id}">
                    <img src= "${item.album.cover}" class="d-block w-100 object-fit-cover" alt="${item.album.name}"
                    height="800px">
                    <div class="carousel-caption d-none d-md-block">
                        <h5>${item.album.about}</h5>
                    </div>
                    </a>
                `;
                carouselItem.innerHTML = banner;
                carouselInner.appendChild(carouselItem);
            }
        })
}
loadCarousel();
// TESTANDOOOOOOOOOOOOOOOOOOOOO
