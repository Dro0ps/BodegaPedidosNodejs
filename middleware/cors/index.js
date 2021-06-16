const cors = require ('cors');

const corsOption = {
    origin: 'https://musing-curie-8294f5.netlify.app/',
    optionsSuccessStatus: 200
};


module.exports = cors(corsOption);

