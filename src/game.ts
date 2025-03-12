const buttons = document.querySelectorAll(
	".button"
) as NodeListOf<HTMLButtonElement>;

const playerHand = document.getElementById("player-hand") as HTMLImageElement;
const robotHand = document.getElementById("robot-hand") as HTMLImageElement;

const rockButton = document.getElementById("rock") as HTMLButtonElement;
const paperButton = document.getElementById("paper") as HTMLButtonElement;
const scissorsButton = document.getElementById("scissors") as HTMLButtonElement;
const skipButton = document.getElementById("skip") as HTMLButtonElement;

const playerHPNumberDisplay = document.getElementById(
	"player-hp-number"
) as HTMLElement;
const robotHPNumberDisplay = document.getElementById(
	"robot-hp-number"
) as HTMLElement;

const playerHPDisplay = document.getElementById(
	"player-hp-display"
) as HTMLElement;
const robotHPDisplay = document.getElementById(
	"robot-hp-display"
) as HTMLElement;
const roundDisplay = document.getElementById("round") as HTMLElement;

const playerMomentumNumberDisplay = document.getElementById(
	"player-momentum-number"
) as HTMLElement;
const robotMomentumNumberDisplay = document.getElementById(
	"robot-momentum-number"
) as HTMLElement;

const playerMomentumDisplay = document.getElementById(
	"player-momentum-display"
) as HTMLElement;
const robotMomentumDisplay = document.getElementById(
	"robot-momentum-display"
) as HTMLElement;

const playerFatigueNumberDisplay = document.getElementById(
	"player-fatigue-number"
) as HTMLElement;
const robotFatigueNumberDisplay = document.getElementById(
	"robot-fatigue-number"
) as HTMLElement;

const playerFatigueDisplay = document.getElementById(
	"player-fatigue-display"
) as HTMLElement;
const robotFatigueDisplay = document.getElementById(
	"robot-fatigue-display"
) as HTMLElement;

const CHOICES = [
	{ name: "rock", src: "/v1rock.svg" },
	{ name: "paper", src: "/v1paper.svg" },
	{ name: "scissors", src: "/v1scissors.svg" },
];

let playerScoreNum = 0;
let robotScoreNum = 0;
let roundNum = 1;

let playerHealth = 100;
let robotHealth = 100;
let playerHPLoss = 0;
let robotHPLoss = 0;

let playerStrength = 50;
let robotStrength = 50;

let playerPrecision = 10; // 1-10, 10 means always hit
let robotPrecision = 10;

let playerCrit = 5; // crit chance out of 10 (5 means 50% chance)
let robotCrit = 2;

let playerSpeed = 7; // each point reduces incoming damage by 5%
let robotSpeed = 3;

// new stats for fatigue and momentum (range: 0-100)
let playerFatigue = 0;
let robotFatigue = 0;
let playerMomentum = 0;
let robotMomentum = 0;

const WIN_LIMIT = 99;
const DELAY = 1400;

function logStats() {
	console.log(
		"Player HP:",
		playerHealth,
		"Strength:",
		playerStrength,
		"Precision:",
		playerPrecision,
		"Crit:",
		playerCrit,
		"Speed:",
		playerSpeed,
		"Fatigue:",
		playerFatigue,
		"Momentum:",
		playerMomentum
	);
	console.log(
		"Robot HP:",
		robotHealth,
		"Strength:",
		robotStrength,
		"Precision:",
		robotPrecision,
		"Crit:",
		robotCrit,
		"Speed:",
		robotSpeed,
		"Fatigue:",
		robotFatigue,
		"Momentum:",
		robotMomentum
	);
}

function updateRound() {
	roundDisplay.textContent = `ROUND: ${roundNum}`;

	playerHPNumberDisplay.textContent = String(playerHealth);
	playerHPDisplay.style.width = `calc(100% - ${playerHPLoss}%)`;
	playerMomentumNumberDisplay.textContent = String(playerMomentum);
	playerMomentumDisplay.style.width = `calc(0% + ${playerMomentum}%)`;
	playerFatigueNumberDisplay.textContent = String(playerFatigue);
	playerFatigueDisplay.style.width = `calc(0% + ${playerFatigue}%)`;

	robotHPNumberDisplay.textContent = String(robotHealth);
	robotHPDisplay.style.width = `calc(100% - ${robotHPLoss}%)`;
	robotMomentumNumberDisplay.textContent = String(robotMomentum);
	robotMomentumDisplay.style.width = `calc(0% + ${robotMomentum}%)`;
	robotFatigueNumberDisplay.textContent = String(robotFatigue);
	robotFatigueDisplay.style.width = `calc(0% + ${robotFatigue}%)`;

	logStats();
}

