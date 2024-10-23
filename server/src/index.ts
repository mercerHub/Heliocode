import { dbConnect } from './db/dbConnect';
import app from './app';

dbConnect().then(() => {
    app.listen(3000, () => {
        console.log('Server is running on port 3000');
    });
})