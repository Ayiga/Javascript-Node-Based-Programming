/**
 *  Copyright (c) 2013, Theodore Schnepper, ayiga.com
 *  All rights reserved.
 *
 *  Redistribution and use in source and binary forms, with or without
 *  modification, are permitted provided that the following conditions
 *  are met:
 *
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above
 *       copyright notice, this list of conditions and the following
 *       disclaimer in the documentation and/or other materials provided
 *       with the distribution.
 *     * Neither the name of the comm.ayiga nor the names
 *       of its contributors may be used to endorse or promote products
 *       derived from this software without specific prior written
 *       permission.
 *
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 *  "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 *  LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS
 *  FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
 *  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING,
 *  BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 *  LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 *  CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT
 *  LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN
 *  ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 *  POSSIBILITY OF SUCH DAMAGE
 */

test = require.include("comm.Includes");

window.onresize = function(event){
	var width = window.innerWidth;
	var height = window.innerHeight;
	canvas.setAttribute("width", width + "px" );
	canvas.setAttribute("height", height + "px" );
	draw();
}

function initialize(){
	canvas = document.createElement('canvas');
	document.body.appendChild(canvas);
	Context2D = canvas.getContext('2d');
	{
		var width = window.innerWidth;
		var height = window.innerHeight;
		canvas.setAttribute("width", width + "px" );
		canvas.setAttribute("height", height + "px" );
	}

	nodes = [];
	var node = new Node();
	nodes.push(node);
	node.getFrame().getPosition().setX(10);
	node.getFrame().getPosition().setY(10);
	node.getFrame().getSize().setWidth(100);
	node.getFrame().getSize().setHeight(100);
	node.setBackgroundColor("#770000");
	
	node = new Node();
	nodes.push(node);
	node.getFrame().getPosition().setX(150);
	node.getFrame().getPosition().setY(10);
	node.getFrame().getSize().setWidth(100);
	node.getFrame().getSize().setHeight(100);
	node.setBackgroundColor("#007700");
	draw();

	new EventHandler(canvas);
	canvas.eventHandler.addListener('touchstart', mousedownhandler);
	canvas.eventHandler.addListener('touchend', mouseuphandler);
	canvas.eventHandler.addListener('touchmove', mousemovehandler);
	canvas.eventHandler.addListener('mousedown', mousedownhandler);
	canvas.eventHandler.addListener('mouseup', mouseuphandler);
	canvas.eventHandler.addListener('mousemove', mousemovehandler);

	
	/*c.addEventListener('touchstart', mousedownhandler);
	c.addEventListener('touchend', mouseuphandler);
	c.addEventListener('touchmove', mousemovehandler);
	document.onmousedown = mousedownhandler;
	document.onmouseup = mouseuphandler;
	document.onmousemove = mousemovehandler;*/
}
function addsubpoints(event){
	/*var ev = event;
	var x = ev.clientX + window.pageXOffset;
	var y = ev.clientY + window.pageYOffset;
	var scale = window.innerWidth / c.width;
	var height = Math.floor(scale * c.height);
	x = Math.affineTransform(0, x, window.innerWidth, 0, c.width);
	y = Math.affineTransform(0, y, height, 0, c.height);
	var index = points.length;
	points[index] = new Position({ "x" : x, "y" : y });
	draw(points);*/
}

function draw(){
	Context2D.clearRect(0,0,canvas.width, canvas.height);
	nodes.forEach(function(element, index, array){
		element.draw();
	});
	
	var points = [];
	var x, y;
	x = nodes[0].getFrame().getPosition().getX() +
		nodes[0].getFrame().getSize().getWidth();
	y = nodes[0].getFrame().getPosition().getY() +
		nodes[0].getFrame().getSize().getHeight() / 2.0;
		
	var start = new Position({"x" : x, "y" : y});
	
	x = nodes[1].getFrame().getPosition().getX();
	y = nodes[1].getFrame().getPosition().getY() +
		nodes[1].getFrame().getSize().getHeight() / 2.0;
		
	var end = new Position({"x" : x, "y" : y});
	
	var weight1 = new Position({"x" : end.getX(), "y" : start.getY()});
	var weight2 = new Position({"x" : start.getX(), "y" : end.getY()});
	
	points.push(start);
	points.push(weight1);
	points.push(weight2);
	points.push(end);
	
	if(!points.length)
		return;
	
	//Context2D.clearRect(0,0,c.width, c.height);
	Context2D.beginPath();
	Context2D.moveTo(points[0].getX(), points[0].getY());
	
	var iterations = 1000;
	var n = points.length;
	Context2D.beginPath();
	for(var i = 0; i < iterations; i++){
		var t = i/iterations;
		var x = 0, y = 0;
		for(var j = 0; j < n; j++){
			var coeff = Math.binomialCoefficient(n - 1, j);
			var temp = coeff * Math.pow(1 - t, n - j - 1) * Math.pow(t, j);
			x += temp * points[j].getX();
			y += temp * points[j].getY();
		}
		
		Context2D.lineTo(x, y);
		
		//Context2D.moveTo(x, y);
	}
	Context2D.stroke();
	
	for(var i = 0; i < points.length; i++){
		point = points[i];
		var x = point.getX();
		var y = point.getY();
		Context2D.beginPath();
		Context2D.arc(x,y,2,0,2*Math.PI);
		Context2D.stroke();
	}
}

var selectedNode = null;
function mousedownhandler(e){
	var event = e ? e:event;
	var x = (event.touches) ? event.touches[0].clientX : event.clientX;
	var y = (event.touches) ? event.touches[0].clientY : event.clientY;
	//x = Math.affineTransform(0, x, window.innerWidth, c.offsetLeft, c.offsetWidth + c.offsetLeft);
	//y = Math.affineTransform(0, y, window.innerHeight, c.offsetTop, c.offsetHeight + c.offsetTop);
	nodes.forEach(function(node, index, array){
		if(node.getFrame().containsPoint(new Position({"x" : x, "y" : y }))){
			selectedNode = node;
		}
	});
	//console.log('mouse down');
}

function mouseuphandler(e){
	var event = e ? e:event;
	if(selectedNode){
		selectedNode = false;
	}
	//console.log('mouse up');
}

function mousemovehandler(e){
	var event = e ? e:event;
	var x = (event.touches) ? event.touches[0].clientX : event.clientX;
	var y = (event.touches) ? event.touches[0].clientY : event.clientY;
	//x = Math.affineTransform(0, x, window.innerWidth, c.offsetLeft, c.offsetWidth + c.offsetLeft);
	//y = Math.affineTransform(0, y, c.offsetTop, c.offsetHeight + c.offsetTop);
	if(selectedNode){
		selectedNode.getFrame().getPosition().setX(x);
		selectedNode.getFrame().getPosition().setY(y);
		draw();
	}
	//console.log('mouse move');
}