console.log("hello")
let quran;
// let currentIndex = 0;
let currFolder
let currentquran = new Audio()

function secondsToMinutesSeconds(seconds) {
    if (isNaN(seconds)) return "00:00";

    let min = Math.floor(seconds / 60)
    let sec = Math.floor(seconds % 60)

    let minStr = min.toString().padStart(2, "0")
    let secStr = sec.toString().padStart(2, "0")

    return `${minStr}:${secStr}`
}



async function getquran(folder) {
    currFolder = folder

    let a = await fetch(`http://127.0.0.1:3000/${folder}/`)

    let response = await a.text()

    let div = document.createElement("div")
    div.innerHTML = response
    let as = div.getElementsByTagName("a")

    // pehle 3 anchors ke href print karo, dekho kaisi dikhte hain
    for (let i = 0; i < Math.min(3, as.length); i++) {
    }

    let quran = []
    for (let index = 0; index < as.length; index++) {
        const element = as[index];

        if (element.href.includes(".mp3")) {

            let decoded = decodeURIComponent(element.href)
            let parts = decoded.split("\\").filter(Boolean)
            let name = parts[parts.length - 1]
            quran.push({ url: element.href, name: name })
        }
    }
    return quran

}

async function getFolders() {
    return [
        { raw: "quran", display: "Quran" },
        { raw: "Rooh ki ghiza", display: "Rooh ki Ghiza" },
        { raw: "Ruhaniyat", display: "Ruhaniyat" },
        { raw: "Sukoon", display: "Sukoon" },
        { raw: "Tilawah", display: "Tilawah" },
        { raw: "khamoshi", display: "Khamoshi" },        // <- naya
        { raw: "kalam-e-pak", display: "Kalam-e-Pak" },  // <- naya
        { raw: "Dil ki sada", display: "Dil ki Sada" },  // <- naya
        { raw: "Noor-e-Quran", display: "Noor-e-Quran" } ,// <- naya
        { raw:  "jihad", display:  "jihad" } ,// <- naya
        { raw:   "ncs", display:   "ncs"} ,// <- naya
        { raw:  "junoon-e-shahadat", display:  "junoon-e-shahadat" } // <- naya
    ]
}
// async function getFolders() {
//     let a = await fetch(`http://127.0.0.1:3000/`)
//     let response = await a.text()
//     let div = document.createElement("div")
//     div.innerHTML = response


//     let as = div.getElementsByTagName("a")
//     let folders = []

//     for (const element of as) {
//         // sirf real folders chahiye — jo "/" pe end hote hain aur .svg/.css/.js/.ico NAHI hain
//         if (element.href.endsWith("/")) {
//             let parts = element.href.split("\/").filter(Boolean)

//             let rawName = decodeURIComponent(parts[parts.length - 1])
//             let displayName = rawName.replace(/^\\+/, "")

//             folders.push({
//                 raw: rawName,          // <- object banao, sirf string nahi
//                 display: displayName
//             })
//         }
//     }
//     return folders
// }

