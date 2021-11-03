class Racket {

    width;
    height;
    x;
    y;
    maxY;

    constructor(x, y, width, height, maxY){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.maxY = maxY-height;
    }

    draw(ctx) {
        ctx.fillRect(this.x, this.y, this.width, this.height)    
    }

    update(touchedKeys){
        for (let i =0; i<touchedKeys.length; i++){
            let keyCode = touchedKeys[i];
            console.log(`touched: ${keyCode}`);
            switch(keyCode){
                case "ArrowUp":
                    console.log(`y ${this.y}`)
                    if (this.y > 0) {
                        this.y -= settings.height *0.02;
                    }
                    break;
                case "ArrowDown":
                    console.log(`y ${this.y}, max: ${this.maxY}`);
                    if (this.y < this.maxY){
                        console.log(`touched: ${keyCode}`);
                        this.y += settings.height *0.02; 
                    }
                    break;    
            }     
        }
    }

    
    
}