function disableButtons(disable: boolean) {
	buttons.forEach((button) => (button.disabled = disable));
	skipButton.disabled = disable;
}

function checkWin() {
	if (robotHealth <= 0) {
		window.location.href =
			"/rock-paper-scissors/history/index.html?playerWon=true";
	} else if (playerHealth <= 0) {
		window.location.href =
			"/rock-paper-scissors/history/index.html?playerWon=false";
	}
}

function updateStatsAfterRound(result: "player" | "robot" | "tie") {
	const fatigueIncrease = 5;
	const tieFatigueIncrease = 3;
	if (result === "player") {
		playerMomentum += 10; // win boosts momentum
		playerFatigue += fatigueIncrease;
		robotMomentum = 0; // opponent loses momentum
		robotFatigue += fatigueIncrease;
	} else if (result === "robot") {
		robotMomentum += 10;
		robotFatigue += fatigueIncrease;
		playerMomentum = 0;
		playerFatigue += fatigueIncrease;
	} else {
		playerFatigue += tieFatigueIncrease;
		robotFatigue += tieFatigueIncrease;
	}

	playerFatigue = Math.min(Math.max(playerFatigue, 0), 100);
	robotFatigue = Math.min(Math.max(robotFatigue, 0), 100);
	playerMomentum = Math.min(Math.max(playerMomentum, 0), 100);
	robotMomentum = Math.min(Math.max(robotMomentum, 0), 100);
}

// this function logs a detailed breakdown of the damage calculation steps
function logDamageCalculation(
	effectiveStrength: number,
	baseDamage: number,
	critMultiplier: number,
	speedReduction: number,
	damageAfterReduction: number,
	finalDamage: number
) {
	console.log("=== Damage Calculation Breakdown ===");
	console.log(`Effective Strength: ${effectiveStrength.toFixed(2)}`);
	console.log(
		`Base Damage: ${baseDamage} (calculated as effectiveStrength * variation factor)`
	);
	console.log(`Crit Multiplier: ${critMultiplier}`);
	console.log(
		`Speed Reduction: ${speedReduction.toFixed(2)} (defenderSpeed * 0.05)`
	);
	console.log(`Damage After Reduction: ${damageAfterReduction.toFixed(2)}`);
	console.log(`Final Damage (rounded): ${finalDamage}`);
	console.log("=====================================");
}

function calculateDamage(
	attackerStrength: number,
	attackerPrecision: number,
	attackerCrit: number,
	defenderSpeed: number,
	attackerFatigue: number,
	attackerMomentum: number
): number {
	// adjust stats based on fatigue and momentum
	const effectiveStrength =
		attackerStrength *
		(1 + attackerMomentum / 100) *
		(1 - attackerFatigue / 100);
	const effectivePrecision =
		attackerPrecision *
		(1 - attackerFatigue / 100) *
		(1 + attackerMomentum / 100);
	const effectiveCrit =
		attackerCrit *
		(1 + attackerMomentum / 100) *
		(1 - attackerFatigue / 100);

	// roll to see if attack lands
	const hitRoll = Math.random();
	if (hitRoll >= effectivePrecision / 10) {
		console.log(
			`Attack missed! Hit roll: ${hitRoll.toFixed(2)} vs threshold: ${(
				effectivePrecision / 10
			).toFixed(2)} (Effective Precision: ${effectivePrecision.toFixed(
				2
			)})`
		);
		return 0;
	}

	// calculate base damage with some variation
	let baseDamage = Math.floor(
		effectiveStrength * (0.8 + Math.random() * 0.4)
	);

	// check for a critical hit
	const critRoll = Math.random();
	let critMultiplier = 1;
	if (critRoll < effectiveCrit / 10) {
		critMultiplier = 1.5;
		console.log(
			`Critical hit! Crit roll: ${critRoll.toFixed(2)} vs threshold: ${(
				effectiveCrit / 10
			).toFixed(2)} (Effective Crit: ${effectiveCrit.toFixed(2)})`
		);
	}

	// reduce damage based on defender's speed (each point reduces 5%)
	let speedReduction = defenderSpeed * 0.05;
	let damageAfterReduction =
		baseDamage * critMultiplier * (1 - speedReduction);

	const finalDamage = Math.max(Math.floor(damageAfterReduction), 0);

	// log detailed math breakdown
	logDamageCalculation(
		effectiveStrength,
		baseDamage,
		critMultiplier,
		speedReduction,
		damageAfterReduction,
		finalDamage
	);

	return finalDamage;
}

