const API = "https://opensheet.elk.sh/16IveyFW68vwyVHRIVH9MU0Jblh6HjUQ3PQU_QiE2C8c/videos"
let videos = []

async function loadVideos(){
const res = await fetch(API)
videos = await res.json()

if(document.getElementById("homeGrid")) renderHome()
if(document.getElementById("upcomingGrid")) renderUpcoming()
if(document.getElementById("mediaGrid")) renderMedia()
if(document.getElementById("categoryRow")) renderCategories()

handleCategoryPage()
handleMemberPage()
}

function card(v){
return `
<div class="video">
<img src="https://i.ytimg.com/vi/${getVideoId(v.url)}/hqdefault.jpg">
<p>${v.title}</p>
</div>`
}

function renderHome(){
const grid = document.getElementById("homeGrid")
const sorted = [...videos].sort((a,b)=>new Date(b.date)-new Date(a.date))
grid.innerHTML = sorted.slice(0,8).map(card).join("")
}

function renderUpcoming(){
const grid = document.getElementById("upcomingGrid")
const upcoming = videos.filter(v=>!v.duration)
grid.innerHTML = upcoming.map(card).join("")
}

function renderMedia(list=videos){
const grid = document.getElementById("mediaGrid")
if(!grid) return
const sorted = [...list].sort((a,b)=>new Date(b.date)-new Date(a.date))
grid.innerHTML = sorted.map(card).join("")
}

function renderCategories(){
const row = document.getElementById("categoryRow")
const cats = [...new Set(videos.map(v=>v.type))]
row.innerHTML = cats.map(c=>`<button onclick="filterCat('${c}')">${c}</button>`).join("")
}

function filterCat(cat){
const filtered = videos.filter(v=>v.type===cat)
renderMedia(filtered)
}

function goToCategory(cat){
window.location.href = `category.html?cat=${cat}`
}

function goToMember(name){
window.location.href = `member.html?member=${name}`
}

function handleCategoryPage(){
const params = new URLSearchParams(window.location.search)
const cat = params.get("cat")
if(cat && document.getElementById("categoryGrid")){
const filtered = videos.filter(v=>v.type===cat)
document.getElementById("categoryTitle").innerText = cat
renderMedia(filtered)
}
}

function handleMemberPage(){
const params = new URLSearchParams(window.location.search)
const member = params.get("member")
if(member && document.getElementById("memberGrid")){
const filtered = videos.filter(v=>v.channel===member)
document.getElementById("memberTitle").innerText = member
renderMedia(filtered)
}
}

function getVideoId(url){
const reg = /(?:v=|youtu.be\/)([^&]+)/
const match = url.match(reg)
return match ? match[1] : ""
}

loadVideos()
