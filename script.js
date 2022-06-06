const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
let sprites = [];                                         //Sprites Container
let id = Math.floor(Math.random() * 100000);              //ID Generator
let lefMovPos = true;                                     //Is Left Movement Possible?
let rigMovPos = true;                                     //Is Right Movement Possible?
let dowMovPos = true;                                     //Is Down Movement Possible?
let tetris = 0;                                           //Counter for line clearing
let tetramini = ["I", "O", "T", "J", "L", "S", "Z"];      //Type of pieces
let x1, y1, x2, y2, x3, y3, x4, y4;                       //Starting coordinates for new sprites
let tx1, ty1, tx2, ty2, tx3, ty3, tx4, ty4;               //Temporary coordinates for rotation
let direc = 1;                                            //Direction for rotation (1=Up, 2=Right, 3=Down, 4=Left)

newPiece();
setInterval(() => {
    // context.fillStyle = "yellow";
    context.clearRect(0, 0, canvas.width, canvas.height);
    for (const spr of sprites) {
        spr.draw(context);    
    }
    
    //sprite.update(canvas);
    for (const spr of sprites) {
        if (spr.y >= 600) {
            spr.moving = false;
            spr.y = spr.y - 50;
        }    
    }
    
}, 10);

function newPiece() {
    curre = document.getElementById("currPiec");                //For displaying the current piece
    curre.innerHTML = '';
    curreNum = Math.floor(Math.random() * 7);                   //Choose the shape of the new piece
    curreName = document.createTextNode(tetramini[curreNum]);
    curre.appendChild(curreName);
    
    switch (curreNum) {
        case 0:          //I-Shape
            x1 = 0;
            y1 = 0;
            x2 = 0;
            y2 = 50;
            x3 = 0;
            y3 = 100;
            x4 = 0;
            y4 = 150;
            break;

        case 1:          //O-Shape
            x1 = 0;
            y1 = 0;
            x2 = 50;
            y2 = 0;
            x3 = 0;
            y3 = 50;
            x4 = 50;
            y4 = 50;
            break;

        case 2:          //T-Shape
            x1 = 0;
            y1 = 0;
            x2 = 50;
            y2 = 0;
            x3 = 100;
            y3 = 0;
            x4 = 50;
            y4 = 50;
            break;

        case 3:          //J-Shape
            x1 = 50;
            y1 = 0;
            x2 = 50;
            y2 = 50;
            x3 = 50;
            y3 = 100;
            x4 = 0;
            y4 = 100;
            break;

        case 4:          //L-Shape
            x1 = 0;
            y1 = 0;
            x2 = 0;
            y2 = 50;
            x3 = 0;
            y3 = 100;
            x4 = 50;
            y4 = 100;
            break;

        case 5:          //S-Shape
            x1 = 100;
            y1 = 0;
            x2 = 50;
            y2 = 0;
            x3 = 50;
            y3 = 50;
            x4 = 0;
            y4 = 50;
            break;

        case 6:          //Z-Shape
            x1 = 0;
            y1 = 0;
            x2 = 50;
            y2 = 0;
            x3 = 50;
            y3 = 50;
            x4 = 100;
            y4 = 50;
            break;

        default:
            break;
    }
    id = Math.floor(Math.random() * 100000);
    const sprite1 = new RectSprite(x1, y1, 50, 50, "blue", id, 1);      //Generate the first sprite of the piece
    sprites.push(sprite1);
    id = Math.floor(Math.random() * 100000);
    const sprite2 = new RectSprite(x2, y2, 50, 50, "blue", id, 2);      //Generate the second sprite of the piece
    sprites.push(sprite2);
    id = Math.floor(Math.random() * 100000);
    const sprite3 = new RectSprite(x3, y3, 50, 50, "blue", id, 3);      //Generate the third sprite of the piece
    sprites.push(sprite3);
    id = Math.floor(Math.random() * 100000);
    const sprite4 = new RectSprite(x4, y4, 50, 50, "blue", id, 4);      //Generate the fourth sprite of the piece
    sprites.push(sprite4);
    direc = 1;                                                          //Reset the direction
}

