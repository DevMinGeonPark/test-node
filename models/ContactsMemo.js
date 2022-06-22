module.exports = (sequelize, DataTypes) => {
  const ContactsMemo = sequelize.define(
    "ContactsMemo",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      content: { type: DataTypes.TEXT, comment: "메모" }
    },
    {
      tableName: "ContactsMemo"
    }
  );

  return ContactsMemo;
};
