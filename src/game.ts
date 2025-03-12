const { log } = console;

log("hello");

const rockSrc = "/v1rock.svg";
const paperSrc = "/v1paper.svg";
const scissorsSrc = "/v1scissors.svg";

const button = document.querySelectorAll(
  ".button"
) as NodeListOf<HTMLButtonElement>;

const playerHand = document.getElementById("player-hand") as HTMLImageElement;
const robotHand = document.getElementById("robot-hand") as HTMLImageElement;

const rockButton = document.getElementById("rock") as HTMLButtonElement;
const paperButton = document.getElementById("paper") as HTMLButtonElement;
const scissorsButton = document.getElementById("scissors") as HTMLButtonElement;

const playerHPDisplay = document.getElementById(
  "player-hp-display"
) as HTMLElement;
const robotHPDisplay = document.getElementById(
  "robot-hp-display"
) as HTMLElement;

// const playerScore = document.getElementById("player-score");
// const robotScore = document.getElementById("robot-score");
const round = document.getElementById("round") as HTMLElement;

// const search = window.location.search;
// const queries = new URLSearchParams(search);

// const player1 = queries.get("player1");
// const player2 = queries.get("player2");

// const choices = ["rock", "paper", "scissors"];
const CHOICES = [
  {
    name: "rock",
    src: "/v1rock.svg",
  },
  {
    name: "paper",
    src: "/v1paper.svg",
  },
  {
    name: "scissors",
    src: "/v1scissors.svg",
  },
];

let playerScoreNum = 0;
let robotScoreNum = 0;
let roundNum = 1;
let playerWon = false;

let playerHealth = 100;
let robotHealth = 100;

let playerHPLoss = 0;
let robotHPLoss = 0;

let playerStrength = 1;
let playerLuck = 1;
let playerSpeed = 1;

let robotStrength = 1;
let robotLuck = 1;
let robotSpeed = 1;

const logStats = () => {
  console.log("player hp: ", playerHealth);
  console.log("player st: ", playerStrength);
  console.log("player lc: ", playerLuck);
  console.log("player sp: ", playerSpeed);

  console.log("robot hp: ", robotHealth);
  console.log("robot st: ", robotStrength);
  console.log("robot lc: ", robotLuck);
  console.log("robot sp: ", robotSpeed);
};

const updateRound = () => {
  // playerScore.textContent = `SCORE: ${playerScoreNum}`;
  // robotScore.textContent = `SCORE: ${robotScoreNum}`;
  round.textContent = `ROUND: ${roundNum}`;
  console.log(playerHPDisplay);
  playerHPDisplay.style.width = `calc(100% - ${playerHPLoss}%)`;
  robotHPDisplay.style.width = `calc(100% - ${robotHPLoss}%)`;

  logStats();
};

let winLimit = 99;

updateRound();
console.log(roundNum);

const rock = () => {
  console.log("rock");

  const randomChoice = Math.floor(Math.random() * 3);
  const robotChoice = CHOICES[randomChoice];

  const playerSelection = rockButton.id;
  const computerSelection = robotChoice.name;

  const playerChoice = `Player: ${playerSelection}`;
  const computerChoice = `Computer: ${computerSelection}`;

  log(playerChoice);
  log(computerChoice);

  playerHand.src = rockSrc;
  robotHand.src = rockSrc;

  playerHand.classList.add("toss");
  robotHand.classList.add("toss");

  button.forEach((button) => {
    button.disabled = true;
  });

  setTimeout(() => {
    playerHand.src = rockSrc;
    robotHand.src = robotChoice.src;

    playerHand.classList.remove("toss");
    robotHand.classList.remove("toss");

    if (playerSelection === computerSelection) {
      const result = "It's a tie!";
      log(result);
    } else if (
      (playerSelection === "rock" && computerSelection === "scissors") ||
      (playerSelection === "paper" && computerSelection === "rock") ||
      (playerSelection === "scissors" && computerSelection === "paper")
    ) {
      const result = "You win!";
      const luck = Math.floor(Math.random() * (10 - playerLuck));
      
      playerScoreNum++;
      robotHPLoss += playerStrength;
      robotHealth = 100 - robotHPLoss;
      log(result);
    } else {
      const result = "You lose.";
      robotScoreNum++;
      playerHPLoss += robotStrength;
      playerHealth = 100 - playerHPLoss;
      log(result);
    }

    if (playerScoreNum >= winLimit) {
      window.location.href =
        "/rock-paper-scissors/history/index.html?playerWon=true";
    } else if (robotScoreNum >= winLimit) {
      window.location.href =
        "/rock-paper-scissors/history/index.html?playerWon=false";
    }

    roundNum = roundNum + 1;
    updateRound();

    button.forEach((button) => {
      button.disabled = false;
    });
  }, 1400);
};

