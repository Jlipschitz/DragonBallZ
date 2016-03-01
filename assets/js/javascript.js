$(document).ready(function() {

    var chosenCharacter; // character you choose to play as
    var chosenEnemy; // character you choose to fight
    var attackButton = $("<button id='attackButton' value='ATTACK!'>ATTACK!</button>"); //attack button to be implemented later
    var messageLog; // where status messages will go

    //constructor to create characters
    function Create(Name, Attack, Health, Counter, Url) {
        this.name = Name;
        this.attack = Attack;
        this.health = Health;
        this.counter = Counter;
        this.imageUrl = Url;
    };

    //object array for our  characters
    var characters = [vegeta = new Create("VEGETA", 15, 120, 7, "assets/images/vegetaImg.png"),
        krillin = new Create("KRILLIN", 4, 140, 11, "assets/images/krillinImg.png"),
        frieza = new Create("FRIEZA", 3, 170, 6, "assets/images/friezaImg.png"),
        gohan = new Create("GOHAN", 7, 120, 10, "assets/images/gohanImg.png")
    ];

    //battle messages are generated here, as well as win/lose conditions and updating object stat properties
    function fight(hero, enemy) {
        hero.health -= enemy.counter;
        enemy.health -= hero.attack;
        var messages = {
            heroHit: enemy.name + " hit you for " + enemy.counter + "!" + " Your health is now:  " + hero.health,
            enemyHit: "You hit " + enemy.name + " for " + hero.attack + "! " + enemy.name + "'s health is now: " + enemy.health,
            heroLose: enemy.name + " has defeated you!",
            heroWin: hero.name + " has defeated " + enemy.name + "!"
        };

        //clear and display battle messages
        $('.messages').empty();
        $('.messages').append('<p>' + messages.heroHit + '</p>');
        $('.messages').append(messages.enemyHit);

        //attack incrementer
        hero.attack += 3;

        //win or lose conditions
        if (hero.health <= 0) {
            $('.messages').empty();
            $('.messages').append(messages.heroLose + "<p> Refresh page to play again! </p>");
            $('#attackButton').off();
        } else if (enemy.health <= 0) {
            $('.messages').empty();
            $('.messages').append(messages.heroWin);
            $('#' + chosenEnemy.name + '').hide();
        }
    };

    //creates our first initial set of characters to choose from
    var renderOne = function() {
        for (var i = 0; i < characters.length; i++) {
            var name = characters[i].name;
            var playerText = $("<div class='leftText' >");
            var enemyText = $("<div class='rightText' >");
            var playerDivs = $("<div class='phase-one' id='" + name + "''  >");
            var displayName = ("<p class='displayName'> " + name + "</p>");
            var charImage = ("<img src='" + characters[i].imageUrl + "' alt='" + name + "' id='" + name + "' >");
            var chararacterStats = (
                "<p class='stats'>ATTACK: <span class='greenAttack' id=" + name + "> " + characters[i].attack + "</span></p>" +
                "<p class='stats'>HEALTH: <span class='blueHealth' id=" + name + ">" + characters[i].health + "</p>" +
                "<p class='stats'>COUNTER: <span class='redCounter' id=" + name + ">" + characters[i].counter + "</p>");
            //append created variables to page
            playerDivs.append(displayName + charImage + chararacterStats);
            $('.first').append(playerDivs);
        };
    }
    renderOne();

    //function runs when player selects an emeny
    //include class toggling from enemies and non-selected enemies
    //adds atack button to characters selected as an enemy
    function selectEnemy(a) {
        return function() {
            chosenEnemy = characters[a]; //store character chosen

            //display who you are fighting or "who's next" if you defeated the current enemy
            $(".third").text("FIGHTING " + chosenEnemy.name + "!");
            if (chosenCharacter.health < 0) {
                chosenCharacter.attack = 0;
                $(".third").text("SORRY, "+ chosenCharacter.name +" YOU LOSE!");
                $("#" + chosenCharacter.name + "").hide();
            } else if (chosenEnemy.health < 0) {
                $(".third").text("WHO'S NEXT!?");
            }

            //used to return an already picked character to standby
            for (var i = 0; i < characters.length; i++) {
                if ($('#' + characters[i].name + '') != $(this)) {
                    $('#' + characters[i].name + '').removeClass("phase-two-enemy");
                }
            }
            $(this).addClass("phase-two-enemy");

            //apply attack button to enemy once they are chosen and update stats after battle
            $(this).append(attackButton);
            $('#attackButton').off().on("click", function() {

                fight(chosenCharacter, chosenEnemy);

                for (var i = 0; i < characters.length; i++) {
                    $('.greenAttack#' + characters[i].name + '').text(characters[i].attack);
                    $('.blueHealth#' + characters[i].name + '').text(characters[i].health);
                    $('.redCounter#' + characters[i].name + '').text(characters[i].counter);
                }

            });
        }
    }
    
    //select initial character and label characters not chosen as enemies waiting to be fought
    function selectCharacter(i) {
        return function() {
            // we store the hero the player chooses here
            chosenCharacter = characters[i];
            $(this).toggleClass("phase-two-chosen");
            $(".second").show();
            $(".third").text("YOU CHOSE " + chosenCharacter.name + "!");

            //remove event listener to pick a character and label them as phase-two-standby enemies
            for (var a = 0; a < characters.length; a++) {
                $('#' + characters[a].name + '').off("click");
                if (chosenCharacter != characters[a]) {
                    $('#' + characters[a].name + '').on("click", selectEnemy(a)); //add event listener to enemies
                    $('#' + characters[a].name + '').removeClass("phase-one").addClass("phase-two-standby");
                }
            }
        }
    }
    //add on click event to all characters that calls selectCharacter function
    for (var i = 0; i < characters.length; i++) {
        $('#' + characters[i].name + '').on("click", selectCharacter(i));
    }

    //hide initial "select enemy" text until characters show once selectCharacter function is called
    $(".second").hide();
    //create background
    $.backstretch("http://vignette2.wikia.nocookie.net/dragonball/images/b/b8/1305834988-dragon-ball-dbz-wallpaper.jpg/revision/latest?cb=20111216060210", { speed: 400 });
    $('#backstretch').addClass("dim");
}); // end document ready
