
/when enemy health goes below zero:
    we need to check to see if there is any more enemys screenLeft
    if there are then we need to remove one from  control
    if none are left WIN Gamepad
        clear board
        add restart BTN
        remove attack BTN
        reset control

else We need to check if the PHealth goes below zero
    then we display lose 
        clear the board
        add restart button 
        remove attack button
        reset control/


if(ehealth<=0){
    switch(){
        case 3:
            control--
        case 2:
            control--
        case 1:
            gameOver(WIN);
            restart.addClass()
            attack.addClass()
            control=3;
    }
}
else if(phealth<=0){
    gameOver(Lose)
    restart.add
    attack.remove
    control=3;

}


{

}

Characters = [
    {
        name: jack,
        punch: 60,
        height: 456,
    },
    {
        name: VideoPlaybackQuality,
        punch: 60;
        height: 356;
    }



    enmies exist:

        player lives

        player dies 

        enemy dies 

        or both die 

    no enemies left:

        player dies also

        enemy dies

        player lives
