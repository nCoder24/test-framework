const style = function(text, code) {
  return "\033[" + code + "m" + text + "\033[0m";
}

const underline = function(text) {
  return style(text, 4);
}

const bold = function(text) {
  return style(text, 1);
}

const red = function(text) {
  return style(text, 31);
}

const green = function(text) {
  return style(text, 32);
}

const headline = function(text) {
  return "\n" + bold(underline(text)) + "\n";
}

exports.style = style;
exports.underline = underline;
exports.bold = bold;
exports.red = red;
exports.green = green;
exports.headline = headline;
