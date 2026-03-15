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


/* VIDEO CARD */

function card(v){

return `
<div class="video">

<img src="${v.thumbnail}">

<h3>${v.title}</h3>

<p>${v.channel}</p>

</div>
`

}


/* HOME GRID */

function renderHome(){

const grid=document.getElementById("homeGrid")

grid.innerHTML=

videos
.slice(0,8)
.map(card)
.join("")

}


/* MEDIA GRID */

function renderMedia(list=videos){

const grid=document.getElementById("mediaGrid")

grid.innerHTML=

list
.map(card)
.join("")

}


/* CATEGORY ROW */

function renderCategories(){

const row=document.getElementById("categoryRow")

const cats=[...new Set(videos.map(v=>v.category))]

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

const cats=[...new Set(videos.map(v=>v.category))]

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