let folderMeta = {
    "Sukoon": {
        image: "https://tse2.mm.bing.net/th/id/OIP.o1U96gC2_H1pFYDTGUpYXAHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
        artist: "Al-Kundary"
    },
    "Ruhaniyat": {
        image: "https://tse2.mm.bing.net/th/id/OIP.0pUvtHmAe0Q_MtxtbEbGOAHaHa?r=0&pid=ImgDet&w=184&h=184&c=7&dpr=1.3&o=7&rm=3",
        artist: "as-sudais"
    },
    "Tilawah": {
        image: "https://th.bing.com/th?q=Quran+Book+Wallpaper&w=120&h=120&c=1&rs=1&qlt=70&r=0&o=7&cb=1&dpr=1.3&pid=InlineBlock&rm=3&mkt=en-WW&cc=PK&setlang=en&adlt=moderate&t=1&mw=247",
        artist: "as-sudais"

    },
    "ncs": {
        image: "https://tse2.mm.bing.net/th/id/OIP.oqhPbjdnklK6B_RlFGmAvQHaHa?r=0&pid=ImgDet&w=184&h=184&c=7&dpr=1.3&o=7&rm=3",
        artist: "yousaf"
    },
    "quran": {
               image: "https://tse2.mm.bing.net/th/id/OIP.5d5lKgbYNLODsrQxta3rHwHaHo?r=0&pid=ImgDet&w=206&h=212&c=7&dpr=1.3&o=7&rm=3",

        artist: "yousaf"
    },
    "jihad": {
                image: "https://tse3.mm.bing.net/th/id/OIP.zchEbs_047W17Y7IRacA3wHaHa?r=0&pid=ImgDet&w=206&h=206&c=7&dpr=1.3&o=7&rm=3",
                 artist: "yousaf"
    },
    "Rooh ki ghiza": {
        image: "https://tse2.mm.bing.net/th/id/OIP.X-M5NTDMNhSQigsESSp-oQHaHa?r=0&w=736&h=736&rs=1&pid=ImgDetMain&o=7&rm=3",
        artist: "Al-Kundary"
    },
    "khamoshi": {
        image: "https://tse4.mm.bing.net/th/id/OIP.0gRnSDM0AYi4Y5AI7MPuIwAAAA?r=0&pid=ImgDet&w=206&h=206&c=7&dpr=1.3&o=7&rm=3",
        artist: "as-sudais"
    },
    "kalam-e-pak": {
        image: "https://th.bing.com/th?q=Quran+Book+Wallpaper&w=120&h=120&c=1&rs=1&qlt=70&r=0&o=7&cb=1&dpr=1.3&pid=InlineBlock&rm=3&mkt=en-WW&cc=PK&setlang=en&adlt=moderate&t=1&mw=247",
        artist: "as-sudais"

    },
    "Dil ki sada": {
        image: "https://tse4.mm.bing.net/th/id/OIP.v3gEddNiRNWLYnEjsSiAIAHaHa?r=0&w=640&h=640&rs=1&pid=ImgDetMain&o=7&rm=3",
        artist: "yousaf"
    },
    "Noor-e-Quran": {
               image: "https://tse3.mm.bing.net/th/id/OIP.VZTcwzDwXPphxeR8caGNngHaHa?r=0&pid=ImgDet&w=206&h=206&c=7&dpr=1.3&o=7&rm=3",

        artist: "yousaf"
    },
    "junoon-e-shahadat": {
                image: "https://www.bing.com/th/id/OIP.kvDm3BSlqAHPlLNKtqmGCAHaHa?w=193&h=193&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=ImgAns&rm=2",
                 artist: "yousaf"
    }
}
async function displayAlbums() {
    let folders = await getFolders()
    let cardCont = document.querySelector(".cardCont")
    cardCont.innerHTML = ""

    for (const folderObj of folders) {
        // agar us folder ka metadata mile to use karo, warna default rakho
        let meta = folderMeta[folderObj.raw] || { image: "music.svg", artist: "Unknown Artist" }
        let card = document.createElement("div")
        card.className = "card m-1 p-1 rounded"
        card.innerHTML = `
            <div class="play">
                <svg data-encore-id="icon" role="img" aria-hidden="true" class="e-10451-icon" filled="bg-black" viewBox="0 0 24 24">
                    <path d="m7.05 3.606 13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606"></path>
                </svg>
            </div>
            <img src="${meta.image}" alt="">
            <h2>${folderObj.display}</h2>
            <p>${meta.artist}</p>
        `

        card.addEventListener("click", async () => {
            quran = await getquran(folderObj.raw)
            if (quran.length === 0) {
                alert("Is folder mein koi mp3 nahi mili")
                return
            }
            renderquranList()
            playrecitation(quran[0], true)
        })

        cardCont.appendChild(card)
    }
}
const playrecitation = (rec, pause = false) => {
    // let audio = new Audio("/quran/" + rec);
    // audio.play()
    currentquran.src = rec.url
    if (!pause) {
        currentquran.play();
        play.src = "pause.svg"

    }


    document.querySelector(".surahinfo").innerHTML = decodeURIComponent(rec.name)
    document.querySelector(".surahtime").innerHTML = "00:00/00:00"

}

