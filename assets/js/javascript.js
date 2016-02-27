    function Create(Name, Attack, Health, Counter, Url) {
        this.name = Name;
        this.attack = Attack;
        this.health = Health;
        this.counter = Counter;
        this.imageUrl = Url;
    };

    var characters = [vegeta = new Create("Vegeta", 10, 120, 5, "assets/images/vegetaImg.png"),
        krillin = new Create("Krillin", 5, 140, 6, "../assets/images/krillinImg.png"),
        frieza = new Create("Frieza", 4, 160, 10, "../assets/images/friezaImg.png"),
        gohan = new Create("Gohan", 7, 150, 3, "../assets/images/gohanImg.png")
    ];
    
    console.log(characters[0].imageUrl);

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

    var starCharacters = function() {
        var playerDivs = $("<div>");

        for (var i = 0; i < characters.length; i++) {
            //playerDivs[i].addClass("initial");
            //$(".initialCharacters").append(playerDivs[i]);
        }
    };
    starCharacters();
