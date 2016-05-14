"use strict";

function displayOptionContent(item) {
  if (item.image) {
    return `<img src=${item.image}>`;
  }
  return formatOptionContent(item.text);
}

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
  formatOptionContent,
  displayOptionContent
};
