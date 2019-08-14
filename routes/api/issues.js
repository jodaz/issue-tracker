const router = require('express').Router();
const { add, edit } = require('../../controllers/issues');

router.post('/:project', add);
router.put('/:project', edit)

module.exports = router;
