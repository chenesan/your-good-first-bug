var express = require('express');
var url = require('url');
var router = express.Router();
var apiRouter = express.Router();
var v1Router = express.Router();
import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { queryIssues } from '../query';
import AppContainer from '../src/containers/app-container';
import reducers from '../src/reducers';

const ISSUES_QUERY_OPTIONS = {
  language: Symbol('language'),
  page: Symbol('page'),
  createdAt: Symbol('createdAt'),
  projectSize: Symbol('projectSize'),
  sortBy: Symbol('createdAt'),
  order: Symbol('order'),
};

function buildHref(req) {
  return `${req.protocol}://${req.headers.host}${req.originalUrl}`;
}

function buildLinkUrl(urlObject, query, page) {
  return url.format(Object.assign({}, urlObject, {
    query: Object.assign({}, query, { page }),
  }));
}

function buildLinkHeaders(queryResult, baseHref, query) {
  const pageTotal = queryResult.pageTotal;
  const currentPage = query.page ? Number(query.page, 10) : 1;
  const link = {};
  const urlObject = url.parse(baseHref);
  urlObject.search = undefined;
  if (currentPage !== 1) {
    link.first = buildLinkUrl(urlObject, query, 1);
    link.prev = buildLinkUrl(urlObject, query, currentPage - 1);
  }
  if (currentPage !== pageTotal) {
    link.last = buildLinkUrl(urlObject, query, pageTotal);
    link.next = buildLinkUrl(urlObject, query, currentPage + 1);
  }
  return link;
}

function cleanRawQuery(rawQuery) {
  return Object.keys(rawQuery).reduce((cleanedQuery, key) => {
    if (ISSUES_QUERY_OPTIONS[key] !== undefined) {
      return Object.assign(cleanedQuery, {
        [key]: rawQuery[key],
      });
    } else {
      return cleanedQuery;
    }
  }, {});
}

v1Router.route('/issues')
.get((req, res) => {
  const query = cleanRawQuery(req.query);
  const queryPromise = queryIssues(query, query.page || 1);
  queryPromise.then(
    (result) => {
      const baseHref = buildHref(req);
      const linkHeaders = buildLinkHeaders(result, baseHref, query);
      res.links(linkHeaders);
      res.json(result.data);
    },
    (error) => {
      console.error(error);
      res.sendStatus(404);
    }
  );
});

apiRouter.use('/v1', v1Router);
/* GET home page. */

function buildPreloadedState() {
  return {};
}

router.get('/', function(req, res, next) {
  const preloadedState = buildPreloadedState();
  const store = createStore(reducers, preloadedState);
  const html = renderToString(
    <Provider store={store}>
      <AppContainer />
    </Provider>
  );
  res.render('index', { html });
});

router.use('/api', apiRouter);

module.exports = router;
