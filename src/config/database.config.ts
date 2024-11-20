import { DataSource } from "typeorm";
import env from './environment.config';
import { appEnv } from "../utils/constant";

const isLocal = env.environment == appEnv.local;

const AppDataSource = new DataSource({
    type: "mongodb",
    url: process.env.MONGO_URI,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    logging: isLocal ? 'all' : ['error', 'warn'],
    entities: [isLocal ? 'src/api/*/model.ts' : 'build/**/*.model.js'],
    synchronize: isLocal, // Set to false in production
})

export default AppDataSource ;