function drawRoundRect(x, y, w, h, r, color) {
    ctx.beginPath();
    
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
    ctx.strokeStyle = color || '#000';
    ctx.stroke();
    ctx.fillStyle= color || '#fff';
    ctx.fill();
}


function drawRhombus(x, y, l,name) {
    ctx.beginPath();
    ctx.moveTo(x, y + l);
    ctx.lineTo(x - l * 2, y);
    ctx.lineTo(x, y - l);
    ctx.lineTo(x + l * 2, y);
    ctx.closePath();
    ctx.stroke();
    drawText(x,y,name)
}

function drawText(x, y, text, color) {
    ctx.font = "14px bold 黑体";
    // 设置颜色
    ctx.fillStyle = color||"#000";
    // 设置水平对齐方式
    ctx.textAlign = "center";
    // 设置垂直对齐方式
    ctx.textBaseline = "middle";
    ctx.fillText(text,x, y)
}
function drawSubText(x, y, text, color) {
    ctx.font = "12px 黑体";
    // 设置颜色
    ctx.fillStyle = color||"#000";
    // 设置水平对齐方式
    ctx.textAlign = "center";
    // 设置垂直对齐方式
    ctx.textBaseline = "middle";
    ctx.fillText(text,x, y)
}

/**
 * 圆角矩形开始对象
 * @param {Object} x
 * @param {Object} y
 */
function Point(x, y,name,color,textColor) {
    this.flag = "point";
    this.h = 20;
    this.w = 20;
    this.x = x;
    this.y = y;
    drawRoundRect(x - this.w / 2, y - this.h / 2, this.w, this.h, this.h/2,color);
    drawText(x,y-20,name,textColor)
}

/**
 * 矩形步骤对象
 * @param {Object} x
 * @param {Object} y
 */
function Step(x, y,name,color,textColor,subText) {
    this.flag = "step";
    this.h = 50;
    this.w = 2 * this.h;
    this.x = x;
    this.y = y;
    drawRoundRect(x - this.w / 2, y - this.h / 2, this.w, this.h, 7,color);
    drawText(x,y,name,textColor)
    subText&& drawSubText(x,y+16,subText,textColor)
}

/**
 * 菱形条件对象
 * @param {Object} x
 * @param {Object} y
 */
function Condition(x, y,name) {
    this.flag = "condition";
    this.l = 30;
    this.x = x;
    this.y = y;
    drawRhombus(x, y, this.l,name);
}

Point.prototype.drawBottomToTop = function(obj) {
    if(obj.flag == "step") {
        var arrow = new Arrow(this.x, this.y + this.h / 2, obj.x, obj.y - obj.h / 2);
        arrow.drawBottomToTop(ctx);
    } else if(obj.flag == "point") {
        var arrow = new Arrow(this.x, this.y + this.h / 2, obj.x, obj.y - obj.h / 2);
        arrow.drawBottomToTop(ctx);
    }
}
Point.prototype.drawRightToLeft = function(obj) {
    if(obj.flag == "step") {
        var arrow = new Arrow(this.x+this.h, this.y, obj.x-obj.h, obj.y);
        arrow.drawLeftToRightOrRightToLeft(ctx);
    } else if(obj.flag == "point") {
        var arrow = new Arrow(this.x+this.h, this.y, obj.x-obj.h, obj.y);
        arrow.drawLeftToRightOrRightToLeft(ctx);
    }
}

Step.prototype.drawBottomToTop = function(obj) {
    if(obj.flag == "step") {
        var arrow = new Arrow(this.x, this.y + this.h / 2, obj.x, obj.y - obj.h / 2);
        arrow.drawBottomToTop(ctx);
    } else if(obj.flag == "point") {
        var arrow = new Arrow(this.x, this.y + this.h / 2, obj.x, obj.y - obj.h / 2);
        arrow.drawBottomToTop(ctx);
    }
}

Step.prototype.drawRightToLeft = function(obj) {
    if(obj.flag == "step") {
        var arrow = new Arrow(this.x+this.h, this.y , obj.x-obj.h, obj.y);
        arrow.drawLeftToRightOrRightToLeft(ctx);
    } else if(obj.flag == "point") {
        var arrow = new Arrow(this.x+this.h, this.y , obj.x-obj.h, obj.y);
        arrow.drawLeftToRightOrRightToLeft(ctx);
    }
}



Condition.prototype.drawBottomToTop = function(obj) {
    if(obj.flag == "step") {
        var arrow = new Arrow(this.x, this.y + this.l, obj.x, obj.y - obj.h / 2);
        arrow.drawBottomToTop(ctx);
    } else if(obj.flag == "condition") {
        var arrow = new Arrow(this.x, this.y + this.l, obj.x, obj.y - obj.l);
        arrow.drawBottomToTop(ctx);
    }
}

Condition.prototype.drawRightToTop = function(obj) {
    if(obj.flag == "step") {
        var arrow = new Arrow(this.x + this.l * 2, this.y, obj.x, obj.y - obj.h / 2);
        arrow.drawLeftOrRightToTop(ctx);
    } else if(obj.flag == "condition") {
        var arrow = new Arrow(this.x + this.l * 2, this.y, obj.x, obj.y - obj.l);
        arrow.drawLeftOrRightToTop(ctx);
    }
}

Condition.prototype.drawLeftToTop = function(obj) {
    if(obj.flag == "step") {
        var arrow = new Arrow(this.x - this.l * 2, this.y, obj.x, obj.y - obj.h / 2);
        arrow.drawLeftOrRightToTop(ctx);
    } else if(obj.flag == "condition") {
        var arrow = new Arrow(this.x - this.l * 2, this.y, obj.x, obj.y - obj.l);
        arrow.drawLeftOrRightToTop(ctx);
    }
}

Condition.prototype.drawRightToLeft = function(obj) {
    if(obj.flag == "step") {
        var arrow = new Arrow(this.x + this.l * 2, this.y, obj.x - this.w / 2, obj.y);
        arrow.drawLeftToRightOrRightToLeft(ctx);
    } else if(obj.flag == "condition") {
        var arrow = new Arrow(this.x + this.l * 2, this.y, obj.x - this.l * 2, obj.y);
        arrow.drawLeftToRightOrRightToLeft(ctx);
    }
}

Condition.prototype.drawLeftToRight = function(obj) {
    if(obj.flag == "step") {
        var arrow = new Arrow(this.x - this.l * 2, this.y, obj.x + this.w / 2, obj.y);
        arrow.drawLeftToRightOrRightToLeft(ctx);
    } else if(obj.flag == "condition") {
        var arrow = new Arrow(this.x - this.l * 2, this.y, obj.x + this.l * 2, obj.y);
        arrow.drawLeftToRightOrRightToLeft(ctx);
    }
}