let number = 0;
let numberElement = null;
let upgradeLevel = 0;
let newUpgradePoint = 10;
let currentIncome = 1;
let currentUpgrades = [];

/*=====================================================================================
MAIN SETUP FUNCTIONS
=======================================================================================*/
main();

function main() {
    setInterval(moneyUpdate, 1000)
    setInterval(Update, 16);
}

$(document).ready(function () {
    $("#numberButton").click(function () {
        number++;
        $("#number").text(number);
    });

});

/*=====================================================================================
UPDATE FUNCTIONS
=======================================================================================*/

// main game update loop
function Update() {
    updateNumberText();
    updateIncomeText();
    unlockUpgradeCheck();
    updateUpgrades();
}

function moneyUpdate() {
    number += currentIncome;
    updateNumberText();
}

function updateNumberText(){
    $("#number").text(number);
}

function updateIncomeText(){
    $("#currentIncome").text("Current Income: " + currentIncome + "/sec");
}

function updateUpgrades(){
    if (currentUpgrades.length != 0){
        for(let i = 0; i < currentUpgrades.length; i++){
            currentUpgrades[i].updateUpgrade();
        }
    }
}

function unlockUpgradeCheck(){
    if (number > newUpgradePoint) {
        addUpgrade();
    }
}

function addUpgrade(){
    var upgrade = new Upgrade(upgradeLevel);
    currentUpgrades.push(upgrade);
    $("body").append(upgrade.getUpgradeHTML());
    $("#" + upgradeLevel).click(function () {
        upgrade.buyUpgrade();
    })
    upgradeLevel++;
    newUpgradePoint *= 10;
}

/*=====================================================================================
UPGRADE CLASSES AND FUNCTIONS
=======================================================================================*/

class Upgrade {
    constructor(id) {
        this.level = 0;
        this.price = 1;
        this.additionalIncome = 1;
        this.upgradeId = id;
    }

    updateUpgrade(){
        $("#" + this.upgradeId).html("Upgrade " + this.upgradeId + "<br>+ "+ this.additionalIncome + "/sec <br> Cost: " + this.price);
    }

    getUpgradeHTML() {
        return "<button id='" + this.upgradeId + "'>Upgrade " + this.upgradeId + " <br> Cost: " + this.price + "</button>";
    }

    buyUpgrade() {
        if (number - this.price < 0) {
            return;
        }
        this.level += 1;
        number -= this.price;
        currentIncome += 1;
        this.price = calcuateUpgradeCost(this.level, this.price);
    }
}

function calcuateUpgradeCost(level, currentPrice) {
    return currentPrice += (currentPrice * (level * 0.01));
}