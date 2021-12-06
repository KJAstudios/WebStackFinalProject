let number = 0;
let numberElement = null;
let upgradeLevel = 0;

$(document).ready(function(){
    $("#numberButton").click(function(){
        number++;
        $("#number").text(number);
    });
    
});

function calcuateUpgradeCost(level, currentPrice){
    return currentPrice += (currentPrice *(level * 0.01));
}

// main game update loop
function Update(){
    numberElement = document.getElementById("number");
    number+=1;
    numberElement.textContent = number;
    if(number > 10){
        var upgrade = new Upgrade(upgradeLevel);
        $("body").append(upgrade.getUpgradeHTML());
        upgradeLevel++;
    }
    console.log(upgradeLevel);
}
setInterval(Update, 1000);

class Upgrade{
    constructor(id){
        this.level = 0;
        this.price = 1;
        this.upgradeId = id;
    }

    getUpgradeHTML() {
        return "<button id='" + this.upgradeId +"'>Upgrade " + this.upgradeId + "</button>"        
    }
}