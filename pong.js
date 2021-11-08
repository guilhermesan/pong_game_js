

const settings = {
    width : 1024,
    height : 768
}

class Game {

    ctx;
    width;
    height;
    rLeft;
    rRight;
    bol;
    running = false;
    touchedKeys = [];
    currentCountDown = 3;

    pointsLeft = 0;
    pointsRight = 0;

    pointsToWin = 5;

    winner = null;

    constructor(ctx, width, height){
        this.ctx = ctx;
        this.width = width;
        this.height = height;
    }

    registerPlayerControl() {
        document.addEventListener('keyup', this.handleUp.bind(this));
        document.addEventListener('keydown', this.handleDown.bind(this));
    }

    
    runGame(){
        this.init();
        this.registerPlayerControl();
        this.runninng = true;
        this.update();    
    }

    update() {
        this.ctx.clearRect(0, 0, this.width, this.height);
    
        this.bol.draw(this.ctx);
        this.rLeft.draw(this.ctx);
        this.rRight.draw(this.ctx)

        //Draw square field
        this.ctx.beginPath();
        this.ctx.rect(0, 0, this.width, this.height);
        this.ctx.stroke();

        

        this.ctx.font = "40px Arial";
        this.ctx.fillStyle = "black";

        if (this.winner != null) {
            this.ctx.beginPath();
            this.ctx.textBaseline = "top"
            this.ctx.textAlign = "center";
            this.ctx.fillText(this.winner + " Venceu", this.width/2, this.height/2);
            this.ctx.fillText("Pressione enter para jogar denovo", this.width/2, this.height*0.75);
        }
        

        this.ctx.beginPath();
        this.ctx.textBaseline = "top"
        this.ctx.textAlign = "left";
        this.ctx.fillText(`Player 2 - ${this.pointsLeft}`, 10, 10);

        this.ctx.beginPath();
        this.ctx.textBaseline = "top"
        this.ctx.textAlign = "right";
        this.ctx.fillText(`Player 1 - ${this.pointsRight}`, this.width-10, 10);

        if (this.running){

            //Draw mid line
            this.ctx.beginPath();
            this.ctx.moveTo(this.width/2, 0)
            this.ctx.lineTo(this.width/2, this.height)
            this.ctx.stroke();

            this.bol.update();
            this.rLeft.update(this.touchedKeys);
            this.rRight.update(this.touchedKeys);

            if (this.runninng){
                window.requestAnimationFrame(this.update.bind(this));
            }

            this.bol.verifyCollision(this.rLeft, this.rRight);
        } else {
            if (this.winner == null){
                this.ctx.save();
                this.ctx.translate(this.width/2, this.height*0.2);
                this.ctx.beginPath();
                this.ctx.font = "70px Arial";
                this.ctx.fillStyle = "black";
                this.ctx.textAlign = "center";
                this.ctx.fillText(this.currentCountDown, 0, 0);
                this.ctx.restore();
            } 
        }
    }

    verifyWinner(){
        if (this.pointsRight >= this.pointsToWin){
            this.running = false;
            this.winner = "Player 1";
            this.update();
            return true;
        } 
        if (this.pointsLeft >= this.pointsToWin){
            this.running = false;
            this.winner = "Player 2";
            this.update();
            return true;
        }
        return false
    }

    init(){
        this.winner = null;
        this.running = false;
        let racketHeight = this.height*0.2;
        let racketWidth = this.width*0.03;

        this.rLeft = new Racket(10, this.height/2-racketHeight/2, racketWidth, racketHeight, this.height, true);
        this.rRight = new Racket(this.width-racketWidth-10, this.height/2-racketHeight/2, racketWidth, racketHeight, this.height, false);

        this.bol = new Bol(this.ctx, this.width/2, this.height/2, this.width, this.height);
        this.bol.onLoseRight = () => {
            this.pointsLeft++;
            if (!this.verifyWinner()){
                this.init();
            }
        }
        this.bol.onLoseLeft = () => {
            this.pointsRight++;
            if (!this.verifyWinner()){
                this.init();
            }
        }
        this.currentCountDown = 3;
        this.update();
        this.handleCountDown();
    }

    handleCountDown(){
        setTimeout(()=> {
            if (this.currentCountDown > 0){
                console.log(this.currentCountDown);
                this.currentCountDown--;
                if (this.currentCountDown > 0 ){
                    this.handleCountDown();
                } else {
                    this.running = true;
                }
                this.update();
            }
        }, 1000); 
    }

    handleDown(e) {
        console.log(`down ${e.code}`);
        this.removeKey(e);
        this.touchedKeys.push(e.code);
        console.log(`touched count ${this.touchedKeys}`);
    }

    handleUp(e) {
        if (e.code == "Enter"){
            return;
        }
        console.log(`up ${e.code}`);
        this.removeKey(e) 
    }

    removeKey(e){
        if (e.code == "Enter"){
            this.restart();
            return;
        }
        let index = this.touchedKeys.indexOf(e.code)
        if (index >= 0) {
            this.touchedKeys.splice(index, 1);
        }
    }


    restart(){
        this.pointsLeft = 0;
        this.pointsRight = 0;
        this.init();
    }

}

function startGame(){
    let c = document.getElementById("canvas");
    c.width = settings.width;
    c.height = settings.height;
    let ctx = c.getContext("2d");
    let game = new Game(ctx, c.width, c.height)
    game.runGame();
}

startGame();





