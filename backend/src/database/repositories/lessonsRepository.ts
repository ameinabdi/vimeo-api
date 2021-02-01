import SequelizeRepository from '../../database/repositories/sequelizeRepository';
import AuditLogRepository from '../../database/repositories/auditLogRepository';
import lodash from 'lodash';
import SequelizeFilterUtils from '../../database/utils/sequelizeFilterUtils';
import Error404 from '../../errors/Error404';
import Sequelize from 'sequelize';
import FileRepository from './fileRepository';
import { IRepositoryOptions } from './IRepositoryOptions';
import { stringify } from 'cli-highlight';
const axios = require('axios');
let Vimeo = require('vimeo').Vimeo;
let client = new Vimeo("fdf0ae64143e5b1b3abb5f487a92fba1b4c771c0", "DmvwS7Rnp8JZnmH5MoJpSIs/5WzZ/IivB1K2tFepVQV1XIwehnsaMbtc3AifHo1LTGbbjIsJOp+enWvOapOEyTcn9DnSjzxQuOneR+05vOZZhFAyJYfHcoygEmtn9cYo", "094f5b155a9791f33f307df4c4a8b6ab");

const Op = Sequelize.Op;

/**
 * Handles database operations for the Lessons.
 * See https://sequelize.org/v5/index.html to learn how to customize it.
 */
