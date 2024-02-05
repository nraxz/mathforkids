'use strict';
function vec2D(x, y) {
	this.x = x || 0;
	this.y = y || 0;
}

vec2D.prototype = {

	magnitude: function() {
		return Math.sqrt(this.x * this.x + this.y * this.y);
	},

	magnitudeSquare: function() {
		return this.x * this.x + this.y * this.y;
	},

	normalize: function() {
		let magnetude = this.magnitude();

		return this.div(magnetude);
	},

	add: function(otherVector2) {

		if (otherVector2 instanceof vec2D) {
			this.x = this.x + otherVector2.x;
			this.y = this.y + otherVector2.y;
		} else {
			this.x = this.x + otherVector2;
			this.y = this.y + otherVector2;
		}

		return this;

	},

	subtract: function(otherVector2) {

		if (otherVector2 instanceof vec2D) {
			this.x = this.x - otherVector2.x;
			this.y = this.y - otherVector2.y;
		} else {
			this.x = this.x - otherVector2;
			this.y = this.y - otherVector2;
		}

		return this;

	},

	mult: function(otherVector2) {

		if (otherVector2 instanceof vec2D) {
			this.x = this.x * otherVector2.x;
			this.y = this.y * otherVector2.y;
		} else {
			this.x = this.x * otherVector2;
			this.y = this.y * otherVector2;
		}

		return this;

	},

	div: function(otherVector2) {

		if (otherVector2 instanceof vec2D) {
			this.x = this.x / otherVector2.x;
			this.y = this.y / otherVector2.y;
		} else {
			this.x = this.x / otherVector2;
			this.y = this.y / otherVector2;
		}

		return this;

	},

	rotate: function (angle) {

		angle = this.toRadians(angle);
		var sen = Math.sin(angle);
		var coss = Math.cos(angle);

		var newX = this.x * coss - this.y * sen;
		var newY = this.x * sen + this.y * coss;

		this.x = newX;
		this.y = newY;

		return this;
	},

	angle:function (otherVector2) {
		if (otherVector2 instanceof vec2D) {
			return Math.atan2(otherVector2.y, otherVector2.x);
		} else {
			return Math.atan2(otherVector2, otherVector2);
		}
	},

	toRadians: function(angleInDegrees) {
		return angleInDegrees * Math.PI / 180.0;// Math.PI / 180.0 radiano = 1 grau
	},

	toDegrees: function(angleInRadians) {
		return angleInRadians * 180.0 / Math.PI;//180.0 / Math.PI graus = 1 radiano
	},

  set: function(x, y) {
		this.x = x;
		this.y = y;
		return this;
	},
	get: function() {
		return this;
	}
};