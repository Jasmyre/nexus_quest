// =======================
// UI Elements
// =======================
const buttons = document.querySelectorAll(
	".button"
) as NodeListOf<HTMLButtonElement>;

const playerHand = document.getElementById("player-hand") as HTMLImageElement;
const robotHand = document.getElementById("robot-hand") as HTMLImageElement;

const rockButton = document.getElementById("rock") as HTMLButtonElement;
const paperButton = document.getElementById("paper") as HTMLButtonElement;
const scissorsButton = document.getElementById("scissors") as HTMLButtonElement;
const skipButton = document.getElementById("skip") as HTMLButtonElement;
const healButton = document.getElementById("heal") as HTMLButtonElement;

// upgrade buttons (assume these exist in your html)
const upgradeStrengthButton = document.getElementById(
	"upgrade-strength"
) as HTMLButtonElement;
const upgradePrecisionButton = document.getElementById(
	"upgrade-precision"
) as HTMLButtonElement;
const upgradeCritButton = document.getElementById(
	"upgrade-crit"
) as HTMLButtonElement;
const upgradeSpeedButton = document.getElementById(
	"upgrade-speed"
) as HTMLButtonElement;
const upgradeDefenseButton = document.getElementById(
	"upgrade-defense"
) as HTMLButtonElement;
const upgradeHealingButton = document.getElementById(
	"upgrade-healing"
) as HTMLButtonElement;

// displays
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

// upgrade points displays (assume these exist)
const playerUpgradePointsDisplay = document.getElementById(
	"player-upgrade-points"
) as HTMLElement;
const robotUpgradePointsDisplay = document.getElementById(
	"robot-upgrade-points"
) as HTMLElement;

const playerUpgradeStrengthDisplay = document.getElementById(
	"player-upgrade-strength-display"
) as HTMLElement;
const playerUpgradePrecisionDisplay = document.getElementById(
	"player-upgrade-precision-display"
) as HTMLElement;
const playerUpgradeCritDisplay = document.getElementById(
	"player-upgrade-crit-display"
) as HTMLElement;
const playerUpgradeSpeedDisplay = document.getElementById(
	"player-upgrade-speed-display"
) as HTMLElement;
const playerUpgradeDefenseDisplay = document.getElementById(
	"player-upgrade-defense-display"
) as HTMLElement;
const playerUpgradeHealingDisplay = document.getElementById(
	"player-upgrade-healing-display"
) as HTMLElement;

const robotUpgradeStrengthDisplay = document.getElementById(
	"robot-upgrade-strength-display"
) as HTMLElement;
const robotUpgradePrecisionDisplay = document.getElementById(
	"robot-upgrade-precision-display"
) as HTMLElement;
const robotUpgradeCriticalDisplay = document.getElementById(
	"robot-upgrade-crit-display"
) as HTMLElement;
const robotUpgradeSpeedDisplay = document.getElementById(
	"robot-upgrade-speed-display"
) as HTMLElement;
const robotUpgradeDefenseDisplay = document.getElementById(
	"robot-upgrade-defense-display"
) as HTMLElement;

// =======================
// Game Constants & Stats
// =======================

const CHOICES = [
	{ name: "rock", src: "/v1rock.svg" },
	{ name: "paper", src: "/v1paper.svg" },
	{ name: "scissors", src: "/v1scissors.svg" },
];

// Score & Round
let playerScoreNum = 0;
let robotScoreNum = 0;
let roundNum = 1;

// Health
let playerHealth = 100;
let robotHealth = 100;
let playerHPLoss = 0;
let robotHPLoss = 0;

// Offensive Stats (starting at 1 for balance; upgrades will add points)
let playerStrength = 1;
let robotStrength = 1;

let playerPrecision = 10; // 1-10, 10 means always hit
let robotPrecision = 10;

let playerCrit = 0; // crit chance out of 10
let robotCrit = 0;

let playerSpeed = 0; // each point reduces incoming damage by 5%
let robotSpeed = 0;

// New Defense Stat (each point reduces damage by 3%)
let playerDefense = 0;
let robotDefense = 0;

// Healing Stat
let playerHealing = 0;
let robotHealing = 0;

// Fatigue & Momentum (range: 0-100)
let playerFatigue = 0;
let robotFatigue = 0;
let playerMomentum = 0;
let robotMomentum = 0;

