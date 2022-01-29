const express = require('express');
const logger = require('../lib/logger');
const departmentRouter = require('./department');
const userRouter = require('./user');
const deviceRouter = require('./device');
const authRouter = require('./auth');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

router.use('/departments', departmentRouter);
router.use('/users', userRouter);
router.use('/devices', deviceRouter);
router.use('/auths', authRouter);

router.get('/log-test', (req, res, next) => {
  logger.error('this message is error');
  logger.warn('this message is warn');
  logger.info('this message is info');
  logger.verbose('this message is verbose');
  logger.debug('this message is debug');
  logger.silly('this message is silly');

  res.send('log test');
});

module.exports = router;
