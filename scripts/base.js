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

 if(!Math){
	Math = {};
}

Math.fact = function (n){
	if(n <= 0){
		return 1;
	}
	
	return n * Math.fact(n - 1);
}

Math.binomialCoefficient = function (n, k){
	var result = 1;
	for(var i = 1; i <= k; i++){
		result *= (n - (k - i)) / i;
	}
	
	return result;
}

//From o - O to i - I
Math.affineTransform = function (o, x, O, i, I){
	var result = ((I - i) * (x - o) / (O - o)) + i;
	
	return result;
}

var Object = function(){
	this.className = "Object";
	
	this.toString = function(){
		var str = this.className;
		return str;
	}
}

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
	this.className = "require";
	Object.call(this);
	var private = {
		_included : [ "Base" ],
		_baseurl :  "scripts/",
		_manifest : {}
	};
	
	this.setManifest = function ( manifest ){
		private._manifest = manifest;
	}

	var include_helper = function( name_arr, manifest ){
		var includes = [];
		var classes = [];
		var manifest_ref = manifest;
		var path_acc = private._baseurl;
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
			if(private._included.indexOf(element) === -1){
				var script = document.createElement("script");
				script.setAttribute("type","text/javascript");
				script.setAttribute("async","");
				script.src = element;
				document.head.insertBefore(script, document.head.childNodes[0]);
				private._included.push(element);
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
	this.include = function( name ) {
		var name_arr = name.split(".");
		return include_helper(name_arr, private._manifest);
	}
}
Require.prototype.constructor = Require;
Require.prototype = Object;
require = new Require();


