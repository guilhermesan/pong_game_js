class Bol {

    ctx
    x
    y
    directionX = -1;
    directionY = 0.3;
    maxX
    maxY
    radio = 20;
    speed = 10

    onLoseRight = () => {}
    onLoseLeft = () => {}
    
    constructor(ctx, x, y, maxX, maxY){
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.maxX = maxX;
        this.maxY = maxY;
    }

    addRacket(racket){
        this.rackets.push(racket);
    }

    verifyCollision(racketLeft, racketRight){

        let racketLeftX = racketLeft.x + racketLeft.width

        if (racketLeftX >= this.x && Math.abs(this.x - racketLeftX) < 10){
            if (this.y >= racketLeft.y && this.y <= racketLeft.y + racketLeft.height){
                this.changeDirection(); 
            }    
        }

        if (racketRight.x <= this.x && Math.abs(racketRight.x - this.x) < 10){
            if (this.y >= racketRight.y && this.y <= racketRight.y + racketRight.height){
                this.changeDirection(); 
            }    
        }
        
    }

    update(){
        let speed = this.speed;
        this.x += (this.directionX * speed);
        this.y += (this.directionY * speed);

        if (this.x <= (this.radio*-2)) {
            this.onLoseLeft();
        }
        if (this.x >= this.maxX) {
            this.onLoseRight();
        }

        if ((this.y <= 0 && this.directionY < 0) || (this.y >= this.maxY &&this.directionY > 0)){
            this.directionY = this.directionY * -1;    
        } 

    }

    changeDirection(){
        this.speed *= 1.01;
        this.directionX = this.directionX* -1; 
        this.directionY = ((Math.random()*2)-1)*0.5;
    }



    draw(ctx){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radio, 0, Math.PI * 2)
        ctx.fill();
    }
}