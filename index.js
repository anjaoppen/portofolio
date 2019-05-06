const prosjekter = document.getElementById("prosjekter");

const db = firebase.database();
const portofolio = db.ref("portofolio");


function lagContainer(snap) {
    const data = snap.val();
    const key = snap.key;

    prosjekter.innerHTML += `
        <div class="container" id="${key}">
            <div class="bildeContainer fade" style="background-image: url('${data.bildeURL}')">
                <a href="${data.prosjektLink}" >
                    <h1 class="tittel1"> ${data.tittel} </h1> 
                    <p class = "p3" > ${data.beskrivelse} </p> 
                </a> 
            </div> 
        </div>
    `;

}

portofolio
    .orderByChild("beskrivelse")
    .on("child_added", lagContainer);


