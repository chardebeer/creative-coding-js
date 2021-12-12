const canvasSketch = require('canvas-sketch');

const settings = {
  dimensions: [ 1080, 1080 ]
};

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    const cols = 10;
    const rows = 10;
    const numCells = cols * rows;

    /*Grid Dimensions**/
    const gridw = width * 0.8;              //Grid Width
    const gridh= height * 0.8;              //Grid Height

    /*Cell Dimensions**/
    const cellw = gridw / cols;             //Cell Width
    const cellh = gridh / rows;             //Cell Height

    /*Margins**/
    const margx = (width - gridw) * 0.5;    //Margin on x-axis
    const margy = (height - gridh) * 0.5;   //Margin on y-axis


    for (let i = 0; i < numCells; i++){
      const col = i % cols;
      /* NOTE: The Math.floor() function returns the largest integer less than or equal to a given number.**/
      const row = Math.floor(i / cols);       //At every 4 steps grid row ++1

      /* Cell Dimensions**/
      const x = col * cellw;
      const y = row * cellh;
      const w = cellw * 0.8;
      const h = cellh * 0.8;

      context.save();

      context.translate(x, y);
      context.translate(margx, margy);
      context.translate(cellw * 0.5, cellh * 0.5); //Get back to origin

      context.lineWidth = 4;

      context.beginPath();
      context.moveTo(w * -0.5, 0); // Minus half of the width of the line
      context.lineTo(w * 0.5, 0); // Half of the width of the line

      context.stroke();


      context.restore();




    }
  };
};

canvasSketch(sketch, settings);
