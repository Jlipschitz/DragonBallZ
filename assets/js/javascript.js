//global variables
var chosenCharacter; // character you choose to play as
var chosenEnemy; // character you choose to fight
var attackButton = $("<button id='attackButton' value='ATTACK!'>ATTACK!</button>");

function Create(Name, Attack, Health, Counter, Url) {
    this.name = Name;
    this.attack = Attack;
    this.health = Health;
    this.counter = Counter;
    this.imageUrl = Url;
};

var characters = [vegeta = new Create("Vegeta", 10, 120, 5, "assets/images/vegetaImg.png"),
    krillin = new Create("Krillin", 5, 140, 6, "assets/images/krillinImg.png"),
    frieza = new Create("Frieza", 4, 160, 10, "assets/images/friezaImg.png"),
    gohan = new Create("Gohan", 7, 150, 3, "assets/images/gohanImg.png")
];

function fight(hero, enemy) {
    hero.health -= enemy.counter;
    enemy.health -= hero.attack;
    var messages = {
        heroHit: enemy.name + " hit you for " + enemy.counter + "!" + " Your health is now:  " + hero.health,
        enemyHit: "You hit " + enemy.name + " for " + hero.attack + "! " + enemy.name + "'s health is now: " + enemy.health,
        heroLose: enemy.name + " has defeated you!",
        heroWin: hero.name + " has defeated " + enemy.name + "!"
    };
    console.log(messages.heroHit);
    console.log(messages.enemyHit);
    hero.attack += 3;

    if (enemy.health <= 0) {
        console.log(messages.heroWin);
    } else if (hero.health <= 0) {
        console.log(messages.heroLose);
    }
};

var renderOne = function() { //show images to page
    for (var i = 0; i < characters.length; i++) {
        var playerDivs = $("<div class='phase-one' id='" + characters[i].name + "''  >");
        var displayName = ("<p class='displayName'> " + characters[i].name + "</p>");
        var charImage = ("<img src='" + characters[i].imageUrl + "' alt='" + characters[i].name + "' id='" + characters[i].name + "' >");
        var chararacterStats = (
            "<p class='stats'>ATTACK:<span class='greenAttack' id=" + i + "> " + characters[i].attack + "</span></p>" +
            "<p class='stats'>HEALTH: <span class='blueHealth'>" + characters[i].health + "</p>" +
            "<p class='stats'>COUNTER: <span class='redCounter'>" + characters[i].counter + "</p>");

        playerDivs.append(displayName + charImage + chararacterStats);
        $('.first').append(playerDivs);
    };
}
renderOne();

function selectEnemy(a) {
    return function() {
        chosenEnemy = characters[a];

        $(this).toggleClass("phase-two-enemy");
        $(this).unbind("click");

        //create attack button once enemy is chosen
        $(this).append(attackButton);
        $('#attackButton').on("click", function() {
            fight(chosenCharacter, chosenEnemy)
        });
    }
}

function selectCharacter(i) {
    return function() {
        chosenCharacter = characters[i];
        console.log(chosenCharacter) //position of the array the chosen object sits in "characters"
        console.log("You chose: " + characters[i].name);
        $(this).toggleClass("phase-two-chosen");

        for (var a = 0; a < characters.length; a++) {
             $('#' + characters[a].name + '').off("click"); //remove selectCharacter
            if (chosenCharacter != characters[a]) {
                $('#' + characters[a].name + '').on("click", selectEnemy(a));
                $('#' + characters[a].name + '').toggleClass("phase-two-standby", "phase-one");
            }
        }
    }
}

for (var i = 0; i < characters.length; i++) {
   $('#' + characters[i].name + '').on("click", selectCharacter(i));
}

