import { DataTypes } from 'sequelize';

/**
 * Lessons database model.
 * See https://sequelize.org/v5/manual/models-definition.html to learn how to customize it.
 */
export default function (sequelize) {
  const lessons = sequelize.define(
    'lessons',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.TEXT,
      },
      embed: {
        type: DataTypes.TEXT,
      },
      chapterId: {
        type: DataTypes.INTEGER,
      },
      subjectId: {
        type: DataTypes.INTEGER,
      },
      classId: {
        type: DataTypes.INTEGER,
      },
      levelId: {
        type: DataTypes.INTEGER,
      },
      realeaseDate: {
        type: DataTypes.DATE,
      },
      position: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      visible: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      importHash: {
        type: DataTypes.STRING(255),
        allowNull: true,        
      },
    },
    {
      indexes: [
        {
          unique: true,
          fields: ['importHash', 'tenantId'],
          where: {
            deletedAt: null,
          },
        },

      ],
      timestamps: true,
      paranoid: true,
    },
  );

  lessons.associate = (models) => {


    models.lessons.hasMany(models.file, {
      as: 'videos',
      foreignKey: 'belongsToId',
      constraints: false,
      scope: {
        belongsTo: models.lessons.getTableName(),
        belongsToColumn: 'videos',
      },
    });
    
    models.lessons.belongsTo(models.tenant, {
      as: 'tenant',
    });

    models.lessons.belongsTo(models.user, {
      as: 'createdBy',
    });

    models.lessons.belongsTo(models.user, {
      as: 'updatedBy',
    });
  };

  return lessons;
}
