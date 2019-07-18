$(document).ready(function () {

    // pregenerate Document Objects
    const docArena = $("#arena");
    const docPlayerArea = $("#playerArea");
    const docChallengerArea = $("#challengerArea").addClass("d-flex flex-row");
    const btnAttack = $("#attack").css("display", "none");
    const btnRestart = $("#Restart").css("display", "none");
    let fighting = false;
    let player = null;
    let challengers = [];
    let counter = 0;
    let enemyOnField = false;


    //Fighter Object
    let fighters = {
        char1: {
            keyInfo: "char1",
            charName: "Charizard",
            playerHealth: Math.floor(Math.random() * 150 + 105),
            enemyHealth: Math.floor(Math.random() * 150 + 105),
            playerAttack: Math.floor(Math.random() * 20 + 8),
            enemyAttack: Math.floor(Math.random() * 20 + 8),
            smImg: "./imgs/150px-Charizard.png",
            lgImg: "./imgs/250px-Charizard.png"
        },
        char2: {
            keyInfo: "char2",
            charName: "Donkey Kong",
            playerHealth: Math.floor(Math.random() * 150 + 105),
            enemyHealth: Math.floor(Math.random() * 150 + 105),
            playerAttack: Math.floor(Math.random() * 20 + 8),
            enemyAttack: Math.floor(Math.random() * 20 + 8),
            smImg: "./imgs/150px-DonkeyKong.png",
            lgImg: "./imgs/250px-DonkeyKong.png"
        },
        char3: {
            keyInfo: "char3",
            charName: "Kirby",
            playerHealth: Math.floor(Math.random() * 150 + 105),
            enemyHealth: Math.floor(Math.random() * 150 + 105),
            playerAttack: Math.floor(Math.random() * 20 + 8),
            enemyAttack: Math.floor(Math.random() * 20 + 8),
            smImg: "./imgs/150px-Kirby.png",
            lgImg: "./imgs/250px-Kirby.png"
        },
        char4: {
            keyInfo: "char4",
            charName: "Mario",
            playerHealth: Math.floor(Math.random() * 150 + 105),
            enemyHealth: Math.floor(Math.random() * 150 + 105),
            playerAttack: Math.floor(Math.random() * 20 + 8),
            enemyAttack: Math.floor(Math.random() * 20 + 8),
            smImg: "./imgs/150px-Mario.png",
            lgImg: "./imgs/250px-Mario.png"
        },
        char5: {
            keyInfo: "char5",
            charName: "Mega Man",
            playerHealth: Math.floor(Math.random() * 150 + 105),
            enemyHealth: Math.floor(Math.random() * 150 + 105),
            playerAttack: Math.floor(Math.random() * 20 + 8),
            enemyAttack: Math.floor(Math.random() * 20 + 8),
            smImg: "./imgs/150px-MegaMan.png",
            lgImg: "./imgs/250px-MegaMan.png"
        },
        char6: {
            keyInfo: "char6",
            charName: "Peach",
            playerHealth: Math.floor(Math.random() * 150 + 105),
            enemyHealth: Math.floor(Math.random() * 150 + 105),
            playerAttack: Math.floor(Math.random() * 20 + 8),
            enemyAttack: Math.floor(Math.random() * 20 + 8),
            smImg: "./imgs/150px-Peach.png",
            lgImg: "./imgs/250px-Peach.png"
        },
        char7: {
            keyInfo: "char7",
            charName: "Pikachu",
            playerHealth: 120,
            enemyHealth: 120,
            playerAttack: 20,
            enemyAttack: 5,
            smImg: "./imgs/150px-Pikachu.png",
            lgImg: "./imgs/250px-Pikachu.png",
        },
        char8: {
            keyInfo: "char8",
            charName: "Pit",
            playerHealth: Math.floor(Math.random() * 150 + 105),
            enemyHealth: Math.floor(Math.random() * 150 + 105),
            playerAttack: Math.floor(Math.random() * 20 + 8),
            enemyAttack: Math.floor(Math.random() * 20 + 8),
            smImg: "./imgs/150px-Pit.png",
            lgImg: "./imgs/250px-Pit.png"
        },
        char9: {
            keyInfo: "char9",
            charName: "Samus",
            playerHealth: Math.floor(Math.random() * 150 + 105),
            enemyHealth: Math.floor(Math.random() * 150 + 105),
            playerAttack: Math.floor(Math.random() * 20 + 8),
            enemyAttack: Math.floor(Math.random() * 20 + 8),
            smImg: "./imgs/150px-Samus.png",
            lgImg: "./imgs/250px-Samus.png"
        },
        char0: {
            keyInfo: "char0",
            charName: "Link",
            playerHealth: Math.floor(Math.random() * 150 + 105),
            enemyHealth: Math.floor(Math.random() * 150 + 105),
            playerAttack: Math.floor(Math.random() * 20 + 8),
            enemyAttack: Math.floor(Math.random() * 20 + 8),
            smImg: "./imgs/150px-YoungLink.png",
            lgImg: "./imgs/250px-YoungLink.png"
        }
    };

    const CreateRoster = function () {
        docArena.empty();
        // create a roster that is displayed in arena for choice picking
        roster = $("<div>").addClass("charRoster container-fluid")
        docArena.append(roster);
        resetFighters();
        // generates the actual fighter Icons
        $.each(fighters, function (i, item) {

            if (fighters[i] !== player) {
                // console.log(fighters[i].charName,fighters[i].playerHealth,fighters[i].enemyHealth,fighters[i].keyInfo)
                let character = $("<div>").addClass(`rostercharacter character ${fighters[i].charName} d-flex flex-column `).attr("data-char", fighters[i].keyInfo);
                let charImg = $("<img>").addClass("charImgSelect rosterImg").attr("src", fighters[i].smImg);
                let charDetails = $("<span>").text(`${fighters[i].charName} Health:${fighters[i].playerHealth}`).addClass("rosterHealth").attr("data-ehealth", fighters[i].enemyHealth);
                character.append(charImg, charDetails);
                roster.append(character);
            }
        });

    };
    //Helper Function for the Hero Add to Player Area Function
    function addHeroInfo(hero, docPlayerInfo) {
        let docPlayerChar = $("<div>").attr("id", "PlayerChar").text(hero.charName).addClass("infoName");
        let docPlayerHealth = $("<div>").attr("id", "PlayerHealth").text(hero.playerHealth).addClass("infoHealth");
        let docPlayerAttack = $("<div>").attr("id", "PlayerAttack").text(hero.playerAttack).addClass("infoAttack");
        let docbaseInfo = $("<div>").text("Character Name:").addClass("infoTitle");
        let docbaseInfo2 = $("<div>").text("Health:").addClass("infoTitle");
        let docbaseInfo3 = $("<div>").text("Attack:").addClass("infoTitle");
        docPlayerInfo.append(docbaseInfo);
        docPlayerInfo.append(docPlayerChar);
        docPlayerInfo.append(docbaseInfo2);
        docPlayerInfo.append(docPlayerHealth);
        docPlayerInfo.append(docbaseInfo3);
        docPlayerInfo.append(docPlayerAttack);
        btnAttack.attr("data-player", hero.keyInfo);
        playerAttack = hero.playerAttack;
        playerHealth = hero.playerHealth;
    }
    //Add Choosen Hero to the Player Area
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
    const SelectEnemy = function (enemy, docEnemyInfo, docEnemy, docEnemyImg) {
        let docEnemyName = $("<span>").text(enemy.charName).attr("data-key", enemy.keyInfo);
        docEnemyInfo.append(docEnemyName);
        docEnemy.append(docEnemyImg);
        docEnemy.append(docEnemyInfo);
    }
    const fighterAddtoChallengerArea = function (chal, num) {
        console.log("fighterAddtoChallengerArea");
        let enemy = chal;
        let docEnemy = $("<div>").addClass("Enemies ").attr("data-enemy", enemy.keyInfo);
        let docEnemyImg = $("<img>").attr("src", enemy.smImg).addClass("charImgSelect").attr("data-enemy", enemy.keyInfo);
        let docEnemyInfo = $("<div>").addClass("EnemyInfo ");
        //sets the enemies and removes the rest 
        switch (num) {
            case 0://1st Enemy
                challengers.push(chal);
                SelectEnemy(enemy, docEnemyInfo, docEnemy, docEnemyImg);
                docChallengerArea.append(docEnemy);
                break;
            case 1://Second Enemy
                challengers.push(chal);
                SelectEnemy(enemy, docEnemyInfo, docEnemy, docEnemyImg);
                docChallengerArea.append(docEnemy);
                break;
            case 2://Third Enemy
                challengers.push(chal);
                SelectEnemy(enemy, docEnemyInfo, docEnemy, docEnemyImg);
                docChallengerArea.append(docEnemy);
                docArena.empty();
                startFight();
                break;
        }
    }
    //creates a character Block for Fight Squence
    function createChalBlock(fighterBlk) {
        console.log("createChalBlock");
        docCharBlock = $("<div>").attr("data-char", fighterBlk.keyInfo);
        docCharBlkImg = $("<img>").attr("src", fighterBlk.lgImg).addClass("lgcharImgSelect");
        docCharBlkInfo = $("<div>").addClass("charInfo");
        if (player !== fighterBlk) {
            docCharBlkName = $("<span>").text("Name: " + fighterBlk.charName).attr("id", "currentChal").addClass(`${fighterBlk.keyInfo}-Name`);
            docCharBlkhealth = $("<span>").text(" Health: " + fighterBlk.enemyHealth).attr("id", "currentChalHealth").addClass(`${fighterBlk.keyInfo}-Health`);
            docCharBlkattack = $("<span>").text(" Attack: " + fighterBlk.enemyAttack).attr("id", "currentChalAttack").addClass(`${fighterBlk.keyInfo}-Attack`);
            docCharBlkInfo.append(docCharBlkName, docCharBlkhealth, docCharBlkattack);
            docCharBlock.append(docCharBlkImg, docCharBlkInfo);
            return docCharBlock;
        }
        else {
            docCharBlkName = $("<span>").text("Name: " + fighterBlk.charName).attr("id", "currentChal").addClass(`${fighterBlk.keyInfo}-Name`);
            docCharBlkhealth = $("<span>").text(" Health: " + fighterBlk.playerHealth).attr("id", "currentChalHealth").addClass(`${fighterBlk.keyInfo}-Health`);
            docCharBlkattack = $("<span>").text(" Attack: " + fighterBlk.playerAttack).attr("id", "currentChalAttack").addClass(`${fighterBlk.keyInfo}-Attack`);
            playerAttack = fighterBlk.enemyAttack;
            playerHealth = fighterBlk.enemyHealth;
            docCharBlkInfo.append(docCharBlkName, docCharBlkhealth, docCharBlkattack);
            docCharBlock.append(docCharBlkImg, docCharBlkInfo);
            return docCharBlock;
        }

    }
    //Starts the fight after Roster Choice
    function startFight() {
        console.log("StartFight");
        console.log("This is fighting" + fighting)
        $(".Enemies").on("click", function (event) {
            _this = $(this)
            fighter = _this.attr("data-enemy");
            if (!fighting) {
                let fighters = createFighter(fighter);
                btnAttack.css("display", "").attr("data-player", $(fighters[1][0]).attr("data-char")).attr("data-enemy", $(fighters[0][0]).attr("data-char"));
                _this.remove();
            }

        })

    }
    // Create fighters for the fight
    function createFighter(fighter) {
        console.log("createFighter");
        fightChal = fighters[fighter];
        btnAttack.attr("data-enemy", fightChal.keyInfo);
        docFightRight = createChalBlock(fightChal).addClass(`col-md-6 d-flex flex-column ${fightChal.keyInfo}`);
        docFightLeft = createChalBlock(player).addClass(`col-md-6 d-flex flex-column ${player.keyInfo}`);
        docArena.append(docFightLeft);
        docArena.append(docFightRight);
        enemyOnField = true;
        docArena.addClass("Fight");
        fighting = true;
        return [docFightRight, docFightLeft]

    }
    const gameOver = function (state) {
        console.log("gameOver");
        if (state) {
            console.log("this is player Health" + phealth);
            console.log("this is enemy health" + ehealth);
            docArena.empty();
            $("div.playerInfo").empty();
            let message = $("<span>").text("Won");
            docArena.append(message)
            btnRestart.css("display", "")
            btnAttack.css("display", "None")
        }
        else {

            docArena.empty();
            docChallengerArea.empty();
            $("div.playerInfo").empty();
            let message = $("<span>").text("Lost");
            docArena.append(message)
            btnRestart.css("display", "")

        }
    }
    const resetFighters = function () {
        $.each(fighters, function (i, item) {
            fighters[i].playerHealth = Math.floor(Math.random() * 150 + 105);
            fighters[i].enemyHealth = Math.floor(Math.random() * 150 + 105);
            fighters[i].playerAttack = Math.floor(Math.random() * 20 + 8);
            fighters[i].enemyHealth = Math.floor(Math.random() * 20 + 8);
        });
    }
    // Starts the game
    const Initalize = function () {
        let control = 3;
        console.log("Initalize");
        CreateRoster();
        //reCreate Roaster
        $(".rostercharacter").on("click", function (event) {
            console.log("OnClick rostercharacters");
            const _this = $(this);
            if (!player) {
                player = fighters[_this.attr("data-char")];
                heroAddtoPlayerArea(fighters[_this.attr("data-char")]);
                _this.remove();
                let roster = function () {
                    rosterChange = $(".rosterHealth");
                    for (let x = 0; x < rosterChange.length; x++) {
                        let text = $(rosterChange[x]);
                        let ptext = text.text();
                        splittext = ptext.split(":");
                        realValue = splittext[0] + ": " + text.attr("data-ehealth");
                        text.text(realValue);
                    };
                }
                roster();


            }
            else {
                let num = challengers.length;
                fighterAddtoChallengerArea(fighters[_this.attr("data-char")], num);
                _this.remove();
            }
        })
        btnAttack.on("click", function (event) {

            console.log("OnClick Attack Button");
            enemyKey = btnAttack.attr("data-enemy");
            playerkey = btnAttack.attr("data-player");
            enemy = fighters[enemyKey];
            playerLog = fighters[playerkey];
            ehealth = enemy.enemyHealth;
            phealth = playerLog.playerHealth;
            eAttack = enemy.enemyAttack;
            pAttack = playerLog.playerAttack;
            ehealth = ehealth - pAttack;
            phealth = phealth - eAttack;
            enemy.enemyHealth = ehealth;
            playerLog.playerHealth = phealth;
            playerLog.playerAttack = pAttack + Math.floor(Math.random() * 10 + 8)
            $(`.${btnAttack.attr("data-player")}-Health`).text(`Health: ${phealth}`);
            $(`.${btnAttack.attr("data-player")}-Attack`).text(`Attack: ${pAttack}`);
            $(`.${btnAttack.attr("data-enemy")}-Health`).text(`Health: ${ehealth}`);
            $(`.${btnAttack.attr("data-enemy")}-Attack`).text(`Attack: ${eAttack}`);
            if (enemyOnField = true) {
                if (control > 1) {
                    if (phealth <= 0) {
                        console.log("player dead")
                        console.log(phealth)
                        console.log("this is control number" + control);
                        gameOver(false)
                        control = 3;
                        return;
                    }
                    else if (ehealth < 1) {
                        console.log("continue")
                        console.log(ehealth)
                        console.log("this is control number" + control);
                        control--
                        docArena.empty();
                        fighting = false;
                    }
                }
                else{
                    console.log("continue")
                    console.log("this is control number" + control);
                    control--;
                    gameOver(true)
                    control=3;
                }
            }

            else {
                console.log("enemy beaten")
                console.log("this is control number" + control);
                fighting = false;
                gameOver(true);
                return;
            }

        })
        btnRestart.on("click", function (event) {
            console.log("OnClick Reset Button");
            $("div.playerInfo").empty();
            $("div.challengerArea").empty();
            docPlayerArea.css("display", "");
            $("div.challengerAreaContainer").css("display", "")
            //Reset Variables
            fighting = false;
            player = null;
            challengers = [];
            //Reset Fighter Stats
            resetFighters();
            //Restart Game
            Initalize();
            //Hide Restart Button
            btnRestart.css("display", "none");
        })

    }




    Initalize();


    // Action Button of the Attack



});//end of Document Object




