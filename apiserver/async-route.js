// https://strongloop.com/strongblog/async-error-handling-expressjs-es7-promises-generators/
module.exports = f => (...args) => f(...args).catch(args[2])