// Upgrade Points (earned 1 per round)
let playerUpgradePoints = 0;
let robotUpgradePoints = 0;

const WIN_LIMIT = 99;
const DELAY = 1400;

// =======================
// Helper Functions
// =======================

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
		"Defense:",
		playerDefense,
		"Fatigue:",
		playerFatigue,
		"Momentum:",
		playerMomentum,
		"Healing:",
		playerHealing,
		"Upgrade Points:",
		playerUpgradePoints
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
		"Defense:",
		robotDefense,
		"Fatigue:",
		robotFatigue,
		"Momentum:",
		robotMomentum,
		"Healing:",
		robotHealing,
		"Upgrade Points:",
		robotUpgradePoints
	);
}

function updateRound() {
	roundDisplay.textContent = `ROUND: ${roundNum}`;

	playerHPNumberDisplay.textContent = String(playerHealth);
	playerHPDisplay.style.width = `calc(100% - ${playerHPLoss}%)`;
	playerMomentumNumberDisplay.textContent = String(playerMomentum);
	playerMomentumDisplay.style.width = `calc(${playerMomentum}%)`;
	playerFatigueNumberDisplay.textContent = String(playerFatigue);
	playerFatigueDisplay.style.width = `calc(${playerFatigue}%)`;

	robotHPNumberDisplay.textContent = String(robotHealth);
	robotHPDisplay.style.width = `calc(100% - ${robotHPLoss}%)`;
	robotMomentumNumberDisplay.textContent = String(robotMomentum);
	robotMomentumDisplay.style.width = `calc(${robotMomentum}%)`;
	robotFatigueNumberDisplay.textContent = String(robotFatigue);
	robotFatigueDisplay.style.width = `calc(${robotFatigue}%)`;

	playerUpgradePointsDisplay.textContent = `Player 1 upgrade points: ${String(
		playerUpgradePoints
	)}`;
	robotUpgradePointsDisplay.textContent = `Player 2 upgrade points: ${String(
		robotUpgradePoints
	)}`;

	playerUpgradeStrengthDisplay.style.width = `calc(0% + ${playerStrength * 10}%)`;
	playerUpgradePrecisionDisplay.style.width = `calc(0% + ${playerPrecision * 10}%)`;
	playerUpgradeCritDisplay.style.width = `calc(0% + ${playerCrit * 10}%)`;
	playerUpgradeSpeedDisplay.style.width = `calc(0% + ${playerSpeed * 10}%)`;
	playerUpgradeDefenseDisplay.style.width = `calc(0% + ${playerDefense * 10}%)`;
	playerUpgradeHealingDisplay.style.width = `calc(0% + ${playerHealing * 10}%)`;

	logStats();
}

