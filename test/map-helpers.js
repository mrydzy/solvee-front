const assert = require('assert');
const mapHelpers = require('../src/utils/map-helpers');

const oneParagraph = 'Some text';
const twoParagraphs = 'Some text\nanother line';
const multipleNewLines = 'Some text\n\n\nsecond line\n\nthird';

const oneParagraphOutput = mapHelpers.formatOptionContent(oneParagraph);
const oneParagraphOutputExpected = '<p>Some text</p>';
assert.equal(oneParagraphOutput, oneParagraphOutputExpected);

const twoParagraphsOutput = mapHelpers.formatOptionContent(twoParagraphs);
const twoParagraphsOutputExpected = '<p>Some text</p><p>another line</p>';
assert.equal(twoParagraphsOutput, twoParagraphsOutputExpected);

const multipleNewLinesOutput = mapHelpers.formatOptionContent(multipleNewLines);
const multipleNewLinesOutputExpected = '<p>Some text</p><p>second line</p><p>third</p>';
assert.equal(multipleNewLinesOutput, multipleNewLinesOutputExpected);
