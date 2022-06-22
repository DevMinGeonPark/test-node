const models = require("../../models");

exports.get_contacts = async (req, res) => {
  const paginate = require("express-paginate");
  try {
    const [contacts, totalCount] = await Promise.all([
      models.Contacts.findAll({
        limit: req.query.limit,
        offset: req.offset,
        order: [["createdAt", "desc"]]
      }),

      models.Contacts.count()
    ]);

    const pageCount = Math.ceil(totalCount / req.query.limit);

    res.json({
      contacts
    });
  } catch (e) {
    console.log(e);
  }
};
exports.get_search = async (req, res) => {
  try {
    const contacts = await models.Contacts.findAll({
      include: ["Tag"],

      where: {
        ...("name" in req.query && req.query.name
          ? {
              [models.Sequelize.Op.or]: [
                models.Sequelize.where(models.Sequelize.col("Tag.name"), {
                  [models.Sequelize.Op.like]: `%${req.query.name}%`
                }),
                {
                  name: {
                    [models.Sequelize.Op.like]: `%${req.query.name}%`
                  }
                }
              ]
            }
          : "")
      }
    });

    res.json({ contacts });
  } catch (e) {
    console.log(e);
  }
};

exports.post_contacts_user = async (req, res) => {
  try {
    res.json({
      message: "success"
    });
  } catch (e) {
    console.log(e);
    res.json({
      message: "fail"
    });
  }
};

exports.delete_contacts_user = async (req, res) => {
  try {
    res.json({
      message: "success"
    });
  } catch (e) {
    console.log(e);
    res.json({
      message: "fail"
    });
  }
};

exports.post_contacts_tag = async (req, res) => {
  try {
    const contacts = await models.Contacts.findByPk(req.body.contact_id);
    const tag = await models.Tag.findOrCreate({
      where: {
        name: req.body.name
      }
    });
    const status = await contacts.addTag(tag[0]);

    res.json({
      status: status
    });
  } catch (e) {
    console.log(e);
    res.json({
      message: "fail"
    });
  }
};

exports.delete_contacts_tag = async (req, res) => {
  try {
    const contacts = await models.Contacts.findByPk(req.params.contact_id);
    const tag = await models.Tag.findByPk(req.params.tag_id);

    const result = await contacts.removeTag(tag);

    res.json({
      result: result
    });
  } catch (e) {
    console.log(e);
    res.json({
      message: "fail"
    });
  }
};
