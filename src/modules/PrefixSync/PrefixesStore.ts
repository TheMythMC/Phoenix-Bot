import fs from 'fs';
import Prefix from './Prefix';

let files = fs.readdirSync(__dirname + '/Prefixes');

let filteredFiles = files.filter((e) => e.endsWith('.js')); // breh forgot it scans directories in .tsbuild

const PrefixesStore: {
  [key: string]: Prefix<any>;
} = {};

filteredFiles.forEach((file) => {
  let f = require(`./Prefixes/${file}`);

  if (!(f.prototype instanceof Prefix)) return;

  let prefixMeth;
  try {
    prefixMeth = new f();
  } catch (err) {
    console.log(err);

    return;
  }
  PrefixesStore[prefixMeth.id] = prefixMeth;
});

export default PrefixesStore;
