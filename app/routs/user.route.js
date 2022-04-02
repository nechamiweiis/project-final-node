const router = require('express').Router();
const user = require('../controllers/user.controller');

router.get('/', user.getAllusers);
router.get('/:id', user.getUserById);
router.get('/getByEmailPassword', user.getUserByPasswordAndMail);
router.post('/', user.addOneUser);
router.put('/:id', user.updateUser);
router.delete('/:id', user.deleteUserById);

module.exports = router;