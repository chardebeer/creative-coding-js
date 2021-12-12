const canvasSketch = require('canvas-sketch');
const math = require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random');


const settings = {
  dimensions: [ 1080, 1080 ],
  animate: true
};

/**
 * These functions have been replaced with the canvas-sketch-util lib
 * 
const degToRad = (degrees) => {
  return degrees / 180 * Math.PI;
}
const randomRange = (min, max) => {
return Math.random() * (max - min) + min;
}
 */


const sketch = () => {
  return ({ context, width, height }) => {

    const gradient = context.createLinearGradient(0.5, 0.5, 200, 300)
    gradient.addColorStop(0, 'rgba(0,188,255,0.36)');
    gradient.addColorStop(0.5 , 'rgb(163,62,245)');

    const inv = context.createLinearGradient(0.5, 0.5, 200, 300)
    inv.addColorStop(0, 'rgba(163,62,245,0.19)');
    inv.addColorStop(0.5 , 'rgba(0,188,255,0.22)');

    context.fillStyle = "black";
    context.fillRect(0, 0, width, height);

 

    context.fillStyle = inv;
const cx = width * 0.55;
const cy = height * 0.5;
const w = width * 0.01;
const h = height * 0.9;
let x, y;


const num = 200;
const radius = width * 0.3;

for (let i = 0; i < num; i++  ){
const slice = math.degToRad(360 / num);
const angle = slice * i;

x = cx + radius * Math.sin(angle);
y = cy + radius * Math.cos(angle);


  context.save();
  context.translate(x, y);
  context.rotate(-angle);
  context.scale(random.range(0.5, 1), random.range(0.1, 1))

  context.beginPath();
  context.rect( 0, 0,-w, -h);
  context.fill();
  context.restore();



  context.strokeStyle = gradient;
  context.save();
  context.translate(x + (1 + Math.sqrt(5)) / 2 , y );
  context.rotate(-angle);

  context.lineWidth = random.range(1, 10);

  context.beginPath();
  context.arc(100 * Math.cos(60 * num) , 100 * Math.sin(60 * num), radius *  Math.PI / 2, 0, Math.PI * 2 );
  context.stroke();
  context.restore();

}




  };
};

canvasSketch(sketch, settings);
