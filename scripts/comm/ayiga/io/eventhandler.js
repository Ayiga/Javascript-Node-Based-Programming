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

if(!window.comm){
	comm = {};
}

if(!comm.ayiga){
	comm.ayiga = {};
}

if(!comm.ayiga.io){
	comm.ayiga.io = {};
}

comm.ayiga.io.EventHandler = function( element ){
	if(!element){
		return null;
	}
	element.eventHandler = this;

	var _private = {
		_element : element,
		_eventBindings : {},
		_eventTypes : [
			"abort",
			"Addons",
			"afterprint",
			"afterscriptexecute",
			"AlertActive",
			"AlertClose",
			"animationend",
			"animationiteration",
			"animationstart",
			"audioprocess",
			"beforeprint",
			"beforescriptexecute",
			"beforeunload",
			"beginEvent",
			"blocked",
			"blur",
			"broadcast",
			"cached",
			"canplay",
			"canplaythrough",
			"cardstatechange",
			"cfstatechange",
			"change",
			"chargingchange",
			"chargingtimechange",
			"CheckboxStateChange",
			"checking",
			"click",
			"close",
			"command",
			"commandupdate",
			"compassneedscalibration",
			"complete",
			"compositionend",
			"compositionstart",
			"compositionupdate",
			"connectionInfoUpdate",
			"contextmenu",
			"copy",
			"CssRuleViewChanged",
			"CssRuleViewCSSLinkClicked",
			"CssRuleViewRefreshed",
			"cut",
			"datachange",
			"dataerror",
			"dblclick",
			"devicehumidity",
			"devicelight",
			"devicemotion",
			"devicenoise",
			"deviceorientation",
			"devicepressure",
			"deviceproximity",
			"devicetemperature",
			"Devtools",
			"dischargingtimechange",
			"DOMActivate",
			"DOMAttributeNameChanged",
			"DOMAttrModified",
			"DOMAutoComplete",
			"DOMCharacterDataModified",
			"DOMContentLoaded",
			"DOMElementNameChanged",
			"DOMFocusIn",
			"DOMFocusOut",
			"DOMFrameContentLoaded",
			"DOMLinkAdded",
			"DOMLinkRemoved",
			"DOMMenuItemActive",
			"DOMMenuItemInactive",
			"DOMMetaAdded",
			"DOMMetaRemoved",
			"DOMModalDialogClosed",
			"DOMMouseScroll",
			"DOMNodeInserted",
			"DOMNodeInsertedIntoDocument",
			"DOMNodeRemoved",
			"DOMNodeRemovedFromDocument",
			"DOMPopupBlocked",
			"DOMSubtreeModified",
			"DOMTitleChanged",
			"DOMWillOpenModalDialog",
			"DOMWindowClose",
			"DOMWindowCreated",
			"downloading",
			"drag",
			"dragdrop",
			"dragend",
			"dragenter",
			"dragexit",
			"draggesture",
			"dragleave",
			"dragover",
			"dragstart",
			"drop",
			"durationchange",
			"emptied",
			"ended",
			"endEvent",
			"error",
			"Event",
			"focus",
			"focusin",
			"focusout",
			"fullscreen",
			"fullscreenchange",
			"fullscreenerror",
			"gamepadconnected",
			"gamepaddisconnected",
			"hashchange",
			"icccardlockerror",
			"iccinfochange",
			"input",
			"invalid",
			"keydown",
			"keypress",
			"keyup",
			"levelchange",
			"load",
			"loadeddata",
			"loadedmetadata",
			"loadend",
			"loadstart",
			"localized",
			"message",
			"mousedown",
			"mouseenter",
			"mouseleave",
			"mousemove",
			"mouseout",
			"mouseover",
			"mouseup",
			"mousewheel",
			"MozAfterPaint",
			"MozAudioAvailable",
			"MozBeforeResize",
			"MozEdgeUIGesture",
			"MozEnteredDomFullscreen",
			"MozGamepadAxisMove",
			"MozGamepadButtonDown",
			"MozGamepadButtonUp",
			"Mozilla",
			"MozMagnifyGesture",
			"MozMagnifyGestureStart",
			"MozMagnifyGestureUpdate",
			"MozMousePixelScroll",
			"MozOrientation",
			"MozPressTapGesture",
			"MozRotateGesture",
			"MozRotateGestureStart",
			"MozRotateGestureUpdate",
			"MozScrolledAreaChanged",
			"MozSwipeGesture",
			"MozTapGesture",
			"MozTouchDown",
			"MozTouchMove",
			"MozTouchUp",
			"Non",
			"noupdate",
			"obsolete",
			"offline",
			"onalerting",
			"onbusy",
			"oncallschanged",
			"onconnected",
			"onconnecting",
			"ondelivered",
			"ondialing",
			"ondisabled",
			"ondisconnected",
			"ondisconnecting",
			"onenabled",
			"onerror",
			"onheld",
			"onholding",
			"onincoming",
			"online",
			"onreceived",
			"onresuming",
			"onsent",
			"onstatechange",
			"onstatuschange",
			"open",
			"orientationchange",
			"overflow",
			"pagehide",
			"pageshow",
			"paste",
			"pause",
			"play",
			"playing",
			"pointerlockchange",
			"pointerlockerror",
			"popstate",
			"popuphidden",
			"popuphiding",
			"popupshowing",
			"popupshown",
			"progress",
			"progress",
			"RadioStateChange",
			"ratechange",
			"readystatechange",
			"repeatEvent",
			"reset",
			"resize",
			"scroll",
			"seeked",
			"seeking",
			"select",
			"show",
			"sizemodechange",
			"SSTabClosing",
			"SSTabRestored",
			"SSTabRestoring",
			"SSWindowClosing",
			"SSWindowStateBusy",
			"SSWindowStateReady",
			"stalled",
			"stkcommand",
			"stksessionend",
			"storage",
			"submit",
			"success",
			"suspend",
			"SVGAbort",
			"SVGError",
			"SVGLoad",
			"SVGResize",
			"SVGScroll",
			"SVGUnload",
			"SVGZoom",
			"TabClose",
			"TabHide",
			"TabOpen",
			"TabPinned",
			"TabSelect",
			"TabShow",
			"TabUnpinned",
			"tabviewframeinitialized",
			"tabviewhidden",
			"tabviewsearchdisabled",
			"tabviewsearchenabled",
			"tabviewshown",
			"text",
			"timeout",
			"timeupdate",
			"touchcancel",
			"touchenter",
			"touchleave",
			"touchmove",
			"touchstart",
			"transitionend",
			"unload",
			"updateready",
			"upgradeneeded",
			"uploadprogress",
			"userproximity",
			"ussdreceived",
			"ValueChange",
			"versionchange",
			"visibilitychange",
			"voicechange",
			"volumechange",
			"waiting",
			"wheel",
			"XUL"
			]
	};


	for(var i = 0; i < _private._eventTypes.length; i++){
		var temp = _private._element.addEventListener( _private._eventTypes[i], this);
		temp;
	}

	this.addListener = function( event_type, func){
		if(!_private._eventBindings[event_type]){
			_private._eventBindings[event_type] = [];
		}
		_private._eventBindings[event_type].push(func);
	}

	this.handleEvent = function( event ){
		//var event = e ? e:event;
		//if(!event.type){
		//	return;
		//}

		//console.log(event);
		if(_private._eventBindings[event.type]){
			_private._eventBindings[event.type].forEach(function(element, index, arr){
				element(event);
			});
		}
	}
}

comm.ayiga.io.EventHandler.prototype = new comm.ayiga.Object();
comm.ayiga.io.EventHandler.prototype.constructor = comm.ayiga.io.EventHandler;
comm.ayiga.io.EventHandler.prototype.className = "EventHandler";
