
let cards = document.getElementById('cards');
let fragment = document.createDocumentFragment();

for (let events of data.events){
    let card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
    <img src="${events.image}" class="card-img" alt="...">
    <div>
        <h3 class="card-h3">${events.name}</h5>
        <p class="card-p">${events.description}</p>
    </div>
    <div class="d-flex justify-content-evenly">
        <p class="d-inline-block card-p">Price: $${events.price}</p>
        <a href="./details.html" class="btn btn-dark color-text card-link">Details</a>
    </div>`;
    fragment.appendChild(card);
}

cards.appendChild(fragment);


