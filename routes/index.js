var express = require('express');
var url = require('url');
var router = express.Router();
var apiRouter = express.Router();
var v1Router = express.Router();
import co from 'co';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { queryIssues, queryDistinctLanguages } from '../query';
import AppContainer from '../src/containers/app-container';
import { updateSelectorOptions } from '../src/actions';
import reducers from '../src/reducers';

const ISSUES_QUERY_OPTIONS = {
  language: Symbol('language'),
  page: Symbol('page'),
  createdAt: Symbol('createdAt'),
  projectSize: Symbol('projectSize'),
  sortBy: Symbol('createdAt'),
  order: Symbol('order'),
};

const TITLE = 'Your Good First Bug';

function buildHref(req) {
  return `${req.protocol}://${req.headers.host}${req.originalUrl}`;
}

function buildLinkUrl(urlObject, query, page) {
  return url.format(Object.assign({}, urlObject, {
    query: Object.assign({}, query, { page }),
  }));
}

function buildLinkHeaders(queryResult, baseHref, query) {
  console.log(queryResult, baseHref, query);
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
      console.log(linkHeaders);
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

var buildOptionsOfSelectors = co.wrap(function*() {
  const languageDistinctPromise = queryDistinctLanguages();
  return [
    {
      category: 'filter',
      selectorPropName: 'language',
      selectorName: 'Language',
      options: [{ value: 'all' }, ...(yield languageDistinctPromise)],
    },
    {
      category: 'filter',
      selectorPropName: 'projectSize',
      selectorName: 'Project Size',
      options: [
        { value: 'all' },
        { value: JSON.stringify([{ operator: '>=', value: 3000 }]), description: 'large' },
        { value: JSON.stringify([
          { operator: '<', value: 3000 },
          { operator: '>=', value: 1000 },
        ]),
          description: 'medium',
        },
        { value: JSON.stringify([{ operator: '<', value: 1000 }]), description: 'small' },
      ],
    },
    {
      category: 'sorter',
      selectorPropName: 'sortBy',
      selectorName: 'Sort By',
      options: [
        { value: 'createdAt', description: 'Created Time' },
        { value: 'popularity', description: 'Popularity' },
        { value: 'projectSize', description: 'Project Size' },
      ],
    },
    {
      category: 'sorter',
      selectorPropName: 'order',
      selectorName: 'Order',
      options: [
        { value: 'descendant' },
        { value: 'ascendant' },
      ],
    },
  ];
});

router.get('/', function(req, res, next) {
  const store = createStore(reducers);
  const title = TITLE;
  buildOptionsOfSelectors().then(
    (selectorOptions) => {
      store.dispatch(updateSelectorOptions(selectorOptions));
      const stateString = JSON.stringify(store.getState());
      const html = renderToString(
        <Provider store={store}>
          <AppContainer />
        </Provider>
      );
      res.render('index', { html, preloadedState: stateString, title });
    }
  );
});

router.use('/api', apiRouter);

module.exports = router;
