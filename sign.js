exports.default = async function(configuration) {
  // do not include passwords or other sensitive data in the file
  // rather create environment variables with sensitive data
  var package = require('./package.json')

  require("child_process").execSync(
    `codesign -s "QuantConnect" ./release/Skylight_v${package.version}.exe`,
    {
      stdio: "inherit"
    }
  );
};