function left() {       //Left movement
    for (const spr of sprites) {
        if (spr.moving === true) {
            for (const spr2 of sprites) {
                if (spr.x - 50 === spr2.x && spr.y === spr2.y && spr2.moving === false) {  //Check if any of the moving sprites has a non-moving sprite on the left
                    lefMovPos = false;
                }
                if (spr.x <= 0) {   //Check if any of the moving sprites is exactly on the left edge of the screen
                    lefMovPos = false;
                }
            }
        }
    }
    if (lefMovPos === true) {       //If the previous checks didn't stop the movement, move to the left the moving sprites
        for (const spr of sprites) {
            if (spr.moving === true) {
                spr.x = spr.x - 50;
            }
        }
    }
    lefMovPos = true;
}

function right() {       //Right movement
    for (const spr of sprites) {
        if (spr.moving === true) {
            for (const spr2 of sprites) {
                if (spr.x + 50 === spr2.x && spr.y === spr2.y && spr2.moving === false) {  //Check if any of the moving sprites has a non-moving sprite on the right
                    rigMovPos = false;
                }
                if (spr.x >= 350) {   //Check if any of the moving sprites is exactly on the right edge of the screen
                    rigMovPos = false;
                }
            }
        }
    }
    if (rigMovPos === true) {       //If the previous checks didn't stop the movement, move to the right the moving sprites
        for (const spr of sprites) {
            if (spr.moving === true) {
                spr.x = spr.x + 50;
            }
        }
    }
    rigMovPos = true;
}

// function down() {
//     for (const spr of sprites) {
//         if (spr.moving === true) {
//             spr.y = spr.y + 50;    
//         }    
//     }
// }

function down() {       //Down movement
    for (const spr of sprites) {
        if (spr.moving === true) {
            for (const spr2 of sprites) {
                if (spr.y + 50 === spr2.y && spr.x === spr2.x && spr2.moving === false) { //Check if any of the moving sprites has a non-moving sprite below
                    dowMovPos = false;
                }
                if (spr.y >= 550) {  //Check if any of the moving sprites is exactly on the bottom edge of the screen
                    dowMovPos = false;
                }
            }
        }
    }
    if (dowMovPos === true) {       //If the previous checks didn't stop the movement, move down the moving sprites
        for (const spr of sprites) {
            if (spr.moving === true) {
                spr.y = spr.y + 50;
            }
        }
    } else {                        //Else stop in place the moving sprites..
        for (const spr of sprites) {
            spr.moving = false;
        }
        chkLines();                 //..and check for line clearing
    }
    dowMovPos = true;
}



function chkLines() {
    tetris = 0;
    for (let i = 550; i > 0; i = i - 50) {      //Check every line from the bottom and count how many sprites have landed in every line
        let cont = 0;
        for (const spr of sprites) {
            if (spr.y === i) {
                cont++;
            }
        }
        if (cont === 8) {                       //If a line has 8 sprites remove those sprites, increase the tetris counter, and go back to the bottom line
            sprites = sprites.filter(spr => spr.y != i);
            for (const spr of sprites) {
                if (spr.y <= i) {
                    spr.y = spr.y + 50;
                }
            }
            i = 600;
            tetris++;
        }
    }
    switch (tetris) {
        case 1:
            console.log("Line!");
            break;
        case 2:
            console.log("Double!");
            break;
        case 3:
            console.log("Tris!");
            break;
        case 4:
            console.log("Tetris!");
            break;
    
        default:
            break;
    }
}

