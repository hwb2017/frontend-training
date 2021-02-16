const container = document.querySelector(".container");
const allSeats = document.querySelectorAll(".container .seat");
const seats = document.querySelectorAll(".container .seat:not(.occupied)");
const count = document.getElementById("count");
const total = document.getElementById("total");
const movie = document.getElementById("movie");
var ticketPrice = +movie.value;

function populateUI() {
    const selectedSeats = JSON.parse(window.localStorage.getItem("selectedSeats"));
    if (selectedSeats !== null && selectedSeats.length > 0) {
        allSeats.forEach((seat, index) => {
            if (selectedSeats.indexOf(index) > -1) {
                seat.classList.add("selected");
            }
        })
    }
    const selectedMovieIndex = window.localStorage.getItem("selectedMovieIndex");
    if (selectedMovieIndex !== "") {
        movie.selectedIndex = selectedMovieIndex;
        ticketPrice = +movie.value;
    }
}

function updateSelectedCount() {
    const selectedSeats = document.querySelectorAll(".container .seat.selected");
    const selectedCount = selectedSeats.length;
    const seatsIndex = [...selectedSeats].map(seat => [...allSeats].indexOf(seat));
    window.localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));
    count.innerText = selectedCount;
    total.innerText = selectedCount * ticketPrice;
}

// become selected after click
container.addEventListener("click", (e) => {
   if (e.target.classList.contains("seat") &&
   !e.target.classList.contains("occupied")) {
       e.target.classList.toggle("selected");
       updateSelectedCount();
   };
});

// change ticketPrice and total when movie changed
movie.addEventListener("change", (e) => {
    ticketPrice = +movie.value;
    updateSelectedCount();
    window.localStorage.setItem("selectedMovieIndex", e.target.selectedIndex);
});

populateUI();
updateSelectedCount();