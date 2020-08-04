import axios from 'axios';
import * as fs from 'fs-extra';
import * as humps from 'humps';
import { compileFromFile } from 'json-schema-to-typescript';
import { schemify } from 'json-schemify';

axios.defaults.baseURL = 'https://fantasy.premierleague.com/api';

const basedir = './src/fplapi/typings';

Promise.all([
  axios.get('/bootstrap-static/'),
  axios.get('/event-status/'),
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
    eventStatus,
    entry,
    entryHistory,
    entryTransfers,
    entryPicks,
    elementSummary,
    eventLive,
    leaguesStandings,
  ]) => {
    // direct mappings
    write('bootstrap-static', bootstrapstatic.data);
    write('elements', bootstrapstatic.data.elements);
    write('event-status', eventStatus.data);
    write('entry', entry.data);
    write('entry-history', entryHistory.data);
    write('entry-transfers', entryTransfers.data);
    write('entry-picks-response', entryPicks.data);
    write('element-summary', elementSummary.data);
    write('event-live', eventLive.data);
    write('league-standings', leaguesStandings.data);

    // additional
    write('pick-stats', eventLive.data.elements[0].stats);
    write('pick-explain-stats', eventLive.data.elements[0].explain[0].stats[0]);
    write('pick', entryPicks.data.picks[0]);
  },
);

async function write(name: string, data: any) {
  writeFixtures(name, data);
  writeSchemas(name, data);
  await writeInterfaces(name);
}

function writeFixtures(name: string, data: any) {
  const file = `${basedir}/fixtures/${name}.data.json`;
  const output = JSON.stringify(humps.camelizeKeys(data));
  fs.outputFileSync(file, output);
  console.log(`[fixtures] writing fixture for ${name}`);
}

function writeSchemas(name: string, data: any) {
  const file = `${basedir}/schemas/${name}.schema.json`;
  const output = schemify(humps.camelizeKeys(data));
  fs.outputFileSync(file, JSON.stringify(output));
  console.log(`[schemas] writing json schema for ${name}`);
}

async function writeInterfaces(name: string) {
  const file = `${basedir}/interfaces/${name}.interface.ts`;
  const output = await compileFromFile(
    `${basedir}/schemas/${name}.schema.json`,
  );
  fs.outputFileSync(file, output);
  console.log(`[interfaces] writing interface for ${name}`);
}
