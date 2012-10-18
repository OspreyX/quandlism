QuandlismContext_.stage = function() {
  var context = this,
  buffer = document.createElement('canavs')
  lines = [],
  width = buffer.width = context.width(), height = buffer.height = context.height(),
  xScale = d3.scale.linear(),
  yScale = d3.scale.linear(),
  extent = null,
  format = d3.format('.2s'),
  colors = ["#08519c","#3182bd","#6baed6","#bdd7e7","#bae4b3","#74c476","#31a354","#006d2c"];
  
  
  function stage(selection) {
    
    var self = this;
    lines = selection.datum();
    selection.append('canvas').attr('width', context.width()).attr('height', context.height());
       
    var canvas = selection.select('canvas');
    canvas = canvas.node().getContext('2d');
    
    exes = _.map(lines, function(line, j) {
      return line.extent();
    });  
    
    max = d3.max(exes, function(m) { return m[1]; });
    min = d3.min(exes, function(m) { return m[0]; });
    
  
    yScale.domain([min, max]); 
    yScale.range([height, 0 ]);
    xScale.domain([0, lines[0].length()]);
    xScale.range([0, width]);
    
    _.each(lines, function(line, j) {

      
      canvas.beginPath();
      canvas.moveTo(xScale(0), yScale(line.valueAt(0)));
      for (i = 1; i < line.length(); i++) {
        canvas.lineTo(xScale(i), yScale(line.valueAt(i)));
      }
      canvas.strokeStyle = colors[j];
      canvas.stroke();
      canvas.closePath();
      
   });
   
  }
  
  stage.lines = function(_) {
    if (!arguments.length) {
      return lines;
    }
    lines = _;
    return stage;
  }
  
  return stage;
}