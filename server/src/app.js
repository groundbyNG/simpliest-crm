import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import app from './routes';

const db = mongoose.connection;

// подключение
mongoose.connect("mongodb://localhost:27017/cmsdb", { useNewUrlParser: true });
db.on('error', () => {
  console.log('FAILED to connect to mongoose')
});
db.once('open', () => {
  console.log('Connected to mongoose')
});


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.listen({port: 8787}, () => {
  console.log('Server ready');
});