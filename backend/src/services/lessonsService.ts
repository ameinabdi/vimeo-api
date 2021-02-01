import LessonsRepository from '../database/repositories/lessonsRepository';
import Error400 from '../errors/Error400';
import SequelizeRepository from '../database/repositories/sequelizeRepository';
import { IServiceOptions } from './IServiceOptions';
const fs = require('fs')
let Vimeo = require('vimeo').Vimeo;
let client = new Vimeo("fdf0ae64143e5b1b3abb5f487a92fba1b4c771c0", "DmvwS7Rnp8JZnmH5MoJpSIs/5WzZ/IivB1K2tFepVQV1XIwehnsaMbtc3AifHo1LTGbbjIsJOp+enWvOapOEyTcn9DnSjzxQuOneR+05vOZZhFAyJYfHcoygEmtn9cYo", "094f5b155a9791f33f307df4c4a8b6ab");
/**
 * Handles Lessons operations
 */
export default class LessonsService {
  options: IServiceOptions;

  constructor(options) {
    this.options = options;
  }

  /**
   * Creates a Lessons.
   *
   * @param {*} data
   */
  async create(data) {
    const transaction = await SequelizeRepository.createTransaction(
      this.options.database,
    );

    const dir = '/Volumes/Transcend/R05\ Tarbiyo/TARBIYO\ 1AAD\ EXPORTED\ VIDEOS/CUTUBKA\ 1AAD'
    const files = fs.readdirSync(dir)
    const video = '/Users/ameinabdi/Pictures/videoplayback.mp4'
    client.upload(
      video,
      {
        'name': 'Untitled',
        'description': 'The description goes here.'
      },
      function (uri) {
        console.log('Your video URI is: ' + uri);
      },
      function (bytes_uploaded, bytes_total) {
        var percentage = (bytes_uploaded / bytes_total * 100).toFixed(2)
        console.log(bytes_uploaded, bytes_total, percentage + '%')
      },
      function (error) {
        console.log('Failed because: ' + error)
      }
    )
     console.log('videossssssss',data)
    
  }
  

  /**
   * Updates a Lessons.
   *
   * @param {*} id
   * @param {*} data
   */
  async update(id, data) {
    const transaction = await SequelizeRepository.createTransaction(
      this.options.database,
    );

    try {
      const record = await LessonsRepository.update(
        id,
        data,
        {
          ...this.options,
          transaction,
        },
      );

      await SequelizeRepository.commitTransaction(
        transaction,
      );

      return record;
    } catch (error) {
      await SequelizeRepository.rollbackTransaction(
        transaction,
      );

      SequelizeRepository.handleUniqueFieldError(
        error,
        this.options.language,
        'lessons',
      );

      throw error;
    }
  }

  /**
   * Destroy all Lessonss with those ids.
   *
   * @param {*} ids
   */
  async destroyAll(ids) {
    const transaction = await SequelizeRepository.createTransaction(
      this.options.database,
    );

    try {
      for (const id of ids) {
        await LessonsRepository.destroy(id, {
          ...this.options,
          transaction,
        });
      }

      await SequelizeRepository.commitTransaction(
        transaction,
      );
    } catch (error) {
      await SequelizeRepository.rollbackTransaction(
        transaction,
      );
      throw error;
    }
  }

  /**
   * Finds the Lessons by Id.
   *
   * @param {*} id
   */
  async findById(id) {
    return LessonsRepository.findById(id, this.options);
  }

  /**
   * Finds Lessonss for Autocomplete.
   *
   * @param {*} search
   * @param {*} limit
   */
  async findAllAutocomplete(search, limit) {
    return LessonsRepository.findAllAutocomplete(
      search,
      limit,
      this.options,
    );
  }

  /**
   * Finds Lessonss based on the query.
   *
   * @param {*} args
   */
  async findAndCountAll(args) {
    return LessonsRepository.findAndCountAll(
      args,
      this.options,
    );
  }

  /**
   * Imports a list of Lessonss.
   *
   * @param {*} data
   * @param {*} importHash
   */
  async import(data, importHash) {
    if (!importHash) {
      throw new Error400(
        this.options.language,
        'importer.errors.importHashRequired',
      );
    }

    if (await this._isImportHashExistent(importHash)) {
      throw new Error400(
        this.options.language,
        'importer.errors.importHashExistent',
      );
    }

    const dataToCreate = {
      ...data,
      importHash,
    };

    return this.create(dataToCreate);
  }

  /**
   * Checks if the import hash already exists.
   * Every item imported has a unique hash.
   *
   * @param {*} importHash
   */
  async _isImportHashExistent(importHash) {
    const count = await LessonsRepository.count(
      {
        importHash,
      },
      this.options,
    );

    return count > 0;
  }
}
