const { Router } = require("express");
const router = Router();
const ctrl = require("./admin.ctrl");

router.get("/contacts", ctrl.get_contacts);

router.get("/contacts/write", ctrl.get_contacts_write);

router.post("/contacts/write", ctrl.post_contacts_write);

router.get("/contacts/detail/:id", ctrl.get_contacts_detail);

router.get("/contacts/edit/:id", ctrl.get_contacts_edit);

router.post("/contacts/edit/:id", ctrl.post_contacts_edit);

router.get("/contacts/delete/:id", ctrl.get_contacts_delete);

// 메모 작성
router.post("/contacts/detail/:id", ctrl.add_memo);
router.get("/contacts/delete/:contact_id/:memo_id", ctrl.remove_memo);

module.exports = router;
