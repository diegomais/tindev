import Sequelize from 'sequelize';

import databaseConfig from '../config/database';

import User from '../app/models/User';
import File from '../app/models/File';
import Appointment from '../app/models/Appointment';

const models = [User, File, Appointment];

class Database {
  constructor() {
    this.init();
  }

  init() {
    // Create a Sequelize instance to connect to the database
    // passing parameters separately from databaseConfig
    this.connection = new Sequelize(databaseConfig);

    // Initialize each model using the connection created above
    // and initialize model associations if exists
    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();
