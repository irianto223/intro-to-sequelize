'use strict';
module.exports = function(sequelize, DataTypes) {
  var Student = sequelize.define('Student', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true
      }
    },
    jurusan: DataTypes.STRING
  });

  Student.associate= (models) => {
    Student.belongsToMany(models.Subject, {
      through: 'StudentSubjects'
    })
  }

  return Student;
};
