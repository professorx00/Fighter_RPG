let fighters = {
    fighter1: {
        name: "joe",
        punch: 34,
        health: 100,

    },
    fighter2: {
        name: "mary",
        punch: 30,
        health: 150,
    },
}

let challanger = {}
let challangerNum = 0;
let playerdeath = false;
let enemydeath = true;

let docBTNReset = $("#btnRest");
let docBTNAttack = $("#btnAttack");
let docMain= $("#main");
let docGoing = $("#going");
let docfighters = $(".chars")



let AddFighterstoChallangers = function(goingFighter) {
    challangerNum++;
    if (challangerNum < 4) {
        goingFighterName = goingFighter.name;
        goingFighterPunch = goingFighter.punch;
        goingFighterHealth = goingFighter.health;
        challanger["fighter" + challangerNum] = {
            name: goingFighterName,
            punch: goingFighterPunch,
            health: goingFighterHealth
        }
    }
    else {
        return;
    }


}
let fight = function(challanger){
    console.log("inside the function");
    fighter1 = challanger["fighter1"];
    fighter2 = challanger["fighter2"];
    f1h = fighter1.health - fighter2.punch;
    console.log(fighter1.health)
    console.log(f1h);
    f2h = fighter2.health - fighter1.punch;
    console.log(fighter2.health)
    console.log(f2h);
    challanger["fighter1"].health = f1h;
    challanger["fighter2"].health = f2h;
    challanger["fighter1"].punch += 6;
}
let checkGame = function(){
    if (challanger["fighter1"].health<=0){
        playerdeath=true;
    }
    

}

docfighters.on("click", function (event) {
    _this = $(this);
    console.log(_this);
    AddFighterstoChallangers(fighters[_this.attr("data-enemy")]);
    console.log(challanger);
})

docBTNReset.on("click",function(event){
    challanger ={};
    challangerNum = 0;
})

docBTNAttack.on("click",function(event){
    
    fight(challanger);
    checkGame();
    console.log(challanger);

})





