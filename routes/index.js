const combineRouters = require('koa-combine-routers');

const subscriptionsRouter = require('./subscriptions');

const router = combineRouters(
  subscriptionsRouter,
);

module.exports = router;