$(document).ready(function () {

    // pregenerate Document Objects
    let docPlayerInfo = $("#playerInfo");
    let docPlayerImage = $("#playerImage");
    let docPlayerChar = $("#playerChar");
    let docPlayerHealth = $("#playerHealth");
    let docPlayerAttack = $("#playerAttack");
    let docChallengers = $("#Challengers");
    let docArena = $("#arena");
    let docSelect = $("#select");
    let docAttack = $("#attack");
    //Challenger
    let docChal1 = $("#challenger1")
    let docChal1Img = $("#challenger1Img");
    let docChal1Info = $("#challenger1Info");
    let docChal2 = $("#challenger2")
    let docChal2Img = $("#challenger2Img");
    let docChal2Info = $("#challenger2Info");
    let docChal3 = $("#challenger3")
    let docChal3Img = $("#challenger3Img");
    let docChal3Info = $("#challenger3Info");
    // Shared Variables
    let player;
    let challengers;
    let selectCount = 0;
    let threeChallenger = [];
    let selectClick = 0;
    let pAttack;
    let pHealth;
    let cAttack;
    let cHealth;

    //Fighter Object
    let fighters = {
        char1: {
            keyInfo: "char1",
            charName: "Charizard",
            playerHealth: 100,
            enemyHealth: 100,
            playerAttack: 10,
            enemyAttack: 10,
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

    let fighterCount = Object.keys(fighters).length;//number of fighters

    //global FUNctions

    let CreateRoster = function () {
        docArena.empty();
        // create a roster that is displayed in arena for choice picking
        docArena.addClass("charSelect");
        $.each(fighters, function (i, item) {
            if (fighters[i] !== player) {
                let character = $("<div>").addClass(`character ${fighters[i].charName}`).attr("data-char", fighters[i].keyInfo);
                let charImg = $("<img>").addClass("charImgSelect");
                let charDetails = $("<span>");
                charImg.attr("src", fighters[i].smImg);
                charDetails.text(`${fighters[i].charName} Health:${fighters[i].enemyHealth}`);
                character.append(charImg, charDetails);
                docArena.append(character);
            }
        });
    }

    const heroImg = ()=>
    let selection = function () {
        let counter = 0;
        $(".character").on("click", function (event) {
            let selectedCharacter = fighters[$(this).attr("data-char")];
            console.log(selectedCharacter);
            if (counter == 0) {
                player = selectedCharacter;
                docPlayerImage.attr("src", player.smImg);
                docPlayerChar.text(player.charName);
                docPlayerHealth.text(player.playerHealth);
                docPlayerAttack.text(player.playerAttack);
                pHealth = player.playerAttack;
                pAttack = player.playerAttack;
            }
            else if (counter > 0 && counter < 4) {
                let ChosenChallenger =[]
                ChosenChallenger.push[selectedCharacter.keyInfo];
                selectCount += 1;
                if (selectCount === 1) {
                    docChal1.removeClass("character");
                    docChal1.addClass("Chal");
                    docChal1Img.attr("src", selectedCharacter.smImg);
                    docChal1Info.text(`${selectedCharacter.charName}`);
                }
                else if (selectCount === 2) {
                    docChal2.removeClass("character");
                    docChal2.addClass("Chal");
                    docChal2Img.attr("src", selectedCharacter.smImg);
                    docChal2Info.text(`${selectedCharacter.charName}`);
                }
                else if (selectCount === 3) {
                    docChal3.removeClass("character");
                    docChal3.addClass("Chal");
                    docChal3Img.attr("src", selectedCharacter.smImg);
                    docChal3Info.text(`${selectedCharacter.charName}`);
                    docArena.empty();
                }
                else {
                    console.log(ChosenChallenger);
                    return;
                }
            }
            counter++;

        });
    };

CreateRoster();
selection();

});