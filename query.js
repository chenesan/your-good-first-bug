import mysql from 'mysql';

const connection = mysql.createConnection({
  host: 'localhost',
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

const BUG_TABLE = process.env.BUG_TABLE;
const LANGUAGE_TABLE = process.env.LANGUAGE_TABLE;
const PROJECT_TABLE = process.env.PROJECT_TABLE;
const BUG_LANGUAGE_TABLE = process.env.BUG_LANGUAGE_TABLE;

connection.connect();

const mapFieldToArrayField = (result, fromField, toField) => {
  const resultById = result.reduce((prevIdMap, val) => {
    const idMap = prevIdMap;
    if (idMap[val.id]) {
      idMap[toField].push(val[fromField]);
    } else {
      idMap[val.id] = val;
      idMap[val.id][toField] = [val[fromField]];
      delete idMap[val.id][fromField];
    }
    return idMap;
  }, {});
  return Object.keys(resultById).map((key) => resultById[key]);
};

export const getBugs = () => {
  const sql = `select b.*, p.name as project, l.name as language from ${BUG_LANGUAGE_TABLE} ` +
  `inner join ${BUG_TABLE} b on b.id = ${BUG_LANGUAGE_TABLE}.bug_id ` +
  `inner join ${LANGUAGE_TABLE} l on l.id = ${BUG_LANGUAGE_TABLE}.language_id ` +
  `inner join ${PROJECT_TABLE} p on b.project_id = p.id;`;
  const promise = new Promise((resolve, reject) => {
    connection.query(sql, (err, result) => {
      if (err) {
        reject(err);
      } else {
        const resultWithLangs = mapFieldToArrayField(result, 'language', 'languages');
        resolve(resultWithLangs);
      }
    });
  });
  return promise;
};

export default {
  getBugs,
};
