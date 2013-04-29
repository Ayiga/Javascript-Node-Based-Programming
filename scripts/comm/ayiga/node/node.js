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
require.include("comm.ayiga.mvc.ViewController");

if(!window.comm){
	comm = {};
}

if(!comm.ayiga){
	comm.ayiga = {};
}

if(!comm.ayiga.node){
	comm.ayiga.node = {};
}

/**
 * The Node class is meant to represent a programming Node.
 * The specific definition for what a node is can be a little
 * difficult to specify.
 *
 * The general purpose of a Node is to recieve and/or send data.
 * The node may also perform operations on the data.  The
 * operations that these Nodes do, and do not perform are up
 * to anything that extends a Node.
 *
 * Ths Node object maintains the default drawing method for
 * all nodes, as well as all input and output management.
 **/
comm.ayiga.node.Node = function(){
 	comm.ayiga.mvc.ViewController.call(this);
	var _private = {
		_inputs : [],
		_outputs : [],
		_backgroundColor : "#FF0000"
	}
	
	/**
	 * hasInputs is a simple function that provides a quick
	 * check to see whether the Node it is called on has inputs
	 * or not.
	 *
	 * returns true if the inputs array is not empty and false
	 * otherwise
	 **/
	function hasInputs(){
		return _private._inputs.length > 0;
	}
	this.hasInputs = hasInputs;
	
	/**
	 * hasOutputs is a simple function that provides a quick
	 * check to see whether the Node it is called on has outputs
	 * or not.
	 * returns true if the outpus array is not empty and false
	 * otherwise
	 **/
	function hasOutputs(){
		return _private._outputs.length > 0;
	}
	this.hasOutputs = hasOutputs;
	
	/**
	 * the getInputs function returns the array of inputs directly
	 * to the user.  Ideally this should return a clone of the array
	 * At the moment, it just returns the reference.
	 *
	 * returns an array of nodeData representing the input nodes.
	 **/
	function getInputs(){
		return _private._inputs;
	}
	this.getInputs = getInputs;
	
	/**
	 *
	 **/
	function getOutputs(){
		return _private._outputs;
	}
	this.getOutputs = getOutputs;
	
	function getBackgroundColor(){
		return _private._backgroundColor;
	}
	this.getBackgroundColor = getBackgroundColor;
	
	function setBackgroundColor( backgroundColor ){
		_private._backgroundColor = backgroundColor;
	}
	this.setBackgroundColor = setBackgroundColor;

	function adddata( data, isinput ){
		if(isinput){
			_private._inputs.push(new comm.ayiga.node.NodeData( this, _private._inputs.length, data));
		}
		else{
			_private._outputs.push(new comm.ayiga.node.NodeData( this, _private._outputs.length, data));
		}
	}
	this.addData = adddata;
	
	function draw(){
		_private._inputs.forEach(function( nodedata, index, array ) {
			nodedata.draw();
		});

		_private._outputs.forEach(function( nodedata, index, array ) {
			nodedata.draw();
		});
		Context2D.fillStyle = _private._backgroundColor;
		Context2D.fillRect( 
			this.getFrame().getPosition().getX(),
			this.getFrame().getPosition().getY(),
			this.getFrame().getSize().getWidth(),
			this.getFrame().getSize().getHeight());
	}
	this.draw = draw;
}
//Node.prototype.prototypes = [ Drawable ];
comm.ayiga.node.Node.prototype = new comm.ayiga.Object( { "extends" : [ comm.ayiga.mvc.ViewController ] });
comm.ayiga.node.Node.prototype.constructor = comm.ayiga.node.Node;
comm.ayiga.node.Node.prototype.className = "Node";