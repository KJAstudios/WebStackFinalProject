let number = 0;

// start values for new upgrades
let nextUpgradeId = 0;
let incomeAmount = 1;
let startPrice = 1;

//point at which new upgrade is unlocked
let newUpgradePoint = 10;

// current stats
let clickValue = 1;
let currentIncome = 1;
let currentUpgrades = [];
let upgradesDone = false;

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
        number += clickValue;
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
    updateClickIncomeText();
    unlockUpgradeCheck();
    updateUpgrades();
}

function moneyUpdate() {
    number += currentIncome;
    updateNumberText();
}

function updateNumberText() {
    number = roundNumberToTwoDecimals(number);
    $("#number").text("$" +beautifyNumber(number));
}

function updateIncomeText() {
    $("#currentIncome").text("Current Income: $" + beautifyNumber(currentIncome) + "/sec");
}

function updateClickIncomeText() {
    $("#clickIncome").text("Income Per Click: $" + beautifyNumber(clickValue) + "/click")
}

function updateUpgrades() {
    if (currentUpgrades.length != 0) {
        for (let i = 0; i < currentUpgrades.length; i++) {
            currentUpgrades[i].updateUpgrade();
        }
    }
}

function unlockUpgradeCheck() {
    if (number > newUpgradePoint && !upgradesDone) {
        newUpgradePoint *= 10;
        addUpgrade();
    }
}

function addUpgrade() {
    $.post('/upgrade', { upgradeId: nextUpgradeId })
        .done(function (data) {
            if(typeof data[0].name === "undefined"){
                return;
            }
            var upgrade = new Upgrade(data[0].name, data[0].upgradeId, data[0].startingIncome, data[0].initalPrice);
            console.log(upgrade);
            currentUpgrades.push(upgrade);
            $("#buttonDiv").append(upgrade.getUpgradeHTML());

            $("#" + nextUpgradeId).click(function () {
                upgrade.buyUpgrade();
            })

            nextUpgradeId++;
            incomeAmount *= 10;
            startPrice *= 10.5;

        })
        .fail(function () { alert("could not get next upgrade from database") });
}

/*=====================================================================================
UPGRADE CLASSES AND FUNCTIONS
=======================================================================================*/

class Upgrade {
    constructor(name, id, income, startPrice) {
        this.level = 0;
        this.price = startPrice;
        this.additionalIncome = income;
        this.upgradeId = id;
        this.upgradeName = name;
    }

    updateUpgrade() {
        $("#" + this.upgradeId).html(this.upgradeName + "<br>+ $" + beautifyNumber(this.additionalIncome) + "/sec <br> Cost: $" + beautifyNumber(this.price));
    }

    getUpgradeHTML() {
        return "<button id='" + this.upgradeId + "' class='upgradeButton'>" + this.upgradeName + " <br> Cost: " + beautifyNumber(this.price) + "</button>";
    }

    buyUpgrade() {
        if (number - this.price < 0) {
            return;
        }
        this.level += 1;
        number -= this.price;
        currentIncome += this.additionalIncome;
        clickValue += roundNumberToTwoDecimals(this.additionalIncome * 0.01);
        this.price = this.calcuateUpgradeCost(this.level, this.price);
    }

    calcuateUpgradeCost(level, currentPrice) {
        let newPrice = currentPrice += (currentPrice * (level * 0.01));
        return roundNumberToTwoDecimals(newPrice);
    }
}

/*=====================================================================================
GLOBAL SUPPORT FUNCTIONS
=======================================================================================*/
function roundNumberToTwoDecimals(inNumber) {
    let newNumber = inNumber.toFixed(2);
    return parseFloat(newNumber);
}

function beautifyNumber(inNumber) {
    return inNumber.toLocaleString("en-US");
}