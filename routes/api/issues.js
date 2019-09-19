const router = require('express').Router();
const { add, update, del, get, getAll } = require('../../controllers/issues');

router.post('/:project', add);
router.put('/:project', update);
router.delete('/:project', del);
router.get('/:project', get);
router.get('/issues/all', getAll);

module.exports = router;
