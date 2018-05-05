const countries = [
    { name: "Canada", continent: "North America", cities: ["Calgary","Montreal","Toronto"], photos: ["canada1.jpg","canada2.jpg","canada3.jpg"] },
    { name: "United States", continent: "North America", cities: ["Boston","Chicago","New York","Seattle","Washington"], photos: ["us1.jpg","us2.jpg"] },
    { name: "Italy", continent: "Europe", cities: ["Florence","Milan","Naples","Rome"], photos: ["italy1.jpg","italy2.jpg","italy3.jpg","italy4.jpg","italy5.jpg","italy6.jpg"] },
    { name: "Spain", continent: "Europe", cities: ["Almeria","Barcelona","Madrid"], photos: ["spain1.jpg","spain2.jpg"] }
];
const parent = document.getElementById("parent");

(function () {
    for (let key of countries) {
        let item = document.createElement("div");
        item.className = "item";

        let h2 = document.createElement("h2");
        h2.innerHTML = key.name;

        let p = document.createElement("p");
        p.innerHTML = key.continent;

        let innerBoxCities = document.createElement("div");
        innerBoxCities.className = "inner-box";
        let titleCities = document.createElement("h3");
        titleCities.innerHTML = "Cities";
        let ul = document.createElement("ul");
        for (let city of key.cities) {
            let li = document.createElement("li");
            li.innerHTML = city;

            ul.appendChild(li);
        }
        innerBoxCities.appendChild(titleCities);
        innerBoxCities.appendChild(ul);

        let innerBoxPhotos = document.createElement("div");
        innerBoxPhotos.className = "inner-box";
        let titlePhotos = document.createElement("h3");
        titlePhotos.innerHTML = "Popular Photos";
        innerBoxPhotos.appendChild(titlePhotos);
        for (let photo of key.photos) {
            let img = document.createElement("img");
            img.src = "images/" + photo;
            img.className = "photo";

            innerBoxPhotos.appendChild(img);
        }

        let button = document.createElement("button");
        button.innerHTML = "Visit";

        item.appendChild(h2);
        item.appendChild(p);
        item.appendChild(innerBoxCities);
        item.appendChild(innerBoxPhotos);
        item.appendChild(button);

        parent.appendChild(item);
    }
})();