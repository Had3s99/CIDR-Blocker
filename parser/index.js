const Parser = require('./lib/Parsers');
const squel = require('squel');
const request = require('request');
const fs = require('fs');

new Parser.IPCat('storage/datacenters.csv').parse((err, obj) => {
  let IPCat = obj.toArray();

  let SQL = squel
    .insert()
    .into('cidr_list')
    .setFieldsRows(IPCat)
    .toString();

  let Plain = IPCat.map(block => block.cidr);

  fs.writeFileSync('storage/parsed.sql', SQL);
  fs.writeFileSync('storage/parsed.json', JSON.stringify(Plain));
});
