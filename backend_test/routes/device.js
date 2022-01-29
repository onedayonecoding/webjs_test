const express = require('express');
const { isLoggedIn } = require('../lib/middleware');

const router = express.Router();
const logger = require('../lib/logger');
const deviceService = require('../service/deviceService');

// 등록
router.post('/', isLoggedIn, async (req, res) => {
  try {
    const params = {
      name: req.body.name,
      device_model_name: req.body.device_model_name,
      manufacturer: req.body.manufacturer,
      location: req.body.location,
      edge_serial_number: req.body.edge_serial_number,
      network_interface: req.body.network_interface,
      network_config: req.body.network_config,
      description: req.body.description,
    };
    logger.info(`(device.reg.params) ${JSON.stringify(params)}`);

    // 입력값 null 체크
    if (!params.name) {
      const err = new Error('Not allowed null (name)');
      logger.error(err.toString());

      res.status(500).json({ err: err.toString() });
    }

    // 비즈니스 로직 호출
    const result = await deviceService.reg(params);
    // 원하는 정보 log파일에 저장
    logger.info(`(user.reg.result) ${JSON.stringify(result)}`);

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
    logger.info(`(device.list.params) ${JSON.stringify(params)}`);

    const result = await deviceService.list(params);
    logger.info(`(device.list.result) ${JSON.stringify(result)}`);

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
    logger.info(`(device.info.params) ${JSON.stringify(params)}`);

    const result = await deviceService.info(params);
    logger.info(`(device.info.params) ${JSON.stringify(result)}`);

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
      device_model_name: req.body.device_model_name,
      manufacturer: req.body.manufacturer,
      location: req.body.location,
      edge_serial_number: req.body.edge_serial_number,
      network_interface: req.body.network_interface,
      network_config: req.body.network_config,
      description: req.body.description,
    };
    logger.info(`(device.update.params) ${JSON.stringify(params)}`);

    const result = await deviceService.edit(params);
    logger.info(`(device.update.params) ${JSON.stringify(result)}`);

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
    logger.info(`(device.delete.params) ${JSON.stringify(params)}`);

    const result = await deviceService.delete(params);
    logger.info(`(device.delete.params) ${JSON.stringify(result)}`);

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
});

module.exports = router;
