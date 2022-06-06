class RectSprite{
    constructor(x, y, w, h, color, id, order){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.color = color;
        this.moving = true;
        this.id = id;
        this.order = order;
    }

    // update(canvas) {
    //     this.x = this.x + this.speedX;
    //     this.y = this.y + this.speedY;
    //     if (this.x > canvas.width - this.w || this.x < 0) {
    //         this.speedX = this.speedX * -1;
    //     }
    //     if (this.y > canvas.height - this.h || this.y < 0){
    //         this.speedY = this.speedY * -1;
    //     }
    // }

    draw(context){
        context.fillStyle = this.color;
        context.fillRect(this.x, this.y, this.w, this.h);
    }
}