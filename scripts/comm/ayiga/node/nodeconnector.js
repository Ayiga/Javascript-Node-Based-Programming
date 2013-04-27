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
 function NodeConnector( from, fromIndex, to, toIndex){
	Drawable.call(this);
	this.className = "NodeConnector";
	
	var private = {
		_from : null,
		_fromIndex : 0,
		_to : null,
		_toIndex : 0
	}


	if(from instanceof Node)
		private._from = from;
	
	if(from && fromIndex < from.length && fromIndex >= 0)
		private._fromIndex = fromIndex;
	
	
	if(to instanceof Node)
		private._to = to;
	
	if(to && toIndex < to.length && toIndex >= 0)
		private._toIndex = toIndex;
	
	this.getFrom = function(){
		return private._from;
	}
	
	this.getfromIndex = function(){
		return private._fromIndex;
	}
	
	this.getTo = function(){
		return private._to;
	}
	
	this.getToIndex = function(){
		return private._toIndex;
	}
}
NodeConnector.prototype = new Drawable();
NodeConnector.prototype.constructor = NodeConnector;