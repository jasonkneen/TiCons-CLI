var colors = require('colors'),
  _ = require('underscore');

var levels = {
  info: {
    color: colors.white
  },
  trace: {
    color: colors.grey
  },
  debug: {
    color: colors.blue,
    level: 'log'
  },
  error: {
    color: colors.red
  },
  warn: {
    color: colors.yellow
  },
  ok: {
    color: colors.green,
    level: 'info'
  }
};

_.each(levels, function(settings, label) {
  exports[label] = function(msg) {
    console[settings.level || label](settings.color('[' + label.toUpperCase() + ']') + (label.length !== 5 ? (new Array(6 - label.length).join(' ')) : '') + ' ' + msg);
  };
});