const express = require('express')
const bodyParser = require('body-parser')
require('dotenv').config();
const userRouter = require("./routes/user")
const admin=require('./routes/admin')
const teamleader=require('./routes/teamleader')
const app = express()
require("./config/mongoConnect")
const cors = require('cors')

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/', userRouter);
app.use('/admin',admin)
app.use('/teamleader',teamleader)

app.listen(5000, () => {
  console.log('server connected');
})



// Error handling
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection:', reason);
});