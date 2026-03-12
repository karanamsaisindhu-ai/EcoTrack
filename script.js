let xp = localStorage.getItem("xp") || 0
let streak = localStorage.getItem("streak") || 0
let co2 = localStorage.getItem("co2") || 0
let activities = JSON.parse(localStorage.getItem("activities")) || []

const keywords = [
"recycle",
"plastic",
"walk",
"transport",
"bus",
"bike",
"electricity",
"water",
"plant",
"tree",
"bag"
]

const tips = [
"Recycling one aluminium can saves enough energy to run a TV for 3 hours.",
"Using public transport can reduce carbon emissions by 45%.",
"LED bulbs use 75% less energy than traditional bulbs.",
"Carrying a reusable bottle reduces plastic waste.",
"Walking short distances reduces pollution and improves health."
]

function login(){

let name = document.getElementById("nameInput").value
let email = document.getElementById("emailInput").value

if(name=="" || email==""){
alert("Please enter name and email")
return
}

localStorage.setItem("name",name)
localStorage.setItem("email",email)

document.getElementById("loginPage").style.display="none"
document.getElementById("app").style.display="block"

loadProfile()
render()

}

function showSection(id){

document.querySelectorAll(".section").forEach(s=>{
s.classList.remove("active")
})

document.getElementById(id).classList.add("active")

}

function addActivity(){

let input = document.getElementById("activityInput")
let text = input.value.toLowerCase()

let valid = keywords.some(k => text.includes(k))

if(!valid){
alert("Please enter a valid eco friendly activity")
return
}

activities.push(text)

xp = parseInt(xp) + 10
streak = parseInt(streak) + 1
co2 = parseFloat(co2) + 0.3

localStorage.setItem("activities",JSON.stringify(activities))
localStorage.setItem("xp",xp)
localStorage.setItem("streak",streak)
localStorage.setItem("co2",co2)

input.value=""

render()

}

function render(){

document.getElementById("score").innerText=xp
document.getElementById("totalXP").innerText=xp
document.getElementById("leaderXP").innerText=xp

document.getElementById("streak").innerText=streak

document.getElementById("co2").innerText=co2.toFixed(1)

let level = Math.floor(xp/50)+1

document.getElementById("level").innerText=level

let progress = (xp%50)*2

document.getElementById("progress").style.width=progress+"%"

document.getElementById("totalActivities").innerText=activities.length

let list=document.getElementById("activityList")
list.innerHTML=""

activities.forEach(a=>{
let li=document.createElement("li")
li.innerText=a
list.appendChild(li)
})

newTip()

}

function loadProfile(){

document.getElementById("profileName").innerText=localStorage.getItem("name")
document.getElementById("profileEmail").innerText=localStorage.getItem("email")

}

function newTip(){

let tip=tips[Math.floor(Math.random()*tips.length)]

document.getElementById("ecoTip").innerText=tip

}

document.addEventListener("keypress",function(e){

if(e.key==="Enter"){

if(document.activeElement.id==="activityInput"){

addActivity()

}

}

})

if(localStorage.getItem("name")){

document.getElementById("loginPage").style.display="none"
document.getElementById("app").style.display="block"

loadProfile()
render()

}