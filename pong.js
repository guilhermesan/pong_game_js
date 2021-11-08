

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

        //Draw mid line
        this.ctx.beginPath();
        this.ctx.moveTo(this.width/2, 0)
        this.ctx.lineTo(this.width/2, this.height)
        this.ctx.stroke();

        this.ctx.font = "40px Arial";
        this.ctx.fillStyle = "black";

        this.ctx.beginPath();
        this.ctx.textBaseline = "top"
        this.ctx.textAlign = "left";
        this.ctx.fillText(`Player 2 - ${this.pointsLeft}`, 10, 10);

        this.ctx.beginPath();
        this.ctx.textBaseline = "top"
        this.ctx.textAlign = "right";
        this.ctx.fillText(`Player 1 - ${this.pointsRight}`, this.width-10, 10);

        if (this.currentCountDown <= 0){
            this.bol.update();
            this.rLeft.update(this.touchedKeys);
            this.rRight.update(this.touchedKeys);

            if (this.runninng){
                window.requestAnimationFrame(this.update.bind(this));
            }

            this.bol.verifyCollision(this.rLeft, this.rRight);
        } else {
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

    init(){
        let racketHeight = this.height*0.2;
        let racketWidth = this.width*0.03;

        this.rLeft = new Racket(10, this.height/2-racketHeight/2, racketWidth, racketHeight, this.height, true);
        this.rRight = new Racket(this.width-racketWidth-10, this.height/2-racketHeight/2, racketWidth, racketHeight, this.height, false);

        this.bol = new Bol(this.ctx, this.width/2, this.height/2, this.width, this.height);
        this.bol.onLoseRight = () => {
            this.pointsLeft++;
            this.init();
        }
        this.bol.onLoseLeft = () => {
            this.pointsRight++;
            this.init();
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
                this.update();
                if (this.currentCountDown > 0 ){
                    this.handleCountDown();
                }
                
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
        console.log(`up ${e.code}`);
        this.removeKey(e) 
    }

    removeKey(e){
        let index = this.touchedKeys.indexOf(e.code)
        if (index >= 0) {
            this.touchedKeys.splice(index, 1);
        }
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





