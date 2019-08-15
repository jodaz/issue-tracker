const router = require('express').Router();
const { add, update, del } = require('../../controllers/issues');

router.post('/:project', add);
router.put('/:project', update);
router.delete('/:project', del);

module.exports = router;
