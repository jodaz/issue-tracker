const router = require('express').Router();
const { add, update, del, get } = require('../../controllers/issues');

router.post('/:project', add);
router.put('/:project', update);
router.delete('/:project', del);
router.get('/:project', get);

module.exports = router;