function playRound(playerSelection: string, playerImageSrc: string) {
	console.log("Player chose:", playerSelection);

	const randomIndex = Math.floor(Math.random() * CHOICES.length);
	const robotChoice = CHOICES[randomIndex];
	console.log("Robot chose:", robotChoice.name);

	// start toss animation
	playerHand.src = "/v1rock.svg";
	robotHand.src = "/v1rock.svg";
	playerHand.classList.add("toss");
	robotHand.classList.add("toss");
	disableButtons(true);

	setTimeout(() => {
		playerHand.src = playerImageSrc;
		robotHand.src = robotChoice.src;
		playerHand.classList.remove("toss");
		robotHand.classList.remove("toss");

		let outcome: "player" | "robot" | "tie" = "tie";

		if (playerSelection === robotChoice.name) {
			console.log("It's a tie!");
			outcome = "tie";
		} else if (
			(playerSelection === "rock" && robotChoice.name === "scissors") ||
			(playerSelection === "paper" && robotChoice.name === "rock") ||
			(playerSelection === "scissors" && robotChoice.name === "paper")
		) {
			console.log("You win!");
			outcome = "player";
			playerScoreNum++;
			const damage = calculateDamage(
				playerStrength,
				playerPrecision,
				playerCrit,
				robotSpeed,
				playerFatigue,
				playerMomentum
			);
			console.log("Damage dealt to robot:", damage);
			robotHPLoss += damage;
			robotHealth = Math.max(100 - robotHPLoss, 0);
		} else {
			console.log("You lose.");
			outcome = "robot";
			robotScoreNum++;
			const damage = calculateDamage(
				robotStrength,
				robotPrecision,
				robotCrit,
				playerSpeed,
				robotFatigue,
				robotMomentum
			);
			console.log("Damage dealt to player:", damage);
			playerHPLoss += damage;
			playerHealth = Math.max(100 - playerHPLoss, 0);
		}

		updateStatsAfterRound(outcome);
		checkWin();
		roundNum++;
		updateRound();
		disableButtons(false);
	}, DELAY);
}

function skipTurn() {
	console.log("Player chose to skip the turn.");
	disableButtons(true);
	playerFatigue = Math.max(playerFatigue - 10, 0);
	playerMomentum = Math.max(playerMomentum - 5, 0);
	console.log(
		"After skipping, player's fatigue:",
		playerFatigue,
		"momentum:",
		playerMomentum
	);

	setTimeout(() => {
		const damage = calculateDamage(
			robotStrength,
			robotPrecision,
			robotCrit,
			playerSpeed,
			robotFatigue,
			robotMomentum
		);
		console.log("Robot attacks during skip, damage dealt:", damage);
		playerHPLoss += damage;
		playerHealth = Math.max(100 - playerHPLoss, 0);

		robotFatigue += 5;
		if (damage > 0) {
			robotMomentum += 10;
		}
		updateStatsAfterRound("tie");
		checkWin();
		roundNum++;
		updateRound();
		disableButtons(false);
	}, DELAY);
}

rockButton.addEventListener("click", () => playRound("rock", "/v1rock.svg"));
paperButton.addEventListener("click", () => playRound("paper", "/v1paper.svg"));
scissorsButton.addEventListener("click", () =>
	playRound("scissors", "/v1scissors.svg")
);
skipButton.addEventListener("click", () => skipTurn());

updateRound();