function rotate() {

        switch (curreNum) {

            case 2:          //T-Shape              123   <-- Sprites order
            for (const spr of sprites) {//           4
                if (spr.moving === true) {      
                    if (spr.order === 1) {      
                        switch (direc) {        //Rotate the moving sprites depending the direction and which sprite is rotating (memorize the previous coordinates)
                            case 1:
                                tx1 = spr.x;
                                spr.x = spr.x + 100;
                                ty1 = spr.y;
                                spr.y = spr.y;
                                break;
                            case 2:
                                tx2 = spr.x;
                                spr.x = spr.x;
                                ty2 = spr.y;
                                spr.y = spr.y + 100;
                                break;
                            case 3:
                                tx3 = spr.x;
                                spr.x = spr.x - 100;
                                ty3 = spr.y;
                                spr.y = spr.y;
                                break;
                            case 4:
                                tx4 = spr.x;
                                spr.x = spr.x;
                                ty4 = spr.y;
                                spr.y = spr.y - 100;
                                break;
                            default:
                                break;
                        }
                    }
                    if (spr.order === 2) {      
                        switch (direc) {        
                            case 1:
                                tx1 = spr.x;
                                spr.x = spr.x + 50;
                                ty1 = spr.y;
                                spr.y = spr.x + 50;
                                break;
                            case 2:
                                tx2 = spr.x;
                                spr.x = spr.x - 50;
                                ty2 = spr.y;
                                spr.y = spr.y + 50;
                                break;
                            case 3:
                                tx3 = spr.x;
                                spr.x = spr.x - 50;
                                ty3 = spr.y;
                                spr.y = spr.y - 50;
                                break;
                            case 4:
                                tx4 = spr.x;
                                spr.x = spr.x + 50;
                                ty4 = spr.y;
                                spr.y = spr.y - 50;
                                break;
                            default:
                                break;
                        }
                    }
                    if (spr.order === 3) {      
                        switch (direc) {        
                            case 1:
                                tx1 = spr.x;
                                spr.x = spr.x;
                                ty1 = spr.y;
                                spr.y = spr.y + 100;
                                break;
                            case 2:
                                tx2 = spr.x;
                                spr.x = spr.x - 100;
                                ty2 = spr.y;
                                spr.y = spr.y;
                                break;
                            case 3:
                                tx3 = spr.x;
                                spr.x = spr.x;
                                ty3 = spr.y;
                                spr.y = spr.y - 100;
                                break;
                            case 4:
                                tx4 = spr.x;
                                spr.x = spr.x + 100;
                                ty4 = spr.y;
                                spr.y = spr.y;
                                break;
                            default:
                                break;
                        }
                    }
                    if (spr.order === 4) {      
                        switch (direc) {        
                            case 1:
                                tx1 = spr.x;
                                spr.x = spr.x;
                                ty1 = spr.y;
                                spr.y = spr.y;
                                break;
                            case 2:
                                tx2 = spr.x;
                                spr.x = spr.x;
                                ty2 = spr.y;
                                spr.y = spr.y;
                                break;
                            case 3:
                                tx3 = spr.x;
                                spr.x = spr.x;
                                ty3 = spr.y;
                                spr.y = spr.y;
                                break;
                            case 4:
                                tx4 = spr.x;
                                spr.x = spr.x;
                                ty4 = spr.y;
                                spr.y = spr.y;
                                break;
                            default:
                                break;
                        }
                    }
                }
            }
                break;

            case 3:          //J-Shape              1 
            for (const spr of sprites) {//          2     <--Sprites order
            if (spr.moving === true) {//           43
                if (spr.order === 1) {      
                    switch (direc) {        //Rotate the moving sprites depending the direction and which sprite is rotating (memorize the previous coordinates)
                        case 1:
                            tx1 = spr.x;
                            spr.x = spr.x;
                            ty1 = spr.y;
                            spr.y = spr.y + 100;
                            break;
                        case 2:
                            tx2 = spr.x;
                            spr.x = spr.x - 100;
                            ty2 = spr.y;
                            spr.y = spr.y;
                            break;
                        case 3:
                            tx3 = spr.x;
                            spr.x = spr.x;
                            ty3 = spr.y;
                            spr.y = spr.y - 100;
                            break;
                        case 4:
                            tx4 = spr.x;
                            spr.x = spr.x + 100;
                            ty4 = spr.y;
                            spr.y = spr.y;
                            break;
                        default:
                            break;
                    }
                }
                if (spr.order === 2) {      
                    switch (direc) {        
                        case 1:
                            tx1 = spr.x;
                            spr.x = spr.x - 50;
                            ty1 = spr.y;
                            spr.y = spr.y + 50;
                            break;
                        case 2:
                            tx2 = spr.x;
                            spr.x = spr.x - 50;
                            ty2 = spr.y;
                            spr.y = spr.y - 50;
                            break;
                        case 3:
                            tx3 = spr.x;
                            spr.x = spr.x + 50;
                            ty3 = spr.y;
                            spr.y = spr.y - 50;
                            break;
                        case 4:
                            tx4 = spr.x;
                            spr.x = spr.x + 50;
                            ty4 = spr.y;
                            spr.y = spr.y + 50;
                            break;
                        default:
                            break;
                    }
                }
                if (spr.order === 3) {      
                    switch (direc) {        
                        case 1:
                            tx1 = spr.x;
                            spr.x = spr.x - 100;
                            ty1 = spr.y;
                            spr.y = spr.y;
                            break;
                        case 2:
                            tx2 = spr.x;
                            spr.x = spr.x;
                            ty2 = spr.y;
                            spr.y = spr.y - 100;
                            break;
                        case 3:
                            tx3 = spr.x;
                            spr.x = spr.x + 100;
                            ty3 = spr.y;
                            spr.y = spr.y;
                            break;
                        case 4:
                            tx4 = spr.x;
                            spr.x = spr.x;
                            ty4 = spr.y;
                            spr.y = spr.y + 100;
                            break;
                        default:
                            break;
                    }
                }
                if (spr.order === 4) {      
                    switch (direc) {        
                        case 1:
                            tx1 = spr.x;
                            spr.x = spr.x - 50;
                            ty1 = spr.y;
                            spr.y = spr.y - 50;
                            break;
                        case 2:
                            tx2 = spr.x;
                            spr.x = spr.x + 50;
                            ty2 = spr.y;
                            spr.y = spr.y - 50;
                            break;
                        case 3:
                            tx3 = spr.x;
                            spr.x = spr.x + 50;
                            ty3 = spr.y;
                            spr.y = spr.y + 50;
                            break;
                        case 4:
                            tx4 = spr.x;
                            spr.x = spr.x - 50;
                            ty4 = spr.y;
                            spr.y = spr.y + 50;
                            break;
                        default:
                            break;
                    }
                }
            }
        }
                break;

            case 4:          //L-Shape          1    
            for (const spr of sprites) {//      2   <--Sprites order
            if (spr.moving === true) {//        34
                if (spr.order === 1) {      
                    switch (direc) {        //Rotate the moving sprites depending the direction and which sprite is rotating (memorize the previous coordinates)
                        case 1:
                            tx1 = spr.x;
                            spr.x = spr.x + 100;
                            ty1 = spr.y;
                            spr.y = spr.y;
                            break;
                        case 2:
                            tx2 = spr.x;
                            spr.x = spr.x;
                            ty2 = spr.y;
                            spr.y = spr.y + 100;
                            break;
                        case 3:
                            tx3 = spr.x;
                            spr.x = spr.x - 100;
                            ty3 = spr.y;
                            spr.y = spr.y;
                            break;
                        case 4:
                            tx4 = spr.x;
                            spr.x = spr.x;
                            ty4 = spr.y;
                            spr.y = spr.y - 100;
                            break;
                        default:
                            break;
                    }
                }
                if (spr.order === 2) {      
                    switch (direc) {        
                        case 1:
                            tx1 = spr.x;
                            spr.x = spr.x + 50;
                            ty1 = spr.y;
                            spr.y = spr.y - 50;
                            break;
                        case 2:
                            tx2 = spr.x;
                            spr.x = spr.x + 50;
                            ty2 = spr.y;
                            spr.y = spr.y + 50;
                            break;
                        case 3:
                            tx3 = spr.x;
                            spr.x = spr.x - 50;
                            ty3 = spr.y;
                            spr.y = spr.y + 50;
                            break;
                        case 4:
                            tx4 = spr.x;
                            spr.x = spr. x - 50;
                            ty4 = spr.y;
                            spr.y = spr.y - 50;
                            break;
                        default:
                            break;
                    }
                }
                if (spr.order === 3) {      
                    switch (direc) {        
                        case 1:
                            tx1 = spr.x;
                            spr.x = spr.x;
                            ty1 = spr.y;
                            spr.y = spr.y - 100;
                            break;
                        case 2:
                            tx2 = spr.x;
                            spr.x = spr.x + 100;
                            ty2 = spr.y;
                            spr.y = spr.y;
                            break;
                        case 3:
                            tx3 = spr.x;
                            spr.x = spr.x;
                            ty3 = spr.y;
                            spr.y = spr.y + 100;
                            break;
                        case 4:
                            tx4 = spr.x;
                            spr.x = spr.x - 100;
                            ty4 = spr.y;
                            spr.y = spr.y;
                            break;
                        default:
                            break;
                    }
                }
                if (spr.order === 4) {      
                    switch (direc) {        
                        case 1:
                            tx1 = spr.x;
                            spr.x = spr.x - 50;
                            ty1 = spr.y;
                            spr.y = spr.y - 50;
                            break;
                        case 2:
                            tx2 = spr.x;
                            spr.x = spr.x + 50;
                            ty2 = spr.y;
                            spr.y = spr.y - 50;
                            break;
                        case 3:
                            tx3 = spr.x;
                            spr.x = spr.x + 50;
                            ty3 = spr.y;
                            spr.y = spr.y + 50;
                            break;
                        case 4:
                            tx4 = spr.x;
                            spr.x = spr.x - 50;
                            ty4 = spr.y;
                            spr.y = spr.y + 50;
                            break;
                        default:
                            break;
                    }
                }
            }
        }
                break;

            case 5:          //S-Shape          21     <--Sprites order
            for (const spr of sprites) {//     43
            if (spr.moving === true) {      
                if (spr.order === 1) {      
                    switch (direc) {        //Rotate the moving sprites depending the direction and which sprite is rotating (memorize the previous coordinates)
                        case 1:
                            tx1 = spr.x;
                            spr.x = spr.x;
                            ty1 = spr.y;
                            spr.y = spr.y + 100;
                            break;
                        case 2:
                            tx2 = spr.x;
                            spr.x = spr.x - 100;
                            ty2 = spr.y;
                            spr.y = spr.y - 50;
                            break;
                        case 3:
                            tx3 = spr.x;
                            spr.x = spr.x + 50;
                            ty3 = spr.y;
                            spr.y = spr.y - 50;
                            break;
                        case 4:
                            tx4 = spr.x;
                            spr.x = spr.x + 50;
                            ty4 = spr.y;
                            spr.y = spr.y;
                            break;
                        default:
                            break;
                    }
                }
                if (spr.order === 2) {      
                    switch (direc) {        
                        case 1:
                            tx1 = spr.x;
                            spr.x = spr.x + 50;
                            ty1 = spr.y;
                            spr.y = spr.y + 50;
                            break;
                        case 2:
                            tx2 = spr.x;
                            spr.x = spr.x - 50;
                            ty2 = spr.y;
                            spr.y = spr.y;
                            break;
                        case 3:
                            tx3 = spr.x;
                            spr.x = spr.x;
                            ty3 = spr.y;
                            spr.y = spr.y;
                            break;
                        case 4:
                            tx4 = spr.x;
                            spr.x = spr.x;
                            ty4 = spr.y;
                            spr.y = spr.y - 50;
                            break;
                        default:
                            break;
                    }
                }
                if (spr.order === 3) {      
                    switch (direc) {        
                        case 1:
                            tx1 = spr.x;
                            spr.x = spr.x;
                            ty1 = spr.y;
                            spr.y = spr.y;
                            break;
                        case 2:
                            tx2 = spr.x;
                            spr.x = spr.x;
                            ty2 = spr.y;
                            spr.y = spr.y - 50;
                            break;
                        case 3:
                            tx3 = spr.x;
                            spr.x = spr.x + 50;
                            ty3 = spr.y;
                            spr.y = spr.y + 50;
                            break;
                        case 4:
                            tx4 = spr.x;
                            spr.x = spr.x - 50;
                            ty4 = spr.y;
                            spr.y = spr.y;
                            break;
                        default:
                            break;
                    }
                }
                if (spr.order === 4) {      
                    switch (direc) {        
                        case 1:
                            tx1 = spr.x;
                            spr.x = spr.x + 50;
                            ty1 = spr.y;
                            spr.y = spr.y - 50;
                            break;
                        case 2:
                            tx2 = spr.x;
                            spr.x = spr.x + 50;
                            ty2 = spr.y;
                            spr.y = spr.y;
                            break;
                        case 3:
                            tx3 = spr.x;
                            spr.x = spr.x;
                            ty3 = spr.y;
                            spr.y = spr.y - 100;
                            break;
                        case 4:
                            tx4 = spr.x;
                            spr.x = spr.x - 100;
                            ty4 = spr.y;
                            spr.y = spr.y - 50;
                            break;
                        default:
                            break;
                    }
                }
            }
        }
                break;

            case 6:          //Z-Shape
            for (const spr of sprites) {
            if (spr.moving === true) {      
                if (spr.order === 1) {      
                    switch (direc) {        //Rotate the moving sprites depending the direction and which sprite is rotating (memorize the previous coordinates)
                        case 1:
                            tx1 = spr.x;
                            spr.x =;
                            ty1 = spr.y;
                            spr.y =;
                            break;
                        case 2:
                            tx2 = spr.x;
                            spr.x =;
                            ty2 = spr.y;
                            spr.y =;
                            break;
                        case 3:
                            tx3 = spr.x;
                            spr.x =;
                            ty3 = spr.y;
                            spr.y =;
                            break;
                        case 4:
                            tx4 = spr.x;
                            spr.x =;
                            ty4 = spr.y;
                            spr.y =;
                            break;
                        default:
                            break;
                    }
                }
                if (spr.order === 2) {      
                    switch (direc) {        
                        case 1:
                            tx1 = spr.x;
                            spr.x =;
                            ty1 = spr.y;
                            spr.y =;
                            break;
                        case 2:
                            tx2 = spr.x;
                            spr.x =;
                            ty2 = spr.y;
                            spr.y =;
                            break;
                        case 3:
                            tx3 = spr.x;
                            spr.x =;
                            ty3 = spr.y;
                            spr.y =;
                            break;
                        case 4:
                            tx4 = spr.x;
                            spr.x =;
                            ty4 = spr.y;
                            spr.y =;
                            break;
                        default:
                            break;
                    }
                }
                if (spr.order === 3) {      
                    switch (direc) {        
                        case 1:
                            tx1 = spr.x;
                            spr.x =;
                            ty1 = spr.y;
                            spr.y =;
                            break;
                        case 2:
                            tx2 = spr.x;
                            spr.x =;
                            ty2 = spr.y;
                            spr.y =;
                            break;
                        case 3:
                            tx3 = spr.x;
                            spr.x =;
                            ty3 = spr.y;
                            spr.y =;
                            break;
                        case 4:
                            tx4 = spr.x;
                            spr.x =;
                            ty4 = spr.y;
                            spr.y =;
                            break;
                        default:
                            break;
                    }
                }
                if (spr.order === 4) {      
                    switch (direc) {        
                        case 1:
                            tx1 = spr.x;
                            spr.x =;
                            ty1 = spr.y;
                            spr.y =;
                            break;
                        case 2:
                            tx2 = spr.x;
                            spr.x =;
                            ty2 = spr.y;
                            spr.y =;
                            break;
                        case 3:
                            tx3 = spr.x;
                            spr.x =;
                            ty3 = spr.y;
                            spr.y =;
                            break;
                        case 4:
                            tx4 = spr.x;
                            spr.x =;
                            ty4 = spr.y;
                            spr.y =;
                            break;
                        default:
                            break;
                    }
                }
            }
        }
                break;

            default:
                for (const spr of sprites) {
                if (spr.moving === true) {
                    spr.x = spr.x + spr.y;
                    spr.y = spr.x - spr.y;
                    spr.x = spr.x - spr.y;
                }
            }
                break;
        }
}