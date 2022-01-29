const express = require('express');

const router = express.Router();
const logger = require('../lib/logger');
const departmentService = require('../service/departmentService');
const { isLoggedIn } = require('../lib/middleware');

// 등록
router.post('/', isLoggedIn, async (req, res) => {
  try {
    const params = {
      name: req.body.name,
      code: req.body.code,
      description: req.body.description,
    };
    logger.info(`(department.reg.params) ${JSON.stringify(params)}`);

    // 입력값 null 체크
    if (!params.name) {
      const err = new Error('Not allowed null (name)');
      logger.error(err.toString());

      res.status(500).json({ err: err.toString() });
    }

    // 비즈니스 로직 호출
    const result = await departmentService.reg(params);
    // 원하는 정보 log파일에 저장
    logger.info(`(department.reg.result) ${JSON.stringify(result)}`);

    // 최종 응답
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
});
// 검색
router.get('/', isLoggedIn, async (req, res) => {
  try {
    const params = {
      name: req.query.name,
    };
    logger.info(`(department.list.params) ${JSON.stringify(params)}`);

    const result = await departmentService.list(params);
    logger.info(`(department.list.result) ${JSON.stringify(result)}`);

    // 최종 응답
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
});

router.get('/:id', isLoggedIn, async (req, res) => {
  try {
    const params = {
      id: req.params.id,
    };
    logger.info(`(department.info.params) ${JSON.stringify(params)}`);

    const result = await departmentService.info(params);
    logger.info(`(department.info.params) ${JSON.stringify(result)}`);

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
});

router.put('/:id', isLoggedIn, async (req, res) => {
  try {
    const params = {
      id: req.params.id,
      name: req.body.name,
      code: req.body.code,
      description: req.body.description,
    };
    logger.info(`(department.update.params) ${JSON.stringify(params)}`);

    const result = await departmentService.edit(params);
    logger.info(`(department.update.params) ${JSON.stringify(result)}`);

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
});

router.delete('/:id', isLoggedIn, async (req, res) => {
  try {
    const params = {
      id: req.params.id,
    };
    logger.info(`(department.delete.params) ${JSON.stringify(params)}`);

    const result = await departmentService.delete(params);
    logger.info(`(department.delete.params) ${JSON.stringify(result)}`);

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
});

module.exports = router;
