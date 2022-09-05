let reviews=[
{
    id: 1,
    name: "Jessica Montier",
    job: "Desarrolladora web",
    img:"./IMG/jess.jfif",
    text:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel maxime quasi modi exercitationem voluptatibus quis labore, voluptate vitae rem cupiditate reiciendis expedita est, tempora in quas officiis ipsum iusto rerum!",
},
{
    id: 2,
    name: "Frank Castle",
    job: "Desarrollador en Venganza",
    img:"./IMG/frank.jpg",
    text:"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores explicabo, molestias, recusandae nulla accusamus similique cupiditate temporibus autem doloremque repudiandae rerum hic, aut modi? Consequatur corporis tempora soluta recusandae consectetur?",
},
{
    id: 3,
    name: "Anthony Stark",
    job: "Desarrollador Robótico",
    img:"./IMG/tony.jpg",
    text:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo omnis et cupiditate id molestias libero voluptates sint! Ea accusantium molestias temporibus commodi in iste quod ratione, rerum explicabo alias provident.",
},
{
    id: 4,
    name: "Natasha Romanoff",
    job: "Desarrolladora Espia",
    img:"./IMG/natrom.jpg",
    text:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae aliquid quis expedita ipsum, eaque autem distinctio omnis ea inventore error voluptate voluptatum commodi! Blanditiis voluptas molestiae voluptatum consectetur architecto doloribus?",
},];

let img = document.getElementById("person-img");
let author = document.getElementById("author");
let job = document.getElementById("job");
let info = document.getElementById("info");

let prevBtn = document.querySelector(".prev-btn");
let nexBtn = document.querySelector(".next-btn");
let randomBtn = document.querySelector(".random-btn");

let currentItem = 0;

window.addEventListener("DOMContentLoaded", function(){
showPerson();
});

function showPerson(){
    let item = reviews[currentItem]
    img.src = item.img;
    author.textContent = item.name;
    job.textContent = item.job;
    info.textContent = item.text;
}

nexBtn.addEventListener("click", function(){
currentItem++;
if(currentItem > reviews.length - 1){
currentItem = 0;
}
showPerson();
});

prevBtn.addEventListener("click", function(){
currentItem--;
if(currentItem < 0){
currentItem = reviews.length - 1;
}
showPerson();
});

randomBtn.addEventListener("click", function(){
currentItem = Math.floor(Math.random()*reviews.length);
showPerson();
});