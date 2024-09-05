const image = document.getElementById('js--image');
const iconImage = document.getElementById('js--iconImage');
const prijs = document.getElementById('js--price');
console.log(prijs.innerText)

let data;
async function loadNames() {
    const response = await fetch('assets/Media-assets/dataset.json');
    const jsonData = await response.json();
    console.log(jsonData);
    data = jsonData;
}

loadNames();

let colour;
let icon;

function color(kleur, object) {
    colour = kleur;
    console.log(kleur)
    console.log(data['colours'][kleur])
    image.src = 'assets/Media-assets/products/' + data['products'][object]['name'] + '-' + data['colours'][kleur]['name'] + '.png';
    switch(kleur) {
        case 0:
            prijs.innerText = data['products'][object]['price'];
            break;
        case 1:
            prijs.innerText = data['products'][object]['price'];
            break;
        case 2:
            prijs.innerText = data['products'][object]['price'] + 3;
            break;
        case 3:
            prijs.innerText = data['products'][object]['price'] + 2;
            break;
    }
}

function symbol(symbool) {
    icon = symbool;
    console.log(data);
    iconImage.src = 'assets/Media-assets/symbols/symbol-' + data['symbols'][symbool]['name'] + '.png';

}

function bestel(product) {
    let noNull = true;

    if (colour == null) {
        alert("Kies eerst een kleur");
        noNull = false;
    } 
    if (icon == null) {
        alert("Kies eerst een symbool");
        noNull = false;
    }

    if (noNull) {
        let json = { "productType": product+1, "symbol": icon+1, "colour": colour+1 };
        console.log(json);

        const xhttp = new XMLHttpRequest();
        xhttp.onload = function() {
            const response = JSON.parse(this.responseText);
            if (response.success) {
                alert('Bestelling geslaagd');
            } else {
                alert('Bestelling mislukt');
            }
        };
        
        xhttp.open("POST", 'https://skills.canvasaccept.com/orders', true);
        xhttp.setRequestHeader('Content-Type', 'application/json');
        xhttp.send(JSON.stringify(json));
    }
}
