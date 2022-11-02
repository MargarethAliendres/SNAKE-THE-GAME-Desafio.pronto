let canvas = document.getElementById("snake"); //criar elemento que irá rodar o jogo  // referenciou o Id do canvas do html//
let context = canvas.getContext("2d"); // ele rendenriza o desenho que vai acontece dentro do canva, ai trabalhar o plano em 2d//
let box = 32;  // 32 pixels cada quadradinho//
let snake = []; // erray//  //la embaixo usa for//
snake[0] ={
    x: 8 * box,   // esse é o tamanho da array//
    y: 8 * box
}

let direction = "right";   //direção da cobrinha//
 let food ={                //posição comida e ela não pode ficar no mesmo lugar//
        x: Math.floor(Math.random() * 15 + 1) * box,
        y: Math.floor(Math.random() * 15 + 1) * box
    }           

function criarBG(){    // criar o backgroud o fundo onde vai rodar o jogo //
    context.fillStyle = "lightgreen";     //cor verde stylo do cavas, do contexto//
    context.fillRect(0, 0, 16*box, 16*box); //tamanho desenha o retângulo usando x e y e a largura e altura setadas do retangulo//
                   // x e y, altura e largura//   // com 16 quadradinhos de altura e 16 quadradinh de largura de 32pixels//16 quadradinhos * 32 pixels//
}

function criarCobrinha() {    //vai percorrer todo o tamanho da array e vai incremetar // amos trabalhar com for ja que é ela vai ser um//
     for (i = 0; i< snake.length; i++) {     // ele vai pintar o corpo da cobrinha de verde e vai setar o tamnaho dela certinho//
          context.fillStyle = "green";       //cor da cobrinha//
      context.fillRect(snake[i].x , snake[i].y, box, box);    // tamanho da cobrinha//
    } 
}

function drawFood (){
    context.fillStyle = "red";
    context.fillRect(food.x, food.y, box, box);
}                  

                           //clique//
document.addEventListener('keydown', update);    // controle da cobrinha pega a tecla que foi digitada no teclado//
function update(event){                          // a tabela do evento//
    if(event.keyCode == 37 && direction != 'right') direction = 'left';
    if(event.keyCode == 38 && direction != 'down') direction = 'up';
    if(event.keyCode == 39 && direction != 'left') direction = 'right';
    if(event.keyCode == 40 && direction != 'up') direction = 'down';

    for(i = 1; i < snake.length; i++){
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
            clearInterval(jogo);
            alert('Game Over :(');
        }
    }
    
}
function iniciarJogo(){       //que alualize o jogo de tempo em tempos //
       
    if(snake[0].x > 15*box && direction == "right") snake[0].x = 0; // aqui é quando a cabeça ultrapassar a quantidade de 15 da esquerda para a direita, ele zera e volta na esquerda novamente.
    if(snake[0].x < 0 && direction == 'left') snake[0].x = 16 * box;
    if(snake[0].y > 15*box && direction == "down") snake[0].y = 0;
    if(snake[0].y < 0 && direction == 'up') snake[0].y = 16 * box;//que alualize o jogo de tempo em tempos //
          
    for(i = 1; i < snake.length; i++){          //quando a cobrinha se chocar com o proprio corpo, tem que recarregar e começar do zero.
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
            clearInterval(jogo);
            alert('Game Over :(');
        }
    }
            
    criarBG();           //funçoes que coloca em tela//
    criarCobrinha();     //funçoes que coloca em tela//
    drawFood();          //funçoes que coloca em tela//

    let snakeX = snake[0].x;            //posição x e y do ponto de partida  da cobrinha//
    let snakeY = snake [0].y;   
    
     if(direction == "right" ) snakeX += box;    // aqui vai acrescentar um quadradinho a mais//                          
     if(direction == "left" ) snakeX -= box;      // aqui vai diminui um quadradinho a mais//                                      
     if(direction == "up" ) snakeY -= box;                                             //coordenadas onde a cobra vai seguir  - se ela tiver indo para o lado direito adicionar um quadradinho lado direito//
     if(direction == "down" ) snakeY += box;      //coordenadas onde a cobra vai seguir  - se ela tiver indo para o lado direito adicionar um quadradinho lado direito//
                                               
     if(snakeX != food.x || snakeY != food.y){        //para a cobrinha aumentar de tamanho  tem que fazer acrescentar e decrementar//
        snake.pop(); //pop tira o último elemento da lista//  //adicionar um elemento e retirar o ultimo isso vai fazer com que ela ande//
    }else{
        food.x = Math.floor(Math.random() * 15 +1) * box;
        food.y = Math.floor(Math.random() * 15 +1) * box;
    }
              
     let newHead = {
        x: snakeX,
        y:snakeY
     }
     snake.unshift(newHead);  
}         
    let jogo = setInterval(iniciarJogo, 200);   //a cada 100 milisigundo o jogo sera reiniciado//

                                            