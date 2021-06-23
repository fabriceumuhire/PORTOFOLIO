import { config } from 'dotenv';
import mongoose from 'mongoose';

config();

/**
 * Connect to the database
 */

const server = async () => {
  const { MONGO_URL, MONGO_URI_TEST, NODE_ENV } = process.env;
  const conn = await mongoose.connect(
    NODE_ENV === 'test' ? MONGO_URI_TEST : MONGO_URL,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: true,
      useCreateIndex: true,
    },
  );
  console.log(
    `DB Connected: ${conn.connection.host} in ${NODE_ENV} mode`,
  );
};

export default server;