function disableButtons(disable: boolean) {
	buttons.forEach((button) => (button.disabled = disable));
	skipButton.disabled = disable;
	healButton.disabled = disable;
	upgradeStrengthButton.disabled = disable;
	upgradePrecisionButton.disabled = disable;
	upgradeCritButton.disabled = disable;
	upgradeSpeedButton.disabled = disable;
	upgradeDefenseButton.disabled = disable;
	upgradeHealingButton.disabled = disable;
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

// update fatigue & momentum after each round outcome
function updateStatsAfterRound(result: "player" | "robot" | "tie") {
	const fatigueIncrease = 5;
	const tieFatigueIncrease = 3;
	if (result === "player") {
		playerMomentum += 10;
		playerFatigue += fatigueIncrease;
		robotMomentum = 0;
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

// logs detailed breakdown of damage calculations
function logDamageCalculation(
	effectiveStrength: number,
	baseDamage: number,
	critMultiplier: number,
	speedReduction: number,
	defenseReduction: number,
	damageAfterReduction: number,
	finalDamage: number
) {
	console.log("=== Damage Calculation Breakdown ===");
	console.log(`Effective Strength: ${effectiveStrength.toFixed(2)}`);
	console.log(
		`Base Damage: ${baseDamage} (effectiveStrength * variation factor)`
	);
	console.log(`Crit Multiplier: ${critMultiplier}`);
	console.log(
		`Speed Reduction: ${speedReduction.toFixed(2)} (defenderSpeed * 0.05)`
	);
	console.log(
		`Defense Reduction Factor: ${defenseReduction.toFixed(
			2
		)} (1 - defenderDefense * 0.03)`
	);
	console.log(`Damage After Reductions: ${damageAfterReduction.toFixed(2)}`);
	console.log(`Final Damage (rounded): ${finalDamage}`);
	console.log("=====================================");
}

// calculate damage including defense
function calculateDamage(
	attackerStrength: number,
	attackerPrecision: number,
	attackerCrit: number,
	defenderSpeed: number,
	defenderDefense: number,
	attackerFatigue: number,
	attackerMomentum: number
): number {
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

	let baseDamage = Math.floor(
		effectiveStrength * (0.8 + Math.random() * 0.4)
	);
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

	let speedReduction = defenderSpeed * 0.05;
	let damageAfterSpeed = baseDamage * critMultiplier * (1 - speedReduction);
	let defenseReductionFactor = 1 - defenderDefense * 0.03;
	let damageAfterReduction = damageAfterSpeed * defenseReductionFactor;
	const finalDamage = Math.max(Math.floor(damageAfterReduction), 0);

	logDamageCalculation(
		effectiveStrength,
		baseDamage,
		critMultiplier,
		speedReduction,
		defenseReductionFactor,
		damageAfterReduction,
		finalDamage
	);
	return finalDamage;
}

// =======================
// Upgrade System
// =======================

// Player Upgrade Function
function upgradePlayerStat(stat: string): void {
	if (playerUpgradePoints <= 0) {
		console.log("No upgrade points available for player.");
		return;
	}
	switch (stat) {
		case "strength":
			playerStrength++;
			console.log(`Player strength upgraded to ${playerStrength}`);
			break;
		case "precision":
			playerPrecision++;
			console.log(`Player precision upgraded to ${playerPrecision}`);
			break;
		case "crit":
			playerCrit++;
			console.log(`Player crit upgraded to ${playerCrit}`);
			break;
		case "speed":
			playerSpeed++;
			console.log(`Player speed upgraded to ${playerSpeed}`);
			break;
		case "defense":
			playerDefense++;
			console.log(`Player defense upgraded to ${playerDefense}`);
			break;
		case "healing":
			playerHealing++;
			console.log(`Player healing upgraded to ${playerHealing}`);
			break;
		default:
			console.log("Unknown stat");
			return;
	}
	playerUpgradePoints--;
	updateRound();
}

// Robot Upgrade Function (upgrades randomly)
function upgradeRobotStat(stat: string): void {
	switch (stat) {
		case "strength":
			robotStrength++;
			break;
		case "precision":
			robotPrecision++;
			break;
		case "crit":
			robotCrit++;
			break;
		case "speed":
			robotSpeed++;
			break;
		case "defense":
			robotDefense++;
			break;
		case "healing":
			robotHealing++;
			break;
		default:
			break;
	}
	robotUpgradePoints--;
}

function robotAutoUpgrade(): void {
	const stats = [
		"strength",
		"precision",
		"crit",
		"speed",
		"defense",
		"healing",
	];
	// spend all available robot upgrade points randomly
	while (robotUpgradePoints > 0) {
		const stat = stats[Math.floor(Math.random() * stats.length)];
		upgradeRobotStat(stat);
		console.log(
			`Robot upgraded ${stat} to ${eval(
				"robot" + stat.charAt(0).toUpperCase() + stat.slice(1)
			)}`
		);
	}
}

// =======================
// Action Processing
// =======================

type Action =
	| "attack-rock"
	| "attack-paper"
	| "attack-scissors"
	| "skip"
	| "heal";

// get robot action (includes all options)
function getRobotAction(): Action {
	const actions: Action[] = [
		"attack-rock",
		"attack-paper",
		"attack-scissors",
		"skip",
		"heal",
	];
	return actions[Math.floor(Math.random() * actions.length)];
}

function rpsWinner(
	playerMove: string,
	robotMove: string
): "player" | "robot" | "tie" {
	if (playerMove === robotMove) return "tie";
	if (
		(playerMove === "rock" && robotMove === "scissors") ||
		(playerMove === "scissors" && robotMove === "paper") ||
		(playerMove === "paper" && robotMove === "rock")
	) {
		return "player";
	}
	return "robot";
}

// Process a round given player's action; robot chooses action automatically.
function processRound(playerAction: Action) {
	const robotAction = getRobotAction();
	console.log(
		`Player Action: ${playerAction} | Robot Action: ${robotAction}`
	);
	disableButtons(true);
	// toss animation
	playerHand.src = "/v1rock.svg";
	robotHand.src = "/v1rock.svg";
	playerHand.classList.add("toss");
	robotHand.classList.add("toss");

	setTimeout(() => {
		playerHand.classList.remove("toss");
		robotHand.classList.remove("toss");

		if (
			playerAction.startsWith("attack") &&
			robotAction.startsWith("attack")
		) {
			const playerMove = playerAction.split("-")[1];
			const robotMove = robotAction.split("-")[1];
			playerHand.src = `/v1${playerMove}.svg`;
			robotHand.src = `/v1${robotMove}.svg`;

			const outcome = rpsWinner(playerMove, robotMove);
			if (outcome === "tie") {
				console.log("Both attacked and it's a tie! No damage dealt.");
			} else if (outcome === "player") {
				console.log("Player wins the attack!");
				const damage = calculateDamage(
					playerStrength,
					playerPrecision,
					playerCrit,
					robotSpeed,
					robotDefense,
					playerFatigue,
					playerMomentum
				);
				console.log("Damage dealt to robot:", damage);
				robotHPLoss += damage;
				robotHealth = Math.max(100 - robotHPLoss, 0);
			} else {
				console.log("Robot wins the attack!");
				const damage = calculateDamage(
					robotStrength,
					robotPrecision,
					robotCrit,
					playerSpeed,
					playerDefense,
					robotFatigue,
					robotMomentum
				);
				console.log("Damage dealt to player:", damage);
				playerHPLoss += damage;
				playerHealth = Math.max(100 - playerHPLoss, 0);
			}
		} else if (
			playerAction.startsWith("attack") &&
			robotAction === "skip"
		) {
			const playerMove = playerAction.split("-")[1];
			playerHand.src = `/v1${playerMove}.svg`;
			robotHand.src = "/v1rock.svg";
			console.log("Robot skipped!");
			robotFatigue = Math.max(robotFatigue - 10, 0);
			robotMomentum = Math.max(robotMomentum - 5, 0);
			const damage = calculateDamage(
				playerStrength,
				playerPrecision,
				playerCrit,
				robotSpeed,
				robotDefense,
				playerFatigue,
				playerMomentum
			);
			console.log("Damage dealt to robot:", damage);
			robotHPLoss += damage;
			robotHealth = Math.max(100 - robotHPLoss, 0);
		} else if (
			playerAction.startsWith("attack") &&
			robotAction === "heal"
		) {
			const playerMove = playerAction.split("-")[1];
			playerHand.src = `/v1${playerMove}.svg`;
			robotHand.src = "/v1rock.svg";
			console.log("Robot heals!");
			const baseHeal = 5;
			const healAmount = baseHeal + robotHealing * 5;
			robotHealth = Math.min(robotHealth + healAmount, 100);
			console.log(`Robot healed for ${healAmount} HP.`);
			const damage = calculateDamage(
				playerStrength,
				playerPrecision,
				playerCrit,
				robotSpeed,
				robotDefense,
				playerFatigue,
				playerMomentum
			);
			console.log("Damage dealt to robot:", damage);
			robotHPLoss += damage;
			robotHealth = Math.max(100 - robotHPLoss, 0);
		} else if (
			playerAction === "skip" &&
			robotAction.startsWith("attack")
		) {
			playerHand.src = "/v1rock.svg";
			const robotMove = robotAction.split("-")[1];
			robotHand.src = `/v1${robotMove}.svg`;
			console.log("Player skipped!");
			playerFatigue = Math.max(playerFatigue - 10, 0);
			playerMomentum = Math.max(playerMomentum - 5, 0);
			const damage = calculateDamage(
				robotStrength,
				robotPrecision,
				robotCrit,
				playerSpeed,
				playerDefense,
				robotFatigue,
				robotMomentum
			);
			console.log("Damage dealt to player:", damage);
			playerHPLoss += damage;
			playerHealth = Math.max(100 - playerHPLoss, 0);
		} else if (
			playerAction === "heal" &&
			robotAction.startsWith("attack")
		) {
			playerHand.src = "/v1rock.svg";
			const robotMove = robotAction.split("-")[1];
			robotHand.src = `/v1${robotMove}.svg`;
			console.log("Player heals!");
			const baseHeal = 5;
			const healAmount = baseHeal + playerHealing * 5;
			playerHealth = Math.min(playerHealth + healAmount, 100);
			console.log(`Player healed for ${healAmount} HP.`);
			playerMomentum = Math.max(playerMomentum - 5, 0);
			playerFatigue += 5;
			const damage = calculateDamage(
				robotStrength,
				robotPrecision,
				robotCrit,
				playerSpeed,
				playerDefense,
				robotFatigue,
				robotMomentum
			);
			console.log("Damage dealt to player:", damage);
			playerHPLoss += damage;
			playerHealth = Math.max(100 - playerHPLoss, 0);
		} else if (playerAction === "skip" && robotAction === "skip") {
			console.log(
				"Both skipped. Both recover fatigue and lose momentum."
			);
			playerFatigue = Math.max(playerFatigue - 10, 0);
			playerMomentum = Math.max(playerMomentum - 5, 0);
			robotFatigue = Math.max(robotFatigue - 10, 0);
			robotMomentum = Math.max(robotMomentum - 5, 0);
		} else if (playerAction === "heal" && robotAction === "heal") {
			console.log("Both heal.");
			const baseHealPlayer = 5;
			const healAmountPlayer = baseHealPlayer + playerHealing * 5;
			playerHealth = Math.min(playerHealth + healAmountPlayer, 100);
			playerMomentum = Math.max(playerMomentum - 5, 0);
			playerFatigue += 5;
			const baseHealRobot = 5;
			const healAmountRobot = baseHealRobot + robotHealing * 5;
			robotHealth = Math.min(robotHealth + healAmountRobot, 100);
			robotMomentum = Math.max(robotMomentum - 5, 0);
			robotFatigue += 5;
			console.log(
				`Player healed for ${healAmountPlayer} HP, Robot healed for ${healAmountRobot} HP.`
			);
		} else if (
			(playerAction === "skip" && robotAction === "heal") ||
			(playerAction === "heal" && robotAction === "skip")
		) {
			console.log(
				"One skipped and one healed. Both actions resolve separately."
			);
			if (playerAction === "skip") {
				playerFatigue = Math.max(playerFatigue - 10, 0);
				playerMomentum = Math.max(playerMomentum - 5, 0);
				const baseHealRobot = 5;
				const healAmountRobot = baseHealRobot + robotHealing * 5;
				robotHealth = Math.min(robotHealth + healAmountRobot, 100);
				robotMomentum = Math.max(robotMomentum - 5, 0);
				robotFatigue += 5;
				console.log(
					`Player skipped; Robot healed for ${healAmountRobot} HP.`
				);
			} else {
				robotFatigue = Math.max(robotFatigue - 10, 0);
				robotMomentum = Math.max(robotMomentum - 5, 0);
				const baseHealPlayer = 5;
				const healAmountPlayer = baseHealPlayer + playerHealing * 5;
				playerHealth = Math.min(playerHealth + healAmountPlayer, 100);
				playerMomentum = Math.max(playerMomentum - 5, 0);
				playerFatigue += 5;
				console.log(
					`Robot skipped; Player healed for ${healAmountPlayer} HP.`
				);
			}
		}

		// Award 1 upgrade point per round to both
		playerUpgradePoints++;
		robotUpgradePoints++;
		// let robot automatically spend its upgrade points randomly
		robotAutoUpgrade();

		updateStatsAfterRound("tie");
		checkWin();
		roundNum++;
		updateRound();
		disableButtons(false);
	}, DELAY);
}

rockButton.addEventListener("click", () => processRound("attack-rock"));
paperButton.addEventListener("click", () => processRound("attack-paper"));
scissorsButton.addEventListener("click", () => processRound("attack-scissors"));
skipButton.addEventListener("click", () => processRound("skip"));
healButton.addEventListener("click", () => processRound("heal"));

upgradeStrengthButton.addEventListener("click", () =>
	upgradePlayerStat("strength")
);
upgradePrecisionButton.addEventListener("click", () =>
	upgradePlayerStat("precision")
);
upgradeCritButton.addEventListener("click", () => upgradePlayerStat("crit"));
upgradeSpeedButton.addEventListener("click", () => upgradePlayerStat("speed"));
upgradeDefenseButton.addEventListener("click", () =>
	upgradePlayerStat("defense")
);
upgradeHealingButton.addEventListener("click", () =>
	upgradePlayerStat("healing")
);

updateRound();
