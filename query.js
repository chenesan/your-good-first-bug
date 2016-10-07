const models = require('./models');

function buildCreatedAtQuery(qs) {
  if (!qs) {
    return undefined;
  } else {
    const operator = qs[0];
    const dateString = qs.slice(1);
    let date;
    try {
      date = new Date(dateString);
    }
    catch (err) {
      console.error('Fail to parse date. Not to create createdAt query.');
      return undefined;
    }
    if (operator === '>') {
      return {
        $gt: date,
      };
    } else if (operator === '<') {
      return {
        $lt: date,
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
    createdAt: (q, createdAt) => {
      const newQuery = Object.assign({}, q);
      newQuery.where.createdAt = buildCreatedAtQuery(createdAt);
      return newQuery;
    },
  };
  const query = {
    include: [
      {
        model: models.Project,
        attributes: ['name', 'url'],
        include: [
          {
            model: models.Language,
            attributes: ['name'],
          },
        ],
      },
    ],
    where: {},
  };
  return Object.keys(queryBuilders).reduce((newQuery, option) => {
    if (rawQuery[option] !== undefined) {
      return queryBuilders[option](query, rawQuery[option]);
    } else {
      return query;
    }
  }, query);
}

function queryIssues(rawQuery, page = 1, limit = 100) {
  const query = buildQuery(rawQuery);
  const paginatedQuery = buildPaginatedQuery(query, page, limit);
  console.log(paginatedQuery.include[0]);
  return models.Issue.findAll(paginatedQuery)
  .then(
    (issues) => {
      return issues;
    },
    (err) => {
      console.error(err);
    }
  );
}


module.exports = {
  queryIssues,
};
