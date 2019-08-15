const router = require('express').Router();
const { add, update } = require('../../controllers/issues');

router.post('/:project', add);
router.put('/:project', update)

module.exports = router;
