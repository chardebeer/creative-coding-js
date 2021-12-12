const canvasSketch = require('canvas-sketch');
const math = require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random');
const tweakpane = require('tweakpane');
const Color = require('canvas-sketch-util/color');


const settings = {
  dimensions: [ 1080, 1080 ],
  animate: true
};

const params = {
    scaleMin: 0.1,
    scaleMax: 0.1,
  num: 10,
  radius: 0.7,
  rect: 0.5,
  background: "#333333",
  color1: "#ff79c5",
    freq: 0.001,
    angle: 0.02,
  color2: "#89f7fe"}

const sketch = () => {
  return ({ context, width, height, frame }) => {

    context.fillStyle = params.background;
    context.fillRect(0, 0, width, height);



    const cx = width  * 0.5;
    const cy = height * 0.5;

    const w = width  * 0.01;
    const h = height * 0.1;
    let x, y;

    const num = params.num;
    const radius = width * 0.3;




    for (let i = 0; i < num; i++) {


      const slice = math.degToRad(360 / num);
      const angle = slice * i;

      x = cx + radius * Math.sin(angle);
      y = cy + radius * Math.cos(angle);

      const n = random.noise3D(x, y, frame * 10, params.freq * i);



        let fillBase = params.color1
        let base = params.color2;
        let hOff = 15 * i + n;
        let sOff = i * n;
        let lOff = -10 + n;



        const resultCol2 = Color.offsetHSL(base, hOff, sOff, lOff);
        const resultCol1 = Color.offsetHSL(fillBase, hOff, sOff, lOff);


      context.strokeStyle = resultCol2.hex;
        context.fillStyle = resultCol1.hex;


          context.save();
      context.translate(x, y);
      context.rotate(-angle + 1);
    //  context.scale(random.range(0.1, 2), random.range(0.2, 0.5));
context.scale(params.scaleMin * n, params.scaleMax * n);
      context.beginPath();

      context.rect(-w * 0.5 + n, i + n, w, h);
      context.fill();

      context.restore();

      context.save();
      context.translate(cx, cy);
      context.rotate(-angle *n);

      context.lineWidth = n * 180;

      context.beginPath();
      context.arc(0, 0, radius * params.radius, slice * params.angle * n, slice * random.range(1, 5));
      context.stroke();

      context.restore();
    }
  };
};

const createPane = () => {
  const pane = new tweakpane.Pane();
  let folder;

  folder = pane.addFolder({title: "Size"});
  folder.addInput(params, 'scaleMin', {min: 0.1, max: 2});
  folder.addInput(params, 'scaleMax', {min: 0.1, max: 2});
  folder.addInput(params, 'num', {min: 1, max: 100, step: 1});
  folder.addInput(params, 'radius', {min: 0.01, max: 2});
    folder.addInput(params, 'freq', {min: 0.01, max: 2});
    folder.addInput(params, 'angle', {min: -10, max: 6});


    folder.addInput(params, 'background', {picker: 'inline', expanded: true,});
  folder.addInput(params, 'color1', {picker: 'inline', expanded: true,});
  folder.addInput(params, 'color2', {picker: 'inline', expanded: true,});



}

createPane();

canvasSketch(sketch, settings);