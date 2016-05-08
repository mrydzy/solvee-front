"use strict";

function formatOptionContent(content) {
  if (!content || !content.trim()) {
    return '';
  }
  return content
    .replace(/\n+/g, '\n')
    .split('\n')
    .map(line => `<p>${line}</p>`)
    .join('');
}

module.exports = {
  formatOptionContent
};