class LessonsRepository {
  /**
   * Creates the Lessons.
   *
   * @param {Object} data
   * @param {Object} [options]
   */
  static async create(data, options: IRepositoryOptions) {
    const currentUser = SequelizeRepository.getCurrentUser(
      options,
    );

    const tenant = SequelizeRepository.getCurrentTenant(
      options,
    );

    const transaction = SequelizeRepository.getTransaction(
      options,
    );

    const record = await options.database.lessons.create(
      {
        ...lodash.pick(data, [
          'name',
          'embed',
          'chapterId',
          'subjectId',
          'classId',
          'levelId',
          'realeaseDate',
          'position',
          'visible',          
          'importHash',
        ]),
        tenantId: tenant.id,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      {
        transaction,
      },
    );


  
    await FileRepository.replaceRelationFiles(
      {
        belongsTo: options.database.lessons.getTableName(),
        belongsToColumn: 'videos',
        belongsToId: record.id,
      },
      data.videos,
      options,
    );
  
    await this._createAuditLog(
      AuditLogRepository.CREATE,
      record,
      data,
      options,
    );

    return this.findById(record.id, options);
  }

  /**
   * Updates the Lessons.
   *
   * @param {Object} data
   * @param {Object} [options]
   */
  static async update(id, data, options: IRepositoryOptions) {
    const currentUser = SequelizeRepository.getCurrentUser(
      options,
    );

    const transaction = SequelizeRepository.getTransaction(
      options,
    );

    let record = await options.database.lessons.findByPk(
      id,
      {
        transaction,
      },
    );

    const tenant = SequelizeRepository.getCurrentTenant(
      options,
    );

    if (
      !record ||
      String(record.tenantId) !== String(tenant.id)
    ) {
      throw new Error404();
    }

    record = await record.update(
      {
        ...lodash.pick(data, [
          'name',
          'embed',
          'chapterId',
          'subjectId',
          'classId',
          'levelId',
          'realeaseDate',
          'position',
          'visible',          
          'importHash',
        ]),
        updatedById: currentUser.id,
      },
      {
        transaction,
      },
    );



    await FileRepository.replaceRelationFiles(
      {
        belongsTo: options.database.lessons.getTableName(),
        belongsToColumn: 'videos',
        belongsToId: record.id,
      },
      data.videos,
      options,
    );

    await this._createAuditLog(
      AuditLogRepository.UPDATE,
      record,
      data,
      options,
    );

    return this.findById(record.id, options);
  }

  /**
   * Deletes the Lessons.
   *
   * @param {string} id
   * @param {Object} [options]
   */
  static async destroy(id, options: IRepositoryOptions) {
    const transaction = SequelizeRepository.getTransaction(
      options,
    );

    let record = await options.database.lessons.findByPk(
      id,
      {
        transaction,
      },
    );

    const tenant = SequelizeRepository.getCurrentTenant(
      options,
    );

    if (
      !record ||
      String(record.tenantId) !== String(tenant.id)
    ) {
      throw new Error404();
    }

    await record.destroy({
      transaction,
    });

    await this._createAuditLog(
      AuditLogRepository.DELETE,
      record,
      record,
      options,
    );
  }

  /**
   * Finds the Lessons and its relations.
   *
   * @param {string} id
   * @param {Object} [options]
   */
  static async findById(id, options: IRepositoryOptions) {
    const transaction = SequelizeRepository.getTransaction(
      options,
    );

    const include = [

    ];

    const record = await options.database.lessons.findByPk(
      id,
      {
        include,
        transaction,
      },
    );

    const tenant = SequelizeRepository.getCurrentTenant(
      options,
    );

    if (
      !record ||
      String(record.tenantId) !== String(tenant.id)
    ) {
      throw new Error404();
    }

    return this._fillWithRelationsAndFiles(record, options);
  }

  /**
   * Counts the number of Lessonss based on the filter.
   *
   * @param {Object} filter
   * @param {Object} [options]
   */
  static async count(filter, options: IRepositoryOptions) {
    const transaction = SequelizeRepository.getTransaction(
      options,
    );

    const tenant = SequelizeRepository.getCurrentTenant(
      options,
    );

    return options.database.lessons.count(
      {
        where: {
          ...filter,
          tenantId: tenant.id,
        },
        transaction,
      },
    );
  }

  /**
   * Finds the Lessonss based on the query.
   * See https://sequelize.org/v5/manual/querying.html to learn how to
   * customize the query.
   *
   * @param {Object} query
   * @param {Object} query.filter
   * @param {number} query.limit
   * @param  {number} query.offset
   * @param  {string} query.orderBy
   * @param {Object} [options]
   *
   * @returns {Promise<Object>} response - Object containing the rows and the count.
   */
  static async findAndCountAll(
    { filter, limit = 0, offset = 0, orderBy = '' },
    options: IRepositoryOptions,
  ) {
    const tenant = SequelizeRepository.getCurrentTenant(
      options,
    );

    let whereAnd: Array<any> = [];
    let include = [
      
    ];

    whereAnd.push({
      tenantId: tenant.id,
    });

    if (filter) {
      if (filter.id) {
        whereAnd.push({
          ['id']: SequelizeFilterUtils.uuid(filter.id),
        });
      }

      if (filter.name) {
        whereAnd.push(
          SequelizeFilterUtils.ilike(
            'lessons',
            'name',
            filter.name,
          ),
        );
      }

      if (filter.embed) {
        whereAnd.push(
          SequelizeFilterUtils.ilike(
            'lessons',
            'embed',
            filter.embed,
          ),
        );
      }

      if (filter.chapterIdRange) {
        const [start, end] = filter.chapterIdRange;

        if (start !== undefined && start !== null && start !== '') {
          whereAnd.push({
            chapterId: {
              [Op.gte]: start,
            },
          });
        }

        if (end !== undefined && end !== null && end !== '') {
          whereAnd.push({
            chapterId: {
              [Op.lte]: end,
            },
          });
        }
      }

      if (filter.subjectIdRange) {
        const [start, end] = filter.subjectIdRange;

        if (start !== undefined && start !== null && start !== '') {
          whereAnd.push({
            subjectId: {
              [Op.gte]: start,
            },
          });
        }

        if (end !== undefined && end !== null && end !== '') {
          whereAnd.push({
            subjectId: {
              [Op.lte]: end,
            },
          });
        }
      }

      if (filter.classIdRange) {
        const [start, end] = filter.classIdRange;

        if (start !== undefined && start !== null && start !== '') {
          whereAnd.push({
            classId: {
              [Op.gte]: start,
            },
          });
        }

        if (end !== undefined && end !== null && end !== '') {
          whereAnd.push({
            classId: {
              [Op.lte]: end,
            },
          });
        }
      }

      if (filter.levelIdRange) {
        const [start, end] = filter.levelIdRange;

        if (start !== undefined && start !== null && start !== '') {
          whereAnd.push({
            levelId: {
              [Op.gte]: start,
            },
          });
        }

        if (end !== undefined && end !== null && end !== '') {
          whereAnd.push({
            levelId: {
              [Op.lte]: end,
            },
          });
        }
      }

      if (filter.realeaseDateRange) {
        const [start, end] = filter.realeaseDateRange;

        if (start !== undefined && start !== null && start !== '') {
          whereAnd.push({
            realeaseDate: {
              [Op.gte]: start,
            },
          });
        }

        if (end !== undefined && end !== null && end !== '') {
          whereAnd.push({
            realeaseDate: {
              [Op.lte]: end,
            },
          });
        }
      }

      if (
        filter.position === true ||
        filter.position === 'true' ||
        filter.position === false ||
        filter.position === 'false'
      ) {
        whereAnd.push({
          position:
            filter.position === true ||
            filter.position === 'true',
        });
      }

      if (
        filter.visible === true ||
        filter.visible === 'true' ||
        filter.visible === false ||
        filter.visible === 'false'
      ) {
        whereAnd.push({
          visible:
            filter.visible === true ||
            filter.visible === 'true',
        });
      }

      if (filter.createdAtRange) {
        const [start, end] = filter.createdAtRange;

        if (
          start !== undefined &&
          start !== null &&
          start !== ''
        ) {
          whereAnd.push({
            ['createdAt']: {
              [Op.gte]: start,
            },
          });
        }

        if (
          end !== undefined &&
          end !== null &&
          end !== ''
        ) {
          whereAnd.push({
            ['createdAt']: {
              [Op.lte]: end,
            },
          });
        }
      }
    }

    const where = { [Op.and]: whereAnd };

    let {
      rows,
      count,
    } = await options.database.lessons.findAndCountAll({
      where,
      include,
     
      offset: offset ? Number(offset) : undefined,
      order: orderBy
        ? [orderBy.split('_')]
        : [['createdAt', 'DESC']],
      transaction: SequelizeRepository.getTransaction(
        options,
      ),
    });

    rows = await this._fillWithRelationsAndFilesForRows(
      rows,
      options,
    );

    rows.forEach(row => {
      console.log(row.name);

      client.request(/*options*/{
        method: 'POST',
        path: '/users/131303122/projects',
        query:{
          name: row.name
        },
        
      }, /*callback*/function (error, body, status_code, headers) {
        if (error) {
          console.log('error');
          console.log(error);
          console.log(body);

        } else {
          console.log('body');
          console.log(body);
        }
      
        console.log('status code');
        console.log(status_code);
        console.log('headers');
        console.log(headers);
      });
     });
    
    return { rows, count };
  }

  /**
   * Lists the Lessonss to populate the autocomplete.
   * See https://sequelize.org/v5/manual/querying.html to learn how to
   * customize the query.
   *
   * @param {Object} query
   * @param {number} limit
   */
  static async findAllAutocomplete(query, limit, options: IRepositoryOptions) {
    const tenant = SequelizeRepository.getCurrentTenant(
      options,
    );

    let whereAnd: Array<any> = [{
      tenantId: tenant.id,
    }];

    if (query) {
      whereAnd.push({
        [Op.or]: [
          { ['id']: SequelizeFilterUtils.uuid(query) },
          {
            [Op.and]: SequelizeFilterUtils.ilike(
              'lessons',
              'name',
              query,
            ),
          },
        ],
      });
    }

    const where = { [Op.and]: whereAnd };

    const records = await options.database.lessons.findAll(
      {
        attributes: ['id', 'name'],
        where,
        limit: limit ? Number(limit) : undefined,
        order: [['name', 'ASC']],
      },
    );

    return records.map((record) => ({
      id: record.id,
      label: record.name,
    }));
  }

  /**
   * Creates an audit log of the operation.
   *
   * @param {string} action - The action [create, update or delete].
   * @param {object} record - The sequelize record
   * @param {object} data - The new data passed on the request
   * @param {object} options
   */
  static async _createAuditLog(
    action,
    record,
    data,
    options: IRepositoryOptions,
  ) {
    let values = {};

    if (data) {
      values = {
        ...record.get({ plain: true }),
        videos: data.videos,
      };
    }

    await AuditLogRepository.log(
      {
        entityName: 'lessons',
        entityId: record.id,
        action,
        values,
      },
      options,
    );
  }

  /**
   * Fills an array of Lessons with relations and files.
   *
   * @param {Array} rows
   * @param {Object} [options]
   */
  static async _fillWithRelationsAndFilesForRows(
    rows,
    options: IRepositoryOptions,
  ) {
    if (!rows) {
      return rows;
    }

    return Promise.all(
      rows.map((record) =>
        this._fillWithRelationsAndFiles(record, options),
      ),
    );
  }

  /**
   * Fill the Lessons with the relations and files.
   *
   * @param {Object} record
   * @param {Object} [options]
   */
  static async _fillWithRelationsAndFiles(record, options: IRepositoryOptions) {
    if (!record) {
      return record;
    }

    const output = record.get({ plain: true });

    const transaction = SequelizeRepository.getTransaction(
      options,
    );

    output.videos = await FileRepository.fillDownloadUrl(
      await record.getVideos({
        transaction,
      }),
    );

    return output;
  }
}

export default LessonsRepository;