async function renderquranList() {



    // show all the sursh in playlist

    let quranul = document.querySelector(".quranlist").getElementsByTagName("ul")[0]
    quranul.innerHTML = ""
    //  (1)to(6) no hn inko space mn convert krne k lie ye use hota h=>
    // <div>${quranpak.name.replaceAll(/\([1-6]\)/g, "")}</div>


    for (const quranpak of quran) {

        // for object    quranul.innerHTML = quranul.innerHTML + ` <li>


        let li = document.createElement("li")
        li.innerHTML = `
    <img class="invert" src="music.svg" alt="">
                                <div class="info">

                                    <div>${quranpak.name.replaceAll(/\([1-6]\)/g, "")}</div>
                                   <div>Al-kundary  </div>
                                </div>
                                <div class="playnow">
                                    <span>play now</span>
                                    <img src="playbar.svg" alt="">
                                </div> </li>`;


        li.addEventListener("click", () => {
            // agr hm next previous mn currentindex use kren to ye zarori h=>
            // currentIndex = i;
            playrecitation(quranpak)
        })
        quranul.appendChild(li)
    }

}



async function main() {
    await displayAlbums()
    // Default: pehla folder khud-ba-khud load karo, taake library khaali na lage
    let folders = await getFolders()
    if (folders.length > 0) {
        quran = await getquran(folders[0].raw)   // pehle folder ki surahs
        if (quran.length > 0) {
            renderquranList()
            playrecitation(quran[0], true)   // load karo, autoplay nahi
        }
    }

    // let play =document.querySelector(".playbtn")
    play.addEventListener("click", () => {
        if (currentquran.paused) {
            currentquran.play()
            play.src = "pause.svg"
        } else {
            currentquran.pause()

            play.src = "play.svg"
        }
    })

    // addEventListener to time =>
    currentquran.addEventListener("timeupdate", () => {
        // console.log(currentquran.currentTime, currentquran.duration);
        document.querySelector(".surahtime").innerHTML = `${secondsToMinutesSeconds(currentquran.currentTime)} / ${secondsToMinutesSeconds(currentquran.duration)}`
        document.querySelector(".circle").style.left = (currentquran.currentTime / currentquran.duration) * 100 + "%"

    })
    // addEventListener to seekbar =>
    document.querySelector(".seekbar").addEventListener("click", (e) => {

        // console.log(e.offsetX / e.target.getBoundingClientRect().width) * 100
        let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100

        // cirle ko click krne pr age peeche krtna =>
        // document.querySelector(".circle").style.left=(e.offsetX /e.target.getBoundingClientRect().width )*100+"%"
        document.querySelector(".circle").style.left = (percent) + "%"
        currentquran.currentTime = ((currentquran.duration) * percent) / 100

    })


    // addEventListener to hamburger =>

    document.querySelector(".hamburger").addEventListener("click", (e) => {

        document.querySelector(".left").style.left = "0"
    })

    // addEventListener to close =>

    document.querySelector(".close").addEventListener("click", (e) => {

        document.querySelector(".left").style.left = "-120%"



    })


    // second method findIndex ye condition check krta h ye dhonta h=>
    // addEventListener to previous =>
    previous.addEventListener("click", () => {
        console.log('click ');
        let index = quran.findIndex(q => q.url === currentquran.src)
        if ((index - 1) >= 0) {
            playrecitation(quran[index - 1])
        }



    })

    // addEventListener to next =>
    next.addEventListener("click", () => {
        console.log('click ');
        // let index=quran.indexOf(currentquran.src.split("/").slice(-1)[0] );
        let index = quran.findIndex(q => q.url === currentquran.src)

        if ((index + 1) < quran.length) {
            playrecitation(quran[index + 1])
        }


    })

    document.querySelector(".range").getElementsByTagName("input")[0].addEventListener("change", (e) => {
        console.log("setting volume to", e.target.value, "/100");
        currentquran.volume = parseInt(e.target.value) / 100
        let volumeico = document.querySelector(".volume img")

        if (e.target.value == 0) {
            volumeico.src = "mute.svg"
        } else {

            volumeico.src = "volume.svg"
        }



    })

}

main()




