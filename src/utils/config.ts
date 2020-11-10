import * as dotenv from "dotenv";

dotenv.config();
dotenv.config({ path: '../../' });

export const API_SERVER = process.env.API_SERVER;