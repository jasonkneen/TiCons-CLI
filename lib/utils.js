// jscs:disable jsDoc
'use strict';

var _ = require('underscore'),
	colors = require('colors');

function prettyJSON(val, key, depth) {

	if (!depth) {
		depth = 0;
	}

	var prefix = '';

	if (_.isString(key)) {

		if (depth) {
			prefix += new Array(depth).join(' ');
		}

		prefix += key.toString().green + ':';

	}

	if (_.isArray(val) && !_.isObject(_.first(val))) {
		console.log(prefix + ' ' + val.join(', '));

	} else if (_.isObject(val)) {
		console.log(prefix);

		if (!_.isArray(val)) {
			depth += 2;
		}

		_.each(val, function (val, key) {
			prettyJSON(val, key, depth);
		});

	} else {
		console.log(prefix + ((val !== null && val !== undefined) ? ' ' + val : ''));
	}
}

exports.prettyJSON = prettyJSON;
