const { status } = require("./status");

const hoverProvider = (params, documents) => status(params, documents);

module.exports = { hoverProvider };
