import axios from 'axios';
import * as fs from 'fs-extra';
import * as humps from 'humps';
import { schemify } from 'json-schemify';
import { compileFromFile } from 'json-schema-to-typescript';

axios.defaults.baseURL = 'https://fantasy.premierleague.com/api';

Promise.all([
  axios.get('/bootstrap-static/'),
  axios.get('/entry/3514308/'),
  axios.get('/entry/3514308/history/'),
  axios.get(`/entry/3514308/transfers/`),
  axios.get(`/entry/3514308/event/1/picks/`),
  axios.get('/element-summary/1/'),
  axios.get('/event/1/live/'),
  axios.get('leagues-classic/314/standings/'),
]).then(
  async ([
    bootstrapstatic,
    entry,
    entryHistory,
    entryTransfers,
    entryPicks,
    elementSummary,
    eventLive,
    leaguesStandings,
  ]) => {
    write('bootstrap-static', bootstrapstatic.data);
    write('entry', entry.data);
    write('entry-history', entryHistory.data);
    write('entry-transfers', entryTransfers.data);
    write('entry-picks', entryPicks.data);
    write('element-summary', elementSummary.data);
    write('event-live', eventLive.data);
    write('league-standings', leaguesStandings.data);
  },
);

async function write(name: string, data: any) {
  writeFixtures(name, data);
  writeSchemas(name, data);
  await writeInterfaces(name);
}

function writeFixtures(name: string, data: any) {
  const file = `./src/dataloader/fixtures/${name}.data.json`;
  const output = JSON.stringify(humps.camelizeKeys(data));
  fs.outputFileSync(file, output);
  console.log(`[fixtures] writing fixture for ${name}`);
}

function writeSchemas(name: string, data: any) {
  const file = `./src/dataloader/schemas/${name}.schema.json`;
  const output = schemify(humps.camelizeKeys(data));
  fs.outputFileSync(file, JSON.stringify(output));
  console.log(`[schemas] writing json schema for ${name}`);
}

async function writeInterfaces(name: string) {
  const file = `./src/dataloader/interfaces/${name}.interface.ts`;
  const output = await compileFromFile(
    `./src/dataloader/schemas/${name}.schema.json`,
  );
  fs.outputFileSync(file, output);
  console.log(`[interfaces] writing interface for ${name}`);
}
