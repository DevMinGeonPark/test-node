const { Router } = require("express");
const router = Router();
const ctrl = require("./contacts.ctrl");
const paginate = require("express-paginate");

router.get("/list", paginate.middleware(2, 50), ctrl.get_contacts);
router.get("/search", ctrl.get_search);
router.post("/user", ctrl.post_contacts_user);
router.delete("/:contact_id/user/:user_id", ctrl.delete_contacts_user);
router.post("/tag", ctrl.post_contacts_tag);
router.delete("/tag/:contact_id/:tag_id", ctrl.delete_contacts_tag);

module.exports = router;