const paper = () => {
  console.log("paper");

  const randomChoice = Math.floor(Math.random() * 3);
  const robotChoice = CHOICES[randomChoice];

  const playerSelection = paperButton.id;
  const computerSelection = robotChoice.name;

  // const playerChoice = `Player: ${playerSelection}`;
  // const computerChoice = `Computer: ${computerSelection}`;

  // log(playerChoice);
  // log(computerChoice);

  playerHand.src = rockSrc;
  robotHand.src = rockSrc;

  playerHand.classList.add("toss");
  robotHand.classList.add("toss");

  button.forEach((button) => {
    button.disabled = true;
  });

  setTimeout(() => {
    playerHand.src = paperSrc;
    robotHand.src = robotChoice.src;

    playerHand.classList.remove("toss");
    robotHand.classList.remove("toss");

    if (playerSelection === computerSelection) {
      const result = "It's a tie!";
      log(result);
    } else if (
      (playerSelection === "rock" && computerSelection === "scissors") ||
      (playerSelection === "paper" && computerSelection === "rock") ||
      (playerSelection === "scissors" && computerSelection === "paper")
    ) {
      const result = "You win!";
      playerScoreNum++;
      robotHPLoss += playerStrength;
      robotHealth = 100 - robotHPLoss;
      log(result);
    } else {
      const result = "You lose.";
      robotScoreNum++;
      playerHPLoss += robotStrength;
      playerHealth = 100 - playerHPLoss;
      log(result);
    }

    if (playerScoreNum >= winLimit) {
      window.location.href =
        "/rock-paper-scissors/history/index.html?playerWon=true";
    } else if (robotScoreNum >= winLimit) {
      window.location.href =
        "/rock-paper-scissors/history/index.html?playerWon=false";
    }

    roundNum = roundNum + 1;
    updateRound();

    button.forEach((button) => {
      button.disabled = false;
    });
  }, 1400);
};

const scissors = () => {
  console.log("scissors");

  const randomChoice = Math.floor(Math.random() * 3);
  const robotChoice = CHOICES[randomChoice];

  const playerSelection = scissorsButton.id;
  const computerSelection = robotChoice.name;

  const playerChoice = `Player: ${playerSelection}`;
  const computerChoice = `Computer: ${computerSelection}`;

  log(playerChoice);
  log(computerChoice);

  playerHand.src = rockSrc;
  robotHand.src = rockSrc;

  playerHand.classList.add("toss");
  robotHand.classList.add("toss");

  button.forEach((button) => {
    button.disabled = true;
  });

  setTimeout(() => {
    playerHand.src = scissorsSrc;
    robotHand.src = robotChoice.src;

    playerHand.classList.remove("toss");
    robotHand.classList.remove("toss");

    if (playerSelection === computerSelection) {
      const result = "It's a tie!";
      log(result);
    } else if (
      (playerSelection === "rock" && computerSelection === "scissors") ||
      (playerSelection === "paper" && computerSelection === "rock") ||
      (playerSelection === "scissors" && computerSelection === "paper")
    ) {
      const result = "You win!";
      playerScoreNum++;
      robotHPLoss += playerStrength;
      robotHealth = 100 - robotHPLoss;
      log(result);
    } else {
      const result = "You lose.";
      robotScoreNum++;
      playerHPLoss += robotStrength;
      playerHealth = 100 - playerHPLoss;
      log(result);
    }

    if (playerScoreNum >= winLimit) {
      window.location.href =
        "/rock-paper-scissors/history/index.html?playerWon=true";
    } else if (robotScoreNum >= winLimit) {
      window.location.href =
        "/rock-paper-scissors/history/index.html?playerWon=false";
    }

    roundNum = roundNum + 1;
    updateRound();

    button.forEach((button) => {
      button.disabled = false;
    });
  }, 1400);
};

rockButton.addEventListener("click", () => {
  rock();
});

paperButton.addEventListener("click", () => {
  paper();
});

scissorsButton.addEventListener("click", () => {
  scissors();
});
