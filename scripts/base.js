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

// Make the comm package/namespace
if(!window.comm){
	comm = {};
}

// Make the comm.ayiga subset
if(!comm.ayiga){
	comm.ayiga = {};
}

/**
 * Make the Math Package to implement our own Math Functions that are not
 * currently standard.  This allows us to ensure that these functions will
 * exist, and that they are implemented in this way, even if base Math
 * eventually defines a standard version of them.
 **/
if(!comm.ayiga.Math){
	comm.ayiga.Math = {};
}


/**
 * returns the factorial of a number n.  This function is defined recursively
 * it returns n * fact(n - 1) until it reaches 0.
 **/
comm.ayiga.Math.fact = function (n){
	n = Math.floor(n);
	if(n <= 0){
		return 1;
	}
	
	return n * comm.ayiga.Math.fact(n - 1);
}

/**
 * 
 **/
comm.ayiga.Math.binomialCoefficient = function (n, k){
	var result = 1;
	for(var i = 1; i <= k; i++){
		result *= (n - (k - i)) / i;
	}
	
	return result;
}

//From o - O to i - I
comm.ayiga.Math.affineTransform = function (o, x, O, i, I){
	var result = ((I - i) * (x - o) / (O - o)) + i;
	
	return result;
}

/**
 * Object Redefinition.  There's things that I'd like every function to have/do
 * Specifically when it comes to inheritance.  It's a great bit hacky, and it's
 * not something I particuallry care for.  However, it's behavior that doesn't
 * exist in javascript, and as such, I feel that it is a bit warnted.
 *
 * Redefines the default toString to return the public variable className
 *
 * Adds function inherits, when provided a function, returns true if the class
 * it was called on was inherited.
 **/
 comm.ayiga.Object = function( inheritance ){
	if( !this.prototypes ){
		this.prototypes = [];
	}
	if( inheritance && inheritance.extends ){
		for(var i = 0; i < inheritance.extends.length; i++){
			if(this.prototypes.indexOf(inheritance.extends[i]) === -1){
				this.prototypes.push( new inheritance.extends[i]);
				inheritance.extends[i].call(this);
			}
		}
	}

	/**
	 * The inherits function is used to determine if this class has inherited
	 * the specified class given by class_construct
	 *
	 * returns true if it inherits the class and false otherwise
	 **/
	function inherits( class_construct ){
		var result = false;
		for(var i = 0; i < this.prototypes.length; i++){
			result = result || (this.prototypes[i] instanceof class_construct) || this.prototypes[i].inherits( class_construct );
		}

		return result;
	}
	this.inherits = inherits;
	
	function toString(){
		var str = this.className;
		return str;
	}
	this.toString = toString;
}
comm.ayiga.Object.prototype.constructor = Object;
comm.ayiga.Object.prototype.className = "Object";

var getAjaxObject = function(){
	if(window.XMLHttpRequest){
		return new XMLHttpRequest();
	}

	return new ActiveXObject("Microsoft.XMLHTTP");
}

/**
 * An Auto-Load class, should allow for the inclusion of various js files based on
 * Package References (hopefully).  Will require a manifest file in order to locate
 * said files.
 **/
function Require() {
	var _private = {
		_included : [ "Base" ],
		_baseurl :  "scripts/",
		_manifest : {}
	};
	
	function setManifest( manifest ){
		_private._manifest = manifest;
	}
	this.setManifest = setManifest;

	var include_helper = function( name_arr, manifest ){
		var includes = [];
		var classes = [];
		var manifest_ref = manifest;
		var path_acc = _private._baseurl;
		name_arr.reverse();
		while(name_arr.length){
			var name = name_arr.pop();
			if(!manifest_ref[name])
				return false;
			if(name_arr.length){
				path_acc += name + "/";
				manifest_ref = manifest_ref[name];
			}
			else{
				if(name == "*" ){
					for(var element in manifest_ref){
						includes.push(path_acc + manifest_ref[element]);
						classes.push(element);
					}
				}
				else{
					includes.push(path_acc + manifest_ref[name]);
					classes.push(name);
				}
			}
		}
		includes.forEach(function(element, index, arr){
			if(_private._included.indexOf(element) === -1){
				var script = document.createElement("script");
				script.setAttribute("type","text/javascript");
				script.setAttribute("async","");
				script.src = element;
				document.head.insertBefore(script, document.head.childNodes[0]);
				_private._included.push(element);
			}
		});

		return true;
	}

	/**
	 * com.putable.test
	 * translates to the result of 
	 * manifest.com.putable.test
	 * ex:
	 * scripts/com/putable/test.js
	 **/

	function include( name ){
		var name_arr = name.split(".");
		return include_helper(name_arr, _private._manifest);
	}
	this.include = include;
}
Require.prototype = new comm.ayiga.Object();
Require.prototype.constructor = Require;
Require.prototype.className = "Require";
require = new Require();
