$(document).ready(function () {

    // Inital Doc Variables into Jquery Objects
    docPlayer = $("#pchrName");
    docPH = $("#pchrHealth");
    docPA = $("#pchrAttack");
    docEnemies = $("#enemies");
    docArena = $("#arena");
    docPlayIcon = $("#pimgStat");
    docEnemyImg = $("#enemyImg");

    //global

    let playerChoice = false;
    let playerChar;
    let enemyChoice = [];
    let activeEnemy;
    let actEnemyHealth = 0;


    // Character Object containing playerHealth,enemyHealth,Player Attack, Enemy Attack, 150pxImg, 250pxImg,player,enemy

    let characters = {
        char1: {
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
        char6: {
            charName: "Peach",
            playerHealth: 100,
            enemyHealth: 100,
            playerAttack: 10,
            enemyAttack: 10,
            smImg: "./imgs/150px-Peach.png",
            lgImg: "./imgs/250px-Peach.png",
            pSelect: false,
            eSelect: false
        },
        char7: {
            charName: "Pikachu",
            playerHealth: 100,
            enemyHealth: 100,
            playerAttack: 10,
            enemyAttack: 10,
            smImg: "./imgs/150px-Pikachu.png",
            lgImg: "./imgs/250px-Pikachu.png",
            pSelect: false,
            eSelect: false
        },
        char8: {
            charName: "Pit",
            playerHealth: 100,
            enemyHealth: 100,
            playerAttack: 10,
            enemyAttack: 10,
            smImg: "./imgs/150px-Pit.png",
            lgImg: "./imgs/250px-Pit.png",
            pSelect: false,
            eSelect: false
        },
        char9: {
            charName: "Samus",
            playerHealth: 100,
            enemyHealth: 100,
            playerAttack: 10,
            enemyAttack: 10,
            smImg: "./imgs/150px-Samus.png",
            lgImg: "./imgs/250px-Samus.png",
            pSelect: false,
            eSelect: false
        },
        char0: {
            charName: "Link",
            playerHealth: 100,
            enemyHealth: 100,
            playerAttack: 10,
            enemyAttack: 10,
            smImg: "./imgs/150px-YoungLink.png",
            lgImg: "./imgs/250px-YoungLink.png",
            pSelect: false,
            eSelect: false
        }
    }// end of Characyer JSON Object

    charAmount = Object.keys(characters).length;

    //
    let main = {
        health : 0,
        attack : 0,
        intialize: function () {
            docArena.empty();
            docArena.addClass("ArenaCharSelect");
            playerChoice = getCharacters(characters, playerChoice);
            let instruction = $("<span>");
            instruction.text("Please Select Your Character");
            docArena.append(instruction);
            let count=0;
            ({ count, playerChar } = selection(count, playerChar, characters, enemyChoice));
            instruction.text("Please Choose the enemy you wish to face first");
            docArena.append(instruction);
            this.play();
        },//Intialization of game End
        play: function(){
            console.log("play" + $(".Selected"));
        }
    };//JSON OBJECT Main End


    main.intialize();

});//document.ready end

function getCharacters(characters, playerChoice) {
    $.each(characters, function (i, item) {
        let holder = $("<div>").addClass("cSelectHolder");
        let choice = $("<img>").attr("src", characters[i].smImg).addClass(`${characters[i].charName} charSelect`).attr("data-char", i);
        ;
        let cname = $("<span>").text(characters[i].charName);
        holder.append(choice, cname);
        docArena.append(holder);
        holder.on("click", function (event) {
            
            if (!playerChoice) {
                choice.addClass("Selected");
                holder.addClass("boxSelected");
                playerChoice = true;
            }
            else {
                $(".boxSelected").css("border", "").removeClass("boxSelected");
                $(".Selected").removeClass("Selected");
                choice.addClass("Selected");
                holder.addClass("boxSelected");
            }
        });
    });
    return playerChoice;
}

function selection(count, playerChar, characters, enemyChoice) {
    $("#select").on("click", function (event) {
        if (count == 0) {
            playerChar = characters[$(".Selected").attr("data-char")];
            $(".boxSelected").css("display", "none");
            docPlayIcon.attr("src", playerChar.smImg);
            docPlayer.text(playerChar.charName);
            docPH.text(playerChar.playerHealth);
            docPA.text(playerChar.playerAttack);
            this.health = parseInt(playerChar.playerHealth);
            this.attack = parseInt(playerChar.playerAttack);
            $(".playerList").css("display", "inline");
            count += 1;
        }
        else if (count > 0 && count < 3) {
            enemyChoice.push(characters[$(".Selected").attr("data-char")]);
            let enemy = $(".Selected");
            let enemyBox = $(".boxSelected");
            let temp = $(enemyBox);
            temp.addClass("boxEnemy");
            docEnemyImg.append(temp);
            count += 1;
        }
        else if (count > 2 && count < 4) {
            enemyChoice.push(characters[$(".Selected").attr("data-char")]);
            let enemy = $(".Selected");
            let enemyBox = $(".boxSelected");
            let temp = $(enemyBox);
            temp.addClass("boxEnemy");
            docEnemyImg.append(temp);
            count += 1;
            docArena.empty();
            
        }
        else {
            docArena.empty();
            count += 1;
        }
        
    });
    return { count, playerChar };
}

