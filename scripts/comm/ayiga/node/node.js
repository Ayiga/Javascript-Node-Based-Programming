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
 function Node(){
	//Constructor For Extension
	Drawable.call(this);
	this.className = "Node";
	var private = {
		_inputs : [],
		_outputs : [],
		_backgroundColor : "#FF0000"
	}
	
	this.hasInputs = function(){
		return private._inputs.length > 0;
	}
	
	this.hasOutputs = function(){
		return private._outputs.length > 0;
	}
	
	this.getInputs = function(){
		return private._inputs;
	}
	
	this.getOutputs = function(){
		return private._outputs;
	}
	
	this.getBackgroundColor = function(){
		return private._backgroundColor;
	}
	
	this.setBackgroundColor = function( backgroundColor ){
		private._backgroundColor = backgroundColor;
	}

	this.addData = function( data, isinput ){
		if(isinput){
			private._inputs.push(new NodeData( this, private._inputs.length, data));
		}
		else{
			private._outputs.push(new NodeData( this, private._outputs.length, data));
		}
	}
	
	this.draw = function(){
		private._inputs.forEach(function( nodedata, index, array ) {
			nodedata.draw();
		});

		private._outputs.forEach(function( nodedata, index, array ) {
			nodedata.draw();
		});
		Context2D.fillStyle=private._backgroundColor;
		Context2D.fillRect( 
			this.getFrame().getPosition().getX(),
			this.getFrame().getPosition().getY(),
			this.getFrame().getSize().getWidth(),
			this.getFrame().getSize().getHeight());

	}
}
Node.prototype = new Drawable();
Node.prototype.constructor = Node;