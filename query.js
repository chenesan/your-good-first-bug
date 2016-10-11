const models = require('./models');

function buildComparedQuery(qs, transformer = undefined) {
  if (!qs) {
    return undefined;
  } else {
    const operator = qs[0];
    const valueString = qs.slice(1);
    let value;
    try {
      value = transformer ? transformer(valueString) : valueString;
    }
    catch (err) {
      console.error('Fail to parse date. Not to create createdAt query.');
      return undefined;
    }
    if (operator === '>') {
      return {
        $gt: value,
      };
    } else if (operator === '<') {
      return {
        $lt: value,
      };
    } else {
      console.error('Fail to parse operator, Not to create createdAt query.');
      return undefined;
    }
  }
}

function buildPaginatedQuery(query, page, limit) {
  return Object.assign(query, {
    limit,
    offset: (page - 1) * limit,
  });
}

function buildQuery(rawQuery) {
  const queryBuilders = {
    language: (q, language) => {
      const newQuery = Object.assign({}, q);
      const includedLanguage = {
        model: models.Language,
        where: { name: language },
        attributes: ['name'],
      };
      let hasIncludedProject = false;
      const includeLength = newQuery.include.length;
      for (let i = 0; i < includeLength; i++) {
        const includedModel = newQuery.include[i];
        if (includedModel.model === models.Project) {
          hasIncludedProject = true;
          if (includedModel.include !== undefined) {
            for (const j in includedModel.include) {
              if (includedModel.include[j].model === models.Language) {
                includedModel.include[j] = includedLanguage;
              }
            }
          } else {
            newQuery.include[i].include = [includedLanguage];
          }
        }
      }
      if (!hasIncludedProject) {
        newQuery.include.push({
          model: models.Project,
          attributes: ['name'],
          include: [includedLanguage],
        });
      }
      return newQuery;
    },
    projectSize: (q, projectSize) => {
      const newQuery = Object.assign({}, q);
      let hasIncludedProject = false;
      const includeLength = newQuery.include.length;
      for (let i = 0; i < includeLength; i++) {
        const includedModel = newQuery.include[i];
        if (includedModel.model === models.Project) {
          hasIncludedProject = true;
          includedModel.where = includedModel.where ? includedModel.where : {};
          includedModel.where.size = buildComparedQuery(projectSize, parseInt);
        }
      }
      if (!hasIncludedProject) {
        newQuery.include.push({
          model: models.Project,
          attributes: ['name', 'url', 'description', 'size'],
          where: {
            size: buildComparedQuery(projectSize, parseInt),
          },
        });
      }
      console.log(newQuery);
      return newQuery;
    },
    createdAt: (q, createdAt) => {
      const newQuery = Object.assign({}, q);
      newQuery.where.createdAt = buildComparedQuery(createdAt, Date);
      return newQuery;
    },
    sortBy: (q, sortBy) => {
      const newQuery = Object.assign({}, q);
      const sortingDirection = q.order[0][q.order[0].length - 1];
      // project popularity, project size, createdAt
      const sortingMap = {
        createdAt: ['createdAt'],
        popularity: [models.Project, 'popularity'],
        projectSize: [models.Project, 'size'],
      };
      newQuery.order = sortingMap[sortBy] ? [[...sortingMap[sortBy], sortingDirection]] : q.order;
      return newQuery;
    },
    order: (q, order) => {
      const newQuery = Object.assign({}, q);
      const orderMap = {
        ascendant: 'ASC',
        descendant: 'DESC',
      };
      const newOrder = orderMap[order] ? orderMap[order] : 'DESC';
      newQuery.order = newQuery.order.map(
        (sortingOpt) => [...sortingOpt.slice(0, sortingOpt.length - 1), newOrder]
      );
      return newQuery;
    },
  };
  const query = {
    include: [
      {
        model: models.Project,
        attributes: ['name', 'url', 'description', 'size'],
        include: [
          {
            model: models.Language,
            attributes: ['name'],
          },
        ],
      },
    ],
    where: {},
    order: [['createdAt', 'DESC']],
  };
  return Object.keys(queryBuilders).reduce((newQuery, option) => {
    if (rawQuery[option] !== undefined) {
      return queryBuilders[option](newQuery, rawQuery[option]);
    } else {
      return newQuery;
    }
  }, query);
}

function queryIssues(rawQuery, page = 1, limit = 100) {
  console.log('Receive rawQuery: ', rawQuery);
  const query = buildQuery(rawQuery);
  const paginatedQuery = buildPaginatedQuery(query, page, limit);
  console.log('Build query: ', paginatedQuery, paginatedQuery.include[0].where);
  return models.Issue.findAndCountAll(paginatedQuery)
  .catch((err) => { throw err; })
  .then(
    (issuesAndCount) => {
      const data = issuesAndCount.rows;
      const dataTotal = issuesAndCount.count;
      const pageTotal = Math.floor(dataTotal / 100) + (dataTotal % 100 === 0 ? 0 : 1);
      if (pageTotal < page) {
        throw Error(`Page ${page} larger than total page: ${pageTotal}`);
      }
      return {
        pageTotal,
        dataTotal,
        data,
      };
    }
  );
}


module.exports = {
  queryIssues,
};
