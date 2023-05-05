module.exports = function (config, env) {
    config.resolve.fallback = {
        "crypto": false
    };
    config.ignoreWarnings = [/Failed to parse source map/];
  
    return config
};