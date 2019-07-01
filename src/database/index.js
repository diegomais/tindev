import Sequelize from 'sequelize';

import databaseConfig from '../config/database';

import User from '../app/models/User';
import File from '../app/models/File';

const models = [User, File];

class Database {
  constructor() {
    this.init();
  }

  init() {
    // Create a Sequelize instance to connect to the database
    // passing parameters separately from databaseConfig
    this.connection = new Sequelize(databaseConfig);

    // Initialize each model using the connection created above
    models.map(model => model.init(this.connection));
  }
}

export default new Database();
