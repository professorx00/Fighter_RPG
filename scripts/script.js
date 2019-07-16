$(document).ready(function () {

    // pregenerate Document Objects
    const docArena = $("#arena");
    const docPlayerArea = $("playerArea");
    const docChallengerArea = $("#challengerArea");
    const btnAttack = $("#attack");

    let player = null;
    let challengers = [];



    //Fighter Object
    let fighters = {
        char1: {
            keyInfo: "char1",
            charName: "Charizard",
            playerHealth: Math.floor(Math.random()*150+100),
            defHealth: 100,
            playerAttack: 10,
            defAttack: 10,
            smImg: "./imgs/150px-Charizard.png",
            lgImg: "./imgs/250px-Charizard.png",
            pSelect: false,
            eSelect: false
        },
        char2: {
            keyInfo: "char2",
            charName: "Donkey Kong",
            playerHealth: 100,
            enemyHealth: 100,
            playerAttack: 10,
            enemyAttack: 10,
            smImg: "./imgs/150px-DonkeyKong.png",
            lgImg: "./imgs/250px-DonkeyKong.png",
            pSelect: false,
            eSelect: false
        },
        char3: {
            keyInfo: "char3",
            charName: "Kirby",
            playerHealth: 100,
            enemyHealth: 100,
            playerAttack: 10,
            enemyAttack: 10,
            smImg: "./imgs/150px-Kirby.png",
            lgImg: "./imgs/250px-Kirby.png",
            pSelect: false,
            eSelect: false
        },
        char4: {
            keyInfo: "char4",
            charName: "Mario",
            playerHealth: 100,
            enemyHealth: 100,
            playerAttack: 10,
            enemyAttack: 10,
            smImg: "./imgs/150px-Mario.png",
            lgImg: "./imgs/250px-Mario.png",
            pSelect: false,
            eSelect: false
        },
        char5: {
            keyInfo: "char5",
            charName: "Mega Man",
            playerHealth: 100,
            enemyHealth: 100,
            playerAttack: 10,
            enemyAttack: 10,
            smImg: "./imgs/150px-MegaMan.png",
            lgImg: "./imgs/250px-MegaMan.png",
            pSelect: false,
            eSelect: false
        },
    };
    const fighterCount = Object.keys(fighters).length;//number of fighters

    //global FUNctions

    const CreateRoster = function () {
        docArena.empty();
        // create a roster that is displayed in arena for choice picking
        roster = $("<div>").addClass("charRoster")
        docArena.append(roster);
        $.each(fighters, function (i, item) {
            if (fighters[i] !== player) {
                let character = $("<div>").addClass(`rostercharacter character ${fighters[i].charName}`).attr("data-char", fighters[i].keyInfo);
                let charImg = $("<img>").addClass("charImgSelect").attr("src", fighters[i].smImg);
                let charDetails = $("<span>").text(`${fighters[i].charName} Health:${fighters[i].enemyHealth}`);
                character.append(charImg, charDetails);
                roster.append(character);
            }
        });
    };
    const heroAddtoPlayerArea = function (hero) {
        let docPlayer = $("<div>").addClass("playerInfo");
        let docPlayerImg = $("<img").attr("src",hero.smImg);
        let docPlayerInfo = $("<div>").addClass("charInfo");
        let docPlayerChar= $("<span>").addId("PlayerChar").text(hero.charName);
        let docPlayerHealth = $("<span>").addId("PlayerHealth").text(hero.playerHealth);
        let docPlayerAttack = $("<span>").addId("PlayerAttack").text(hero.playerAttack);
        let docbaseInfo = $("<span>").text("Character Name:");
        docPlayer.append(docPlayerImg);
        let br =$("<br>");
        console.log(hero);
        
    };
    const fighterAddtoChallengerArea = function (chal, num) {
        switch (num) {
            case 0:
                challengers.push(chal);
                console.log(challengers)
                console.log("fighter 1 " + challengers[0].charName);
                break;
            case 1:
                challengers.push(chal);
                console.log("fighter 2 " + challengers[1].charName);
                break;
            case 2:
                challengers.push(chal);
                console.log("fighter 3 " + challengers[2].charName);
                break;
        }
    }
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
            fighterAddtoChallengerArea(fighters[_this.attr("data-char")],num);
            console.log("challenger");
            _this.addClass("none");
        }

    })

    //on click for challengers

    //on click for attack

    //startGame function


});//end of Document Object