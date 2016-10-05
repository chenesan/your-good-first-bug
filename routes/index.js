var express = require('express');
var router = express.Router();
var apiRouter = express.Router();
var v1Router = express.Router();
import { queryIssues } from '../query';


v1Router.route('/bugs')
.get((req, res) => {
  const queryPromise = queryIssues(req.query);
  queryPromise.then(
    (result) => {
      res.json(result);
    },
    (error) => {
      console.error(error);
      res.sendStatus(404);
    }
  );
});

apiRouter.use('/v1', v1Router);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.use('/api', apiRouter);

module.exports = router;
