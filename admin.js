// HTML-elementer
const skjemaBilder = document.querySelector("#skjemaBilder");
const skjemaInfo = document.querySelector("#skjemaInfo");
const inpBilde = document.querySelector("#inpBilde");
const inpBeskrivelse = document.querySelector("#inpBeskrivelse");
const infoBilde = document.querySelector("#infoBilde");
const inpTekst = document.querySelector("#inpTekst");
const inpTittel = document.querySelector("#inpTittel");
const inpLink = document.querySelector("#inpLink");
const ulBilder = document.querySelector("#ulBilder");
const infoOpplasting = document.querySelector("#infoOpplasting");
const overlay = document.querySelector("#overlay");
const overlay2 = document.querySelector("#overlay2");


// Firebase
const db = firebase.database();
const storage = firebase.storage();
const portofolio = db.ref("portofolio");


// Et array til å lagre bildene før vi legger inn i databasen
const bilderSomSkalLastesOpp = [];


// En hjelpefunksjon som jeg fant på nett for å regne om filstørrelser
function bytesToSize(bytes) {
    var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes == 0) return '0 Byte';
    var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
}


// Viser informasjon om bildet som skal lastes opp
function visBildeinfo() {
    const bilde = inpBilde.files[0];


    const filnavn = bilde.name;
    const bytes = bilde.size;
    const storrelse = bytesToSize(bytes);

    infoBilde.innerText = filnavn + "  " + storrelse;
}


// Laster opp et bilde til storage og lagrer url og info i arrayet
function lastOppBilde(evt) {
    evt.preventDefault();
    overlay.style.display = "flex";

    const bilde = inpBilde.files[0];
    const filnavn = bilde.name;
    const lagringsPlass = storage.ref("mineprosjektbilder/" + new Date() + bilde.filnavn);

    lagringsPlass.put(bilde)
        .then(opplastetBilde => opplastetBilde.ref.getDownloadURL())
        .then(url => {
            bilderSomSkalLastesOpp.push(url);
            overlay.style.display = "none";
            const div = document.createElement("div");
            div.innerHTML = `
                <img src="./ikoner/icon-image-128.png">
                <span>${filnavn}</span>
            `;

            ulBilder.appendChild(div);
            div.animate([{
                    transform: "translateX(-300px)"
                },
                {
                    transform: "translateX(0)"
                }
            ], 500);

            let tekst = "bilde";
            if (bilderSomSkalLastesOpp.length > 1) {
                tekst = "bilder";
            }

            infoOpplasting.innerText = bilderSomSkalLastesOpp.length + " " + tekst + " er lastet opp";
            infoOpplasting.innerText = `${bilderSomSkalLastesOpp.length} ${tekst} er lastet opp`;

        });

}

function lagreProsjekt(evt) {
    evt.preventDefault();
    portofolio.push({
        tittel : inpTittel.value,
        beskrivelse : inpBeskrivelse.value,
        prosjektLink: inpLink.value,
        bildeURL: bilderSomSkalLastesOpp[0]
    })

    skjemaBilder.reset();
    skjemaInfo.reset();
    infoOpplasting.innerText = "Ingen bilder lastet opp ennå";
    ulBilder.innerHTML = "";
    infoBilde.innerText = "Velg bilde";

    overlay2.style.display = "flex";
    setTimeout(function() {overlay2.style.display = "none"}, 1000);

}

// Event Listeners
inpBilde.addEventListener("change", visBildeinfo);
skjemaBilder.addEventListener("submit", lastOppBilde);
skjemaInfo.addEventListener("submit", lagreProsjekt);
