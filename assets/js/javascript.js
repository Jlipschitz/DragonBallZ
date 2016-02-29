$(document).ready(function() {

    var chosenCharacter; // character you choose to play as
    var chosenEnemy; // character you choose to fight
    var attackButton = $("<button id='attackButton' value='ATTACK!'>ATTACK!</button>"); //attack button to be implemented later
    var messageLog; // where status messages will go

    function Create(Name, Attack, Health, Counter, Url) {
        this.name = Name;
        this.attack = Attack;
        this.health = Health;
        this.counter = Counter;
        this.imageUrl = Url;
    };

    var characters = [vegeta = new Create("Vegeta", 10, 120, 7, "assets/images/vegetaImg.png"),
        krillin = new Create("Krillin", 5, 140, 6, "assets/images/krillinImg.png"),
        frieza = new Create("Frieza", 4, 160, 8, "assets/images/friezaImg.png"),
        gohan = new Create("Gohan", 7, 150, 9, "assets/images/gohanImg.png")
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
            $('#' + chosenEnemy.name + '').hide();
        } else if (hero.health <= 0) {
            console.log(messages.heroLose);
        }
    };

    var renderOne = function() { //show images to page
        for (var i = 0; i < characters.length; i++) {
            var name = characters[i].name;

            var playerDivs = $("<div class='phase-one' id='" + name + "''  >");
            var displayName = ("<p class='displayName'> " + name + "</p>");
            var charImage = ("<img src='" + characters[i].imageUrl + "' alt='" + name + "' id='" + name + "' >");
            var chararacterStats = (
                "<p class='stats'>ATTACK: <span class='greenAttack' id=" + name + "> " + characters[i].attack + "</span></p>" +
                "<p class='stats'>HEALTH: <span class='blueHealth' id=" + name + ">" + characters[i].health + "</p>" +
                "<p class='stats'>COUNTER: <span class='redCounter' id=" + name + ">" + characters[i].counter + "</p>");

            playerDivs.append(displayName + charImage + chararacterStats);
            $('.first').append(playerDivs);
        };
    }
    renderOne();

    function selectEnemy(a) {
        return function() {
            chosenEnemy = characters[a];
            var compare2 = $(this);

            for (var i = 0; i < characters.length; i++) {
                if ($('#' + characters[i].name + '') != compare2 ) {
                    $('#' + characters[i].name + '').removeClass("phase-two-enemy");
                }
            }

            $(this).toggleClass("phase-two-enemy");
            $(this).unbind("click");

            console.log($(this));
             
            //apply attack button to enemy once they are chosen and update stats after battle
            $(this).append(attackButton);
            $('#attackButton').off().on("click", function() {
                fight(chosenCharacter, chosenEnemy);
                //update stats on attack
                for (var i = 0; i < characters.length; i++) {
                    $('.greenAttack#' + characters[i].name + '').text(characters[i].attack);
                    $('.blueHealth#' + characters[i].name + '').text(characters[i].health);
                    $('.redCounter#' + characters[i].name + '').text(characters[i].counter);
                }

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
                    $('#' + characters[a].name + '').removeClass("phase-one").addClass("phase-two-standby");
                }
            }
        }
    }

    for (var i = 0; i < characters.length; i++) {
        $('#' + characters[i].name + '').on("click", selectCharacter(i));
    }

});
