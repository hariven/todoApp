export default {
    type: 'postgres',
    host: 'localhost',
    port: 7432, // Update if you're using a different port
    username: 'postgres',
    password: 'postgres',
    database: 'habits_tracker',
    synchronize: true, // Set to true only in dev
    logging: false,
    entities: ['src/entity/**/*.ts'], // Path to your entities
};
