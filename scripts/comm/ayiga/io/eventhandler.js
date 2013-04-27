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
 **/

/**
 * The EventHandler class is meant to intercept events from the DOM and pass them
 * to the appropriate Handler Types.  This way I can write specific Handlers for
 * specific reasons (Touch, Mouse, Keyboard, etc...).  It should also allow me the
 * ability to bind speicfic actions to functions.
 *
 * Most of this is planned for future use, as of now, it just acts like addEventListener,
 * except that it also stores itself in the element it's called on for easy access.
 * May end up discarding this class in the long run, if not, will require a major revision
 * as some point.
 **/
function EventHandler( element ){
	if(!element){
		return null;
	}

	Object.call(this);
	element.eventHandler = this;

	var private = {
		_element : element,
		_eventBindings : {}
	};

	this.addListener = function( event_type, func){
		if(!private._eventBindings[event_type]){
			private._eventBindings[event_type] = [];
		}
		private._element.addEventListener(event_type, this.handleEvent);
		private._eventBindings[event_type].push(func);
	}

	this.handleEvent = function( e ){
		var event = e ? e:event;
		if(!event.type){
			return;
		}
		if(private._eventBindings[event.type]){
			private._eventBindings[event.type].forEach(function(element, index, arr){
				element(event);
			});
		}
	}
}
EventHandler.prototype.constructor = EventHandler;
EventHandler.prototype = new Object();
