$(document).ready(function () {

    // pregenerate Document Objects
    const docArena = $("#arena");
    const docPlayerArea = $("#playerArea");
    const docChallengerArea = $("#challengerArea").addClass("d-flex flex-row");
    const btnAttack = $("#attack").css("display", "none");
    let fighting = false;
    let player = null;
    let challengers = [];
    let counter = 0;


    //Fighter Object
    let fighters = {
        char1: {
            keyInfo: "char1",
            charName: "Charizard",
            playerHealth: 175,
            playerAttack: 20,
            enemyAttack: 15,
            enemyHealth: 220,
            smImg: "./imgs/150px-Charizard.png",
            lgImg: "./imgs/250px-Charizard.png"
        },
        char2: {
            keyInfo: "char2",
            charName: "Donkey Kong",
            playerHealth: 225,
            enemyHealth: 250,
            playerAttack: 15,
            enemyAttack: 10,
            smImg: "./imgs/150px-DonkeyKong.png",
            lgImg: "./imgs/250px-DonkeyKong.png"
        },
        char3: {
            keyInfo: "char3",
            charName: "Kirby",
            playerHealth: Math.floor(Math.random() * 150 + 60),
            enemyHealth: Math.floor(Math.random() * 150 + 60),
            playerAttack: Math.floor(Math.random() * 20 + 15),
            enemyAttack: Math.floor(Math.random() * 20 + 15),
            smImg: "./imgs/150px-Kirby.png",
            lgImg: "./imgs/250px-Kirby.png"
        },
        char4: {
            keyInfo: "char4",
            charName: "Mario",
            playerHealth: Math.floor(Math.random() * 150 + 90),
            enemyHealth: Math.floor(Math.random() * 150 + 90),
            playerAttack: Math.floor(Math.random() * 20 + 20),
            enemyAttack: Math.floor(Math.random() * 20 + 20),
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
    };
    // const fighterCount = Object.keys(fighters).length;

    const CreateRoster = function () {
        docArena.empty();
        // create a roster that is displayed in arena for choice picking
        roster = $("<div>").addClass("charRoster d-flex flex-row")
        docArena.append(roster);
       
        $.each(fighters, function (i, item) {
            if (fighters[i] !== player) {
                    let character = $("<div>").addClass(`rostercharacter character ${fighters[i].charName} d-flex flex-column `).attr("data-char", fighters[i].keyInfo);
                    let charImg = $("<img>").addClass("charImgSelect rosterImg").attr("src", fighters[i].smImg);
                    let charDetails = $("<span>").text(`${fighters[i].charName} Health:${fighters[i].playerHealth}`).addClass("rosterHealth").attr("data-ehealth",fighters[i].enemyHealth);
                    character.append(charImg, charDetails);
                    roster.append(character);
            }
        });

    };
    //Chooses the Hero
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
    function createChalBlock(fighterBlk) {
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


    function createFighter(fighter) {
        fightChal = fighters[fighter];
        btnAttack.attr("data-enemy", fightChal.keyInfo);
        docFightRight = createChalBlock(fightChal).addClass(`col-md-6 d-flex flex-column ${fightChal.keyInfo}`);
        docFightLeft = createChalBlock(player).addClass(`col-md-6 d-flex flex-column ${player.keyInfo}`);
        docArena.append(docFightLeft);
        docArena.append(docFightRight);
        docArena.addClass("Fight");
        fighting = true;
        return [docFightRight, docFightLeft]

    }
    //on click for challengers
    function startFight() {
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
    //on click for attack
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
            _this.remove();
            let roster = function(){
                rosterChange = $(".rosterHealth");
                console.log(rosterChange.length)
                for(let x=0;x<rosterChange.length;x++){
                    let text = $(rosterChange[x]);
                    console.log(text);
                    let ptext = text.text();
                    splittext=ptext.split(":");
                    realValue=splittext[0] + ": " +text.attr("data-ehealth");
                    console.log(realValue);
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
        console.log("enemy Health" + ehealth);
        enemy.enemyHealth = ehealth;
        console.log("Player Health" + phealth)
        playerLog.playerHealth = phealth;
        playerLog.playerAttack = pAttack + Math.floor(Math.random() * 10 + 8)
        $(`.${btnAttack.attr("data-player")}-Health`).text(`Health: ${phealth}`);
        $(`.${btnAttack.attr("data-player")}-Attack`).text(`Attack: ${pAttack}`);
        $(`.${btnAttack.attr("data-enemy")}-Health`).text(`Health: ${ehealth}`);
        $(`.${btnAttack.attr("data-enemy")}-Attack`).text(`Attack: ${eAttack}`);
        if (phealth < 0) {
            // gameResolve(false);// your health ran out
            console.log(" Player is Dead ")
        }
        else if (ehealth < 0 && counter == 3) {
            console.log("All Enimies are dead and player has won")
        }
        else if (ehealth < 0 && counter < 3) {
            console.log("Player is Alive but there is more Enemies")
            counter++;
            docArena.empty();
            fighting = false;
            $(".Enemies").on("click", function () {
                _this = $(this)
                fighter = _this.attr("data-enemy");
                if (!fighting) {
                    let fighters = createFighter(fighter);
                    btnAttack.css("display", "").attr("data-player", $(fighters[1][0]).attr("data-char")).attr("data-enemy", $(fighters[0][0]).attr("data-char"));
                    _this.remove();
                }
            })


        }

    })



    //startGame function


});//end of Document Object




