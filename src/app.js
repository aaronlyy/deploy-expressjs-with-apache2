const express = require('express');
const morgan = require('morgan');

const PORT = 3000;

const app = express();
app.use(morgan('tiny'));

app.get('/', (req, res) => {
    res.json(
        {
            "msg": "Hello World!"
        }
    )
})

app.all('*', (req, res) => {
    res.json(
        {
            'msg': 'Not found!'
        }
    )
})

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}...`);
})