import { Sequelize, DataTypes } from "sequelize";

export const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./db/ajam.db",
});

export const ajamwords = sequelize.define(
  "words",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      unique: true,
    },
    word: {
      type: DataTypes.TEXT,
      defaultValue: "",
    },
    pronunciation: {
      type: DataTypes.TEXT,
      defaultValue: "",
    },
  },
  { createdAt: false, updatedAt: false, timestamps: false }
);
