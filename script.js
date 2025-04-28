const cars = {
    audi: [
        {
            image: "audi1.jpg",
            name: "Audi 100 C1",
            year: "1968",
            price: "€45,000",
            description: "Inxhinieria klasike gjermane në kulmin e saj"
        },
        {
            image: "audi2.jpg",
            name: "Audi Quattro",
            year: "1980",
            price: "€75,000",
            description: "Makina e legjendës së rally-t që ndryshoi motorsportin"
        },
        {
            image: "audi3.jpg",
            name: "Audi 80",
            year: "1972",
            price: "€35,000",
            description: "Dizajn i përjetshëm dhe besueshmëri"
        },
        {
            image: "audi4.jpg",
            name: "Audi V8",
            year: "1988",
            price: "€55,000",
            description: "Luks takon performancën"
        },
        {
            image: "audi5.jpg",
            name: "Audi 200",
            year: "1976",
            price: "€40,000",
            description: "Klasë ekzekutive me stil"
        }
    ],
    mercedes: [
        {
            image: "mercedes.jpg",
            name: "Mercedes 300SL",
            year: "1954",
            price: "€1,200,000",
            description: "Gullwing ikonik"
        },
        {
            image: "mercedes1.jpg",
            name: "Mercedes 190SL",
            year: "1955",
            price: "€250,000",
            description: "Roadster elegant"
        },
        {
            image: "mercedes2.jpg",
            name: "Mercedes 280SE",
            year: "1968",
            price: "€85,000",
            description: "Sedan klasik luksoz"
        },
        {
            image: "mercedes3.jpg",
            name: "Mercedes 600",
            year: "1963",
            price: "€150,000",
            description: "Makina përfundimtare e luksit"
        },
        {
            image: "mercedes4.jpg",
            name: "Mercedes 230SL",
            year: "1963",
            price: "€120,000",
            description: "Dizajn me çati pagode"
        }
    ],
    bmw: [
        {
            image: "bmw.jpg",
            name: "BMW 507",
            year: "1956",
            price: "€2,000,000",
            description: "Roadster i rrallë dhe i bukur"
        },
        {
            image: "bmw1.jpg",
            name: "BMW 2002",
            year: "1968",
            price: "€45,000",
            description: "Sedani origjinal sportiv"
        },
        {
            image: "bmw2.jpg",
            name: "BMW 3.0 CS",
            year: "1971",
            price: "€95,000",
            description: "Coupe elegant"
        },
        {
            image: "bmw3.jpg",
            name: "BMW 2800",
            year: "1968",
            price: "€65,000",
            description: "Luks klasik"
        },
        {
            image: "bmw4.jpg",
            name: "BMW 1600",
            year: "1966",
            price: "€35,000",
            description: "Klasik kompakt"
        }
    ]
};

function showCars(brand) {
    const gallery = document.getElementById("cars-gallery");
    gallery.innerHTML = ""; // Pastro përmbajtjen ekzistuese
    
    // Krijo butonat e filtrit
    const filterContainer = document.createElement("div");
    filterContainer.className = "filter-buttons";
    filterContainer.innerHTML = `
        <button class="filter-btn active" data-filter="all">Të Gjitha</button>
        <button class="filter-btn" data-filter="under50">Nën €50,000</button>
        <button class="filter-btn" data-filter="over50">Mbi €50,000</button>
    `;
    gallery.appendChild(filterContainer);

    // Krijo kontejnerin e makinave
    const carsContainer = document.createElement("div");
    carsContainer.className = "cars-container";
    gallery.appendChild(carsContainer);

    // Shto event listeners për butonat e filtrit
    const filterButtons = filterContainer.querySelectorAll(".filter-btn");
    filterButtons.forEach(button => {
        button.addEventListener("click", () => {
            filterButtons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");
            filterCars(brand, button.dataset.filter);
        });
    });

    // Shfaqja fillestare
    filterCars(brand, "all");
}

function filterCars(brand, filter) {
    const carsContainer = document.querySelector(".cars-container");
    carsContainer.innerHTML = "";

    cars[brand].forEach(car => {
        const price = parseInt(car.price.replace(/[^0-9]/g, ""));
        if (filter === "all" || 
            (filter === "under50" && price < 50000) || 
            (filter === "over50" && price >= 50000)) {
            
            const carCard = document.createElement("div");
            carCard.className = "car-card";
            carCard.innerHTML = `
                <div class="car-image">
                    <img src="${car.image}" alt="${car.name}" loading="lazy">
                    <div class="car-overlay">
                        <button class="view-details" onclick="showCarDetails('${brand}', '${car.name}')">Shiko Detajet</button>
                    </div>
                </div>
                <div class="car-info">
                    <h3>${car.name}</h3>
                    <p class="year">${car.year}</p>
                    <p class="price">${car.price}</p>
                </div>
            `;
            carsContainer.appendChild(carCard);
        }
    });
}

function showCarDetails(brand, carName) {
    const car = cars[brand].find(c => c.name === carName);
    if (!car) return;

    const modal = document.createElement("div");
    modal.className = "car-modal";
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <img src="${car.image}" alt="${car.name}">
            <div class="car-details">
                <h2>${car.name}</h2>
                <p class="year">Viti: ${car.year}</p>
                <p class="price">Çmimi: ${car.price}</p>
                <p class="description">${car.description}</p>
                <button class="contact-btn">Na Kontaktoni</button>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    // Shto event listeners
    modal.querySelector(".close-modal").addEventListener("click", () => {
        modal.remove();
    });

    modal.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

// Shto scroll të butë për navigim
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
  