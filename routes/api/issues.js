const router = require('express').Router();
const { add } = require('../../controllers/issues');

router.post('/:project', add);

module.exports = router;
