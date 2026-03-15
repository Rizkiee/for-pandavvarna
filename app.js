const API =
"https://opensheet.elk.sh/16IveyFW68vwyVHRIVH9MU0Jblh6HjUQ3PQU_QiE2C8c/videos"

let videos=[]

async function loadVideos(){

const res = await fetch(API)
videos = await res.json()

if(document.getElementById("homeGrid"))
renderHome()

if(document.getElementById("mediaGrid"))
renderMedia()

if(document.getElementById("categoryRow"))
renderCategories()

if(document.getElementById("categoryGrid"))
renderCategoryPage()

}

loadVideos()

const channels = {

"Pandavva Official": {
avatar: "https://unavatar.io/youtube/@PANDAVVA",
url: "https://youtube.com/@PANDAVVA"
},

"Sadewa Sagara": {
avatar: "https://unavatar.io/youtube/@Sadewa_Sagara",
url: "https://youtube.com/@sadewa_sagara"
},

"Nakula Nalendra": {
avatar: "https://unavatar.io/youtube/@Nakula_Nalendra",
url: "https://youtube.com/@Nakula_Nalendra"
},

"Arjuna Arkana": {
avatar: "https://unavatar.io/youtube/@Arjuna.Arkana",
url: "https://youtube.com/@Arjuna.Arkana"
},

"Bima Bayusena": {
avatar: "https://unavatar.io/youtube/@BimaBayusena",
url: "https://youtube.com/@BimaBayusena"
},

"Yudistira Yogendra": {
avatar: "https://unavatar.io/youtube/@YudistiraYogendra",
url: "https://youtube.com/@YudistiraYogendra"
}

}

/* VIDEO CARD */
function card(v){

const id = getVideoId(v.url)

const thumb = id
? `https://i.ytimg.com/vi/${id}/hqdefault.jpg`
: ""

const ch = channels[v.channel] || {}

return `

<a class="video" href="${v.url}" target="_blank">

<div class="thumb">
${thumb ? `<img loading="lazy" src="${thumb}">` : ""}
</div>

<h3>${v.title || ""}</h3>

<p class="channel">

${ch.avatar ? `<img class="avatar" src="${ch.avatar}">` : ""}

<span>${v.channel || ""}</span>

</p>

</a>

`

}

/* HOME GRID */

function renderHome(){

const grid=document.getElementById("homeGrid")

const sorted=[...videos].sort((a,b)=>
new Date(b.date) - new Date(a.date)
)

grid.innerHTML=
sorted
.slice(0,8)
.map(card)
.join("")

}


/* CATEGORY ROW */

function renderCategories(){

const row=document.getElementById("categoryRow")

const cats=[...new Set(videos.map(v=>v.type))]

row.innerHTML=

'<button onclick="renderMedia()">All</button>'+

cats.map(c=>

`<button onclick="filterCat('${c}')">${c}</button>`

).join("")

}


/* FILTER */

function filterCat(cat){

const filtered=

videos.filter(v=>v.category===cat)

renderMedia(filtered)

}


/* CATEGORY PAGE */

function renderCategoryPage(){

const grid=document.getElementById("categoryGrid")

const cats=[...new Set(videos.map(v=>v.type))]

grid.innerHTML=

cats.map(c=>

`<div class="catBox">${c}</div>`

).join("")

}


/* SIDEBAR */

const menuBtn=document.getElementById("menuBtn")
const sidebar=document.getElementById("sidebar")

if(menuBtn){

menuBtn.onclick=()=>{

sidebar.classList.toggle("open")

}

}

/*thumbnail*/
function getVideoId(url){

if(!url) return null

const reg =
/(?:youtube\.com\/(?:watch\?v=|embed\/|live\/|shorts\/)|youtu\.be\/)([^?&]+)/

const match = url.match(reg)

return match ? match[1] : null

}

/*home button*/
const homeBtn = document.querySelector(".homeBtn")

if(homeBtn){

homeBtn.onclick = () => {

window.location.href = "index.html"

}

}

