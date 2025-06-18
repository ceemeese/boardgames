const yaml = require('js-yaml');
const fs = require('fs');
const yargs = require('yargs');
const { hideBin } = require('yargs/helpers');


let configFile = 'config.prod.yaml';
if(process.env.NODE_ENV === 'local') {
    configFile = 'config.local.yaml';
}

console.log(configFile);

const argv = yargs(hideBin(process.argv)).argv;

if (argv.config != undefined) {
    configFile = argv.config;
}

console.log(`Cargando configuración desde: ${configFile}`);
const config = yaml.load(fs.readFileSync(configFile, 'utf-8'));



module.exports = config;


