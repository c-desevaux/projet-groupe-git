"use strict";


function morpion(){

//Definition des constantes 

    const PION1 ='X';
    const PION2 ='O';
    const VIDE = ' ';
    const LIGNE = 3;
    const COLONNE = 3;

//Definition des variables
    let grille= [];
    let casesPrises=[];
    let playedCase;
    let round;
    let win;
    let gameType;

    
     win=false;

    //On initialise la grille de morpion vide

    grille = init(LIGNE, COLONNE, VIDE);
    round = whoStart();                         //Permet de choisir aléatoirement si on compte les tous a partir de 0 ou 1, ce qui change quel est le joueur qui commence
    gameType = 0;                               //On initialise a 0
                                         
//Tant que la partie n'est pas fini on continue de jouer
    //La partie s'arrete si un des joueur a trois pions alignés ou s'il n'y a plus de cases libre
    while(true){                                            //boucle infini qu'on casse si la grille est pleine ou un joueur a gagné

        while(gameType!=1 && gameType!=2){                  //On verifie que l'utilisateur rentre bien 1 ou 2
            gameType = parseInt(prompt("Bienvenu dans le jeu du morpion, vouslez vous jouer contre:\nL'orinateur (1), un autre joueur (2) ?"));
        }
        
        if(gameType===1){                                   //Si on a choisi de jouer contre l'ordinateur la case du joueur 2 est defini aléatoirement

            if(tourJoueur(round)===2){
                playedCase = computerPlay(casesPrises);
            }else{
                playedCase = play(tourJoueur(round), casesPrises);
            }
        }

        if(gameType===2){                                       //Si on a choisi le mode 2 joueur les 2 joueurs choisissent a tour de role une case
            playedCase = play(tourJoueur(round), casesPrises);   //Le joueur choisit une case a jouer, On vérifie la saisie du joueur
                   }
        if(tourJoueur(round)===1){                              //On affiche la grille avec le pion du joueur qui a joué, d'abbord joueur 1
                affichage(playedCase, grille, PION1);
                win = verifWin(grille, PION1, LIGNE, COLONNE);
        }else{      //La deuxieme saisie est affichée pour le joueur 2
            affichage(playedCase, grille, PION2);
            win = verifWin(grille, PION2, LIGNE, COLONNE);
        }

        round++;

        if(win===true || verifPlein(grille, COLONNE, VIDE)===true){ //On regarde si on rempli l'une des conditions qui casse la boucle
            break;
        }
    }

//On affiche le message de fin en fonction de l'issue de la partie
    epilogue(win, tourJoueur((round-1)));


    console.log("Merci d'avoir joué");
    


//---------------------------------------------LES FONCTIONS-----------------------------------------------

    //Cette fonction initialise la grille de morpion aux dimensions souhaitées
/**
 * 
 * @param {int} ligne nombre le ligne de notre grille
 * @param {int} colonne nombre de colonne de notre grille
 * @param {string} vide caractère pour remplir les cases vide de notre grille
 * @returns array la grille de jeu vide
 */
    function init(ligne, colonne, vide){

        let tab=[];                         

        for(let i=0;i<ligne;i++){
            tab[i]=[];                                          //On initialise chaque ligne comme étant un tableau
            for(let j=0; j<colonne;j++){
                tab[i][j]=vide;                                 //Pour chaque case de chaque ligne on ajoute le caractère vide que nous avons choisi
            }
        }
        console.table(tab);                                     //A la fin de l'initialisation nous affichons la grille dans la console
        return tab;

    }

//Cette fonction propose une saisie a l'utilisateur afin qu'il puisse choisir une case
//on vérifie si la saisie est correct et retournons la valeur de la saisie
    /**
     * 
     * @param {int} joueur le numero du joueur (1 ou 2)
     * @param {Array} casesPrises tabbleau qui contient l'ensemble des cases jouées
     * @returns int le numero de la case jouée
     */
    function play(numeroJoueur, casesPrises){

        let caseNum=0;
        
        while(!Number.isInteger(caseNum) || caseNum<1 || caseNum >9 || casesPrises.includes(caseNum)){  //On redemande a l'utilisateur une saisie si cette derniere n'est pas un chiffre entre 1 et 9 ou que la case à déjà été jouée

            caseNum = parseInt(prompt("Le joueur "+numeroJoueur+" choisit une case pour jouer \nJouez avec le pavé numérique, chaque chiffre correspond a son emplacement sur la grille"));

        }
        casesPrises.push(caseNum);              //On ajoute a la liste des cases jouées la nouvelle case
        return caseNum;
    }

//Cette fonction remplace l'espace vide par le pion du joueur qui vient de jouer et affiche la grille dans la console
    /**
     * 
     * @param {int} caseNum chiffre en 1 et 9 correspondant à la case jouée
     * @param {Array} grille grille de reference servant de plateau de jeux
     * @param {string} pion caractère utilisé pour représenté un pion du joueu: soit 'X' soit 'O'
     */
    function affichage(caseNum, grille, pion){

        switch(caseNum){                        //switch qui va traiter les 9 possibilités qui corespondent aux 9 cases jouable

            case 1:                             //Pour chaque case on met le pion du joueur aux coordonnés choisi
                grille[2][0]=pion;
                break;
            case 2:
                grille[2][1]=pion;
                break;
            case 3:
                grille[2][2]=pion;
                break;
            case 4:
                grille[1][0]=pion;
                break;
            case 5:
                grille[1][1]=pion;
                break;
            case 6:
                grille[1][2]=pion;
                break;
            case 7:
                grille[0][0]=pion;
                break;
            case 8:
                grille[0][1]=pion;
                break;
            case 9:
                grille[0][2]=pion;
                break;
        }

        console.table(grille);              //On affiche dans la console la grille avec le nouveau pion

    }

//Cette fonction verifie tous les cas possible de victoire et renvoie un booloean faisant étant d'un victoire ou non
/**
 * 
 * @param {array} grille grille de jeux 
 * @param {string} pion caractère utilisé pour représenté un pion du joueu: soit 'X' soit 'O'
 * @param {int} ligne nombre de ligne de la grille
 * @param {int} colonne nombre de colonne de la grille
 * @returns boolean  win qui vaut true lorsque le joueur a gagné, false sinon
 */
    function verifWin(grille, pion, ligne, colonne){

        let win=false;                                                                                          //Initialisation du boolean a false

        for(let i = 0; i<colonne;i++){                                                                          //Vérification des cas de victoire en ligne

            if(grille[i][0]===grille[i][1] && grille[i][1]===grille[i][2] && grille[i][2]===pion){
                 win=true;
            }
            
        }
        for(let i = 0; i<ligne;i++){

            if(grille[0][i]===grille[1][i] && grille[1][i]===grille[2][i] && grille[2][i]===pion){              //Vérification des cas de victoire en colonne
                win=true;
            }
        }

        if(grille[0][0]===grille[1][1] && grille[2][2]===grille[1][1] && grille[2][2]===pion){                  //Vérification du cas de victoire en diagonale (haut a gauche - bas a droite)
            win=true;
        }

        if(grille[0][2]===grille[1][1] && grille[2][0]===grille[1][1] && grille[2][0]===pion){                  //Vérification du cas de victoire en diagonale (bas a gauche - haut a droite)
            win=true;
        }
        
        return win;                                                                                         
    }

    //Cette fonction va verifier si la grille est pleine ou non
    /**
     * 
     * @param {array} grille la grille de jeu
     * @param {int} colonne nombre de colonne de notre grille
     * @param {string} vide caractère utilisé pour représenté le vide dans notre grille
     * @returns boolean  vaut true quand la grille est pleine, vaut false sinon
     */
    function verifPlein(grille, colonne,  vide){

        let full=true;

        for(let i=0;i<colonne;i++){             //On verifie pour chaque ligne s'il y a au moins une case vide
            if(grille[i].includes(vide)){
                full=false;                     //On change le flag a false si tel est le cas
            }
        }

        return full;
    }

    //Cette fonction, apartir du numéro de tour de jeu revoie le numéro du joueur qui doit jouer ce tour
    /**
     * 
     * @param {int} round le numéro du tour
     * @returns int le numero de joueur qui doit jouer ce tour
     */
    function tourJoueur(round){

        if(round%2===0){    //Si le tour est pair c'est au joueur 2
            return 2;
        }else{
            return 1;       //Sinon c'est au joueur 1
        }
    }

    //Cette fonction va traiter l'ensemble des messages de fin a savoir ou match nul ou joueur 1 gagne ou joueur 2 gagne
    /**
     * 
     * @param {boolean} win vaut true quand l'un des joueur a gagné
     * @param {int} tourJoueur le numero de joueur qui doit jouer ce tour
     */
    function epilogue(win, tourJoueur){

        if(win===false){                            //Cas où personne n'a gagné
            console.log("Match nul");
        }else if(win===true && tourJoueur===1){     //Cas où le joueur 1 à gagné
            console.log("Le joueur 1 à gagné");
        }else if(win===true && tourJoueur===2){     //Cas où le joueur 2 à gagné
            console.log("Le joueur 2 à gagné");
        }
    }

//Cette fonction va definir le numéro du rouend ce qui defini quel joueur commence
    /**
     * 
     * @returns int qui vaut ou 0 ou 1 est le numéro du round initial
     */
    function whoStart(){

        let round;

        round=Math.floor(Math.random()*2);      //Choisit un chiffre au hasard: 0 ou 1

        return round;
    }

//Cette fonction va saisir une case libre de façon aléatoire
/**
 * 
 * @param {array} casesPrises tableau comprenant toutes les cases déjà jouées
 * @returns int le numéro de la case choisi par l'ordi
 */
    function computerPlay(casesPrises){

        let caseNum=0; //Initialisation de la variable a 0

        while(casesPrises.includes(caseNum) || caseNum===0){ //Tant que le chiffre généré a déjà été joué on relance la boucle, on met aussi la condition caseNum=0 pour que l'on puisse rentrer dans la boucle
            caseNum=Math.floor(Math.random()*9)+1;
        }
        casesPrises.push(caseNum); //On ajoute la case jouée a la liste des cases jouées
        return caseNum;

    }
    

}






