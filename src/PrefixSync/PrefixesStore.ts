import fs from "fs";

let files = fs.readdirSync(`./Prefixes`);

let filteredFiles = files.filter((e) => e.endsWith(".ts"));

const PrefixesStore = {};

filteredFiles.forEach((file) => {
  let f = require(`./Prefixes/${file}`);
  // ill just assume that each f extends Prefix cuz im WAYYY too lazy...
  let prefixMeth;
  try {
    prefixMeth = new f();
  } catch (err) {
    return;
  }
  PrefixesStore[prefixMeth.id] = prefixMeth;
});

export default PrefixesStore;
