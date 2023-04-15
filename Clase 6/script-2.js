async function segundo() {
    const consulta = await fetch("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_month.geojson");
    const data = await consulta.json();
    //Declaro variables que parten en cero
    let indonesio = 0;
    let chino = 0;
    let otro = 0;
    //Reviso data con alguna condiciones
    data.features.forEach((t) => {
        if (t.properties.place.includes("Indonesia")) {
            indonesio = indonesio + 1;
        } else if (t.properties.place.includes("China")) {
            chino = chino + 1;
        } else {
            otro = otro + 1;
        }
    });
    //Creo una variable como un arreglo vacío
    var numeros = [];
    //Empujo a la variable los resultados del contador
    numeros.push(indonesio, chino, otro);
    var nombres = ["En Indonesia", "En China", "En el resto del mundo"];
    //Ahora puedo armar el gráfico
    new Chart(document.getElementById("earthquakes").getContext("2d"), {
        type: "doughnut",
        data: {
            labels: nombres,
            datasets: [
                { 
                    label: "Earthquakes", 
                    data: numeros, 
                    backgroundColor: ["#D4AF37", "#B9B8B5", "#718792"] 
                }
            ],
        },
        options: {
            plugins: {
                title: {
                    display: false,
                },
            },
            responsive: true,
            layout: {
                padding: 20,
            }
        }
    });
}
segundo().catch((error) => console.error(error));