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
 
if(!window.comm){
	comm = {};
}

if(!comm.ayiga){
	comm.ayiga = {};
}

if(!comm.ayiga.node){
	comm.ayiga.node = {};
}
 
comm.ayiga.node.NodeOperator = function(){
	//Ensures that Every NodeOperator will have a process function that will process the results.
	comm.ayiga.node.Node.call(this);
	this.process = function(){
		var inputs = this.getInputs();
		var outputs = this.getOutputs();
		for(var i = 0; i < inputs.length; i++){
			outputs[i] = inputs[i];
		}
	}
}
comm.ayiga.node.NodeOperator.prototype = new comm.ayiga.Object( { "extends" : [ comm.ayiga.node.Node ] });
comm.ayiga.node.NodeOperator.prototype.constructor = comm.ayiga.node.NodeOperator;
comm.ayiga.node.NodeOperator.prototype.className = "NodeOperator";