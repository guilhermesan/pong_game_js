

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
    touchedKeys = []

    constructor(ctx, width, height){
        this.ctx = ctx;
        this.width = width;
        this.height = height;
        let racketHeight = this.height*0.2;
        let racketWidth = this.width*0.03;

        this.rLeft = new Racket(10, this.height/2-racketHeight/2, racketWidth, racketHeight, this.height);
        this.rRight = new Racket(width-racketWidth-10, this.height/2-racketHeight/2, racketWidth, racketHeight, this.height);
        this.bol = new Bol(this.ctx, this.width/2, this.height/2, this.width, this.height);
    }

    registerPlayerControl() {
        document.addEventListener('keyup', this.handleUp.bind(this));
        document.addEventListener('keydown', this.handleDown.bind(this));
    }

    
    runGame(){
        this.registerPlayerControl();
        this.runninng = true;
        this.update();    
    }

    update() {
        this.ctx.clearRect(0, 0, this.width, this.height);
        

        this.bol.update(10);
        this.bol.draw(this.ctx);

        this.rLeft.update(this.touchedKeys);
        this.rLeft.draw(this.ctx);

        this.rRight.update(this.touchedKeys);
        this.rRight.draw(this.ctx)

        this.ctx.beginPath();
        this.ctx.rect(0, 0, this.width, this.height);
        this.ctx.stroke();

        this.bol.verifyCollision(this.rLeft, this.rRight);

        if (this.runninng){
            window.requestAnimationFrame(this.update.bind(this));
        }
    }

    handleDown(e) {
        console.log(`down ${e.code}`);
        this.touchedKeys.splice(e.code)
        this.touchedKeys.push(e.code);
    }

    handleUp(e) {
        console.log(`up ${e.code}`);
        this.touchedKeys.splice(e.code)
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





