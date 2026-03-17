const API =
"https://opensheet.elk.sh/16IveyFW68vwyVHRIVH9MU0Jblh6HjUQ3PQU_QiE2C8c/videos"

let videos=[]

async function loadVideos(){
  try{
    const res = await fetch(API)
    const data = await res.json()

    console.log("DATA:", data) // ⬅️ DEBUG

    videos = data

    renderUpcoming()
    renderCategories()

    if(document.getElementById("homeGrid"))
      renderHome()

    if(document.getElementById("mediaGrid")){
      const params = new URLSearchParams(window.location.search)
      const cat = params.get("cat")

      if(cat){
        const filtered = videos.filter(v => v.type === cat)
        renderMedia(filtered)
      }else{
        renderMedia()
      }
    }

  }catch(err){
    console.error("ERROR FETCH:", err)
  }
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

const ch =
Object.entries(channels)
.find(([name]) => v.channel && v.channel.includes(name))?.[1] || {}

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

const filtered =
videos.filter(v=>v.duration)

const sorted=[...filtered].sort((a,b)=>
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

const row = document.getElementById("categoryRow")
if(!row) return

const cats = [...new Set(videos.map(v=>v.type))]

if(row.classList.contains("category-scroll")){

row.innerHTML =
'<button onclick="renderMedia()">All</button>' +
cats.map(cat =>
`<button onclick="goToCategory('${cat}')">${cat}</button>`
).join("")

return
}

row.innerHTML = cats.map(cat => {

const count = videos.filter(v=>v.type===cat).length

return `
<div class="categoryCard" onclick="filterCat('${cat}')">

<div class="catBox">
<h3>${cat}</h3>
<p>${count} videos</p>
</div>

</div>
`

}).join("")

}

function goToCategory(cat){
  window.location.href = `media.html?cat=${encodeURIComponent(cat)}`
}

/*UPCCOMING*/
function renderUpcoming(){

const upcoming = videos.filter(v=>!v.duration)

const grid=document.getElementById("upcomingGrid")

if(!grid) return

grid.innerHTML =
upcoming.map(card).join("")

}

/*Media*/
function renderMedia(list=videos){

const grid=document.getElementById("mediaGrid")

if(!grid) return

const sorted=[...list].sort((a,b)=>
new Date(b.date) - new Date(a.date)
)

grid.innerHTML =
sorted.map(card).join("")

}

/* FILTER */
function filterCat(cat){

const filtered =
videos.filter(v=>v.type===cat)

renderMedia(filtered)

}

/* SIDEBAR */
document.addEventListener("DOMContentLoaded",()=>{

const menuBtn = document.getElementById("menuBtn")
const sidebar = document.getElementById("sidebar")

if(menuBtn && sidebar){

menuBtn.addEventListener("click",()=>{
sidebar.classList.toggle("open")
})

document.addEventListener("click",(e)=>{
if(
sidebar.classList.contains("open") &&
!sidebar.contains(e.target) &&
!menuBtn.contains(e.target)
){
sidebar.classList.remove("open")
}
})

}

})

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

