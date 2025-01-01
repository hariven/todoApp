import express, { Request, Response } from 'express';
import { Client } from 'pg';
import bodyParser from 'body-parser';

const app = express();

// Middleware to parse JSON requests
app.use(bodyParser.json());

// PostgreSQL client setup
const client = new Client({
    host: 'localhost',  // PostgreSQL container is running on localhost
    port: 7432,         // Default PostgreSQL port
    user: 'postgres',   // The user you set in the Docker command
    password: 'postgres', // The password you set in the Docker command
    database: 'habits_tracker', // The database you created
});

client.connect()
    .then(() => console.log('Connected to PostgreSQL'))
    .catch((err) => console.error('Connection error', err.stack));

// Example POST route for tasks
app.post('/api/tasks', async (req: Request, res: Response) => {
    const { title, duration, priority, completed } = req.body;
    try {
        const result = await client.query(
            'INSERT INTO tasks (title, duration, priority, completed) VALUES ($1, $2, $3, $4) RETURNING *',
            [title, duration, priority, completed]
        );
        res.json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error inserting task');
    }
});

// Start the server
app.listen(3001, () => {
    console.log('Backend server running on http://localhost:3001');
});
