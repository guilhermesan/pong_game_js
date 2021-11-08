class Racket {

    width;
    height;
    x;
    y;
    maxY;

    constructor(x, y, width, height, maxY, isLeft){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.maxY = maxY-height;
        this.isLeft = isLeft
    }

    draw(ctx) {
        ctx.fillRect(this.x, this.y, this.width, this.height)    
    }

    update(touchedKeys){
        for (let i =0; i<touchedKeys.length; i++){
            let keyCode = touchedKeys[i];
            if (this.isLeft){
                switch(keyCode){
                    case "KeyW":
                        this.moveUp();
                        break;
                    case "KeyS":
                        this.moveDown();
                        break;    
                }
            } else {
                switch(keyCode){
                    case "ArrowUp":
                        this.moveUp();
                        break;
                    case "ArrowDown":
                        this.moveDown();
                        break;    
                } 
            }
              
        }
    }

    moveUp(){
        if (this.y > 0) {
            this.y -= settings.height *0.02;
        }
    }

    moveDown(){
        if (this.y < this.maxY){
            this.y += settings.height *0.02; 
        }
    }

    
    
}
