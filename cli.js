#!/usr/bin/env node
'use strict';
/* global require, process */


var meow = require('meow');
var JadeDocMarkdown = require('./index');
var JSONStream = require('JSONStream');

var cli = meow({
  help: [
    'Usage',
    '  $ jade-doc --input file.jade | jade-doc-markdown --output file.md',
    '  $ jade-doc-markdown --input file.json --output file.md',
    '',
    'Options',
    '  --output    Set output markdown file',
    '  --input     Set input json file',
  ]
});


var jdm = new JadeDocMarkdown({
  input: cli.flags.input, 
  output: cli.flags.output 
});

process.stdin.pipe(jdm).pipe(JSONStream.stringify()).pipe(process.stdout);

jdm.on('complete', function(){
  process.exit();
});