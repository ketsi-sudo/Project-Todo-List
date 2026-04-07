

// sidebar function
const openBtn = document.querySelector(".openbtn")
openBtn.addEventListener("click", openNav)

function openNav() {
    document.getElementById("mySidebar").style.width = "250px";
    document.querySelector(".main").style.marginLeft = "250px";
}


const closeBtn = document.querySelector(".closebtn")
closeBtn.addEventListener("click", closeNav)
function closeNav() {
    document.getElementById("mySidebar").style.width = "0";
    document.querySelector(".main").style.marginLeft= "0";
}


