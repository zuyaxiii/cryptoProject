import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const DBconnection = new Sequelize({
  host: process.env.MYSQL_HOST,
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  port: process.env.MYSQL_PORT,
  dialect: 'mysql',
  logging: false,
});

async function testConnection() {
  try {
    await DBconnection.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

testConnection();

export default DBconnection;
