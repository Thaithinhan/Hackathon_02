let players = JSON.parse(localStorage.getItem("players")) ?? [];
let total_player = players.length;

//function render data
function render_player(data) {
  let list_players = document.querySelector("#list_players");
  //   console.log(list_reviews);
  let player_content = "";
  data.forEach((player) => {
    player_content += ` <li>
          <div class="playerName">
            <button class="btn_remove" onclick=remove_player(this,${player.id})>
              <i class="fa-solid fa-xmark"></i>
            </button>
            <i class="fa-solid fa-crown"></i>${player.name}
          </div>
          <div class="more_lessScore">
            <button class="minus" onclick="minus_score(this, ${player.id})">-</button>
            <input type="text" value="${player.score}" />
            <button class="minus" onclick="plus_score(this, ${player.id})">+</button>
          </div>
        </li>`;
  });
  list_players.innerHTML = player_content;
  document.querySelector("#number_player").innerHTML = total_player;
}
render_player(players);

//ADD PLAYER
const formElement = document.querySelector("#form");
let isEdit = false;
formElement.addEventListener("submit", (e) => {
  e.preventDefault();
  let id;
  const name = formElement.querySelector("#input_player").value;

  if (!isEdit) {
    if (players.length > 0) {
      id = players[players.length - 1].id + 1;
    } else {
      id = 1;
    }
    const new_player = {
      id: id,
      name: name,
      score: 0,
    };
    players.push(new_player);
  }
  localStorage.setItem("players", JSON.stringify(players));
  render_player(players);
  formElement.querySelector("#input_player").value = "";
});

//XOÁ người chơi
function remove_player(e, id) {
  players = JSON.parse(localStorage.getItem("players"));
  players.forEach((player, index) => {
    if (player.id == id) {
      players.splice(index, 1);
    }
  });
  localStorage.setItem("players", JSON.stringify(players));
  render_player(players);
}

//EDIT ĐIỂM NGƯỜI CHƠI
function minus_score(e, id) {
  players.forEach((player, index) => {
    if (player.id == id && player.id > 0) {
      player.score = player.score - 1;
      players[index] = { ...player };
    }
  });
  render_player(players);
  localStorage.setItem("players", JSON.stringify(players));
}
function plus_score(e, id) {
  players.forEach((player, index) => {
    if (player.id == id && player.id > 0) {
      player.score = player.score + 1;
      players[index] = { ...player };
    }
  });
  render_player(players);
  localStorage.setItem("players", JSON.stringify(players));
}
//Set đồng hồ nhảy số
let seconds = 0;
let myTime;
function start_clock() {
  myTime = setInterval(function () {
    seconds++;
    document.querySelector("#run-clock").innerHTML = seconds;
  }, 1000);
}

function reset_clock() {
  document.querySelector("#run-clock").innerHTML = 0;
  clearInterval(myTime);
}
function stop_clock() {
  document.querySelector("#run-clock").innerHTML = seconds;
  clearInterval(myTime);
}
