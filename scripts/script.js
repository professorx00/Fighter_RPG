$(document).ready(function () {

    // pregenerate Document Objects
    const docArena = $("#arena");
    const docPlayerArea = $("#playerArea");
    const docChallengerArea = $("#challengerArea").addClass("d-flex flex-row");
    const btnAttack = $("#attack");

    let player = null;
    let challengers = [];

    let enemyAttackPow;
    let enemyHealth;

    let playerHealth;
    let playerAttack;



    //Fighter Object
    let fighters = {
        char1: {
            keyInfo: "char1",
            charName: "Charizard",
            playerHealth: Math.floor(Math.random() * 150 + 100),
            playerAttack: 10,
            enemyAttack: 10,
            enemyHealth: 100,
            smImg: "./imgs/150px-Charizard.png",
            lgImg: "./imgs/250px-Charizard.png"
        },
        char2: {
            keyInfo: "char2",
            charName: "Donkey Kong",
            playerHealth: 100,
            enemyHealth: 100,
            playerAttack: 10,
            enemyAttack: 10,
            smImg: "./imgs/150px-DonkeyKong.png",
            lgImg: "./imgs/250px-DonkeyKong.png"
        },
        char3: {
            keyInfo: "char3",
            charName: "Kirby",
            playerHealth: 100,
            enemyHealth: 100,
            playerAttack: 10,
            enemyAttack: 10,
            smImg: "./imgs/150px-Kirby.png",
            lgImg: "./imgs/250px-Kirby.png"
        },
        char4: {
            keyInfo: "char4",
            charName: "Mario",
            playerHealth: 100,
            enemyHealth: 100,
            playerAttack: 10,
            enemyAttack: 10,
            smImg: "./imgs/150px-Mario.png",
            lgImg: "./imgs/250px-Mario.png"
        },
        char5: {
            keyInfo: "char5",
            charName: "Mega Man",
            playerHealth: 100,
            enemyHealth: 100,
            playerAttack: 10,
            enemyAttack: 10,
            smImg: "./imgs/150px-MegaMan.png",
            lgImg: "./imgs/250px-MegaMan.png"
        },
    };
    const fighterCount = Object.keys(fighters).length;//number of fighters

    //global FUNctions
    //creates Roster
    const CreateRoster = function () {
        docArena.empty();
        // create a roster that is displayed in arena for choice picking
        roster = $("<div>").addClass("charRoster d-flex flex-row")
        docArena.append(roster);
        $.each(fighters, function (i, item) {
            if (fighters[i] !== player) {
                let character = $("<div>").addClass(`rostercharacter character ${fighters[i].charName} d-flex flex-column `).attr("data-char", fighters[i].keyInfo);
                let charImg = $("<img>").addClass("charImgSelect").attr("src", fighters[i].smImg);
                let charDetails = $("<span>").text(`${fighters[i].charName} Health:${fighters[i].enemyHealth}`);
                character.append(charImg, charDetails);
                roster.append(character);
            }
        });
    };
    //Chooses the Hero
    function addHeroInfo(hero, docPlayerInfo) {
        let docPlayerChar = $("<div>").attr("id", "PlayerChar").text(hero.charName).addClass("info");
        let docPlayerHealth = $("<div>").attr("id", "PlayerHealth").text(hero.playerHealth).addClass("info");
        let docPlayerAttack = $("<div>").attr("id", "PlayerAttack").text(hero.playerAttack).addClass("info");
        let docbaseInfo = $("<div>").text("Character Name:").addClass("infoTitle");
        let docbaseInfo2 = $("<div>").text("Health:").addClass("infoTitle");
        let docbaseInfo3 = $("<div>").text("Attack:").addClass("infoTitle");
        docPlayerInfo.append(docbaseInfo);
        docPlayerInfo.append(docPlayerChar);
        docPlayerInfo.append(docbaseInfo2);
        docPlayerInfo.append(docPlayerHealth);
        docPlayerInfo.append(docbaseInfo3);
        docPlayerInfo.append(docPlayerAttack);
        playerAttack = hero.playerAttack;
        playerHealth = hero.playerHealth;
    }
    const heroAddtoPlayerArea = function (hero) {
        let docPlayer = $("<div>").addClass("playerInfo d-flex flex-row");
        let docPlayerImg = $("<img>").attr("src", hero.smImg).addClass("charImgSelect");
        let docPlayerInfo = $("<div>").addClass("charInfo");
        addHeroInfo(hero, docPlayerInfo);
        docPlayer.append(docPlayerImg);
        docPlayer.append(docPlayerInfo);
        docPlayerArea.append(docPlayer);
    };
    // choose the Challengers
    function SelectEnemy(enemy, docEnemyInfo, docEnemy, docEnemyImg) {
        let docEnemyName = $("<span>").text(enemy.charName).attr("data-key",enemy.keyInfo);
        docEnemyInfo.append(docEnemyName);
        docEnemy.append(docEnemyImg);
        docEnemy.append(docEnemyInfo);
    }
    const fighterAddtoChallengerArea = function (chal, num) {
        let enemy = chal;
        let docEnemy = $("<div>").addClass("Enemies ").attr("data-enemy", enemy.keyInfo);
        let docEnemyImg = $("<img>").attr("src", enemy.smImg).addClass("charImgSelect").attr("data-enemy", enemy.keyInfo);
        let docEnemyInfo = $("<div>").addClass("EnemyInfo ");
        switch (num) {
            case 0:
                challengers.push(chal);
                SelectEnemy(enemy, docEnemyInfo, docEnemy, docEnemyImg);
                docChallengerArea.append(docEnemy);
                break;
            case 1:
                challengers.push(chal);
                SelectEnemy(enemy, docEnemyInfo, docEnemy, docEnemyImg);
                docChallengerArea.append(docEnemy);
                break;
            case 2:
                challengers.push(chal);
                SelectEnemy(enemy, docEnemyInfo, docEnemy, docEnemyImg);
                docChallengerArea.append(docEnemy);
                docArena.empty();
                startFight();
                break;
        }
    }

    // Starts the game
    const Initalize = function () {
        CreateRoster();
    }


    Initalize();
    //on click for Roster Characters
    $(".rostercharacter").on("click", function (event) {
        const _this = $(this);
        if (!player) {
            player = fighters[_this.attr("data-char")];
            heroAddtoPlayerArea(fighters[_this.attr("data-char")]);
            _this.addClass("none");
        }
        else {
            let num = challengers.length;
            fighterAddtoChallengerArea(fighters[_this.attr("data-char")], num);
            _this.addClass("none");
        }

    })

    //on click for challengers
    function createFighter(fighter){
        fightChal = fighters[fighter];
        console.log(fightChal);
        console.log(playerAttack,playerHealth)

    }
    function startFight() {
        $(".Enemies").on("click", function (event) {
            _this =$(this)
            fighter = _this.attr("data-enemy");
            createFighter(fighter);
        })

    }

    //on click for attack

    //startGame function


});//end of Document Object




