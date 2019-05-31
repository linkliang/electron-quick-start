exports.default = async function(configuration) {
  // do not include passwords or other sensitive data in the file
  // rather create environment variables with sensitive data
  var package = require("./package.json")

  require("child_process").execSync(
    `codesign -s  --display --verbose=4 "QuantConnect" "${configuration.path}" --force`,
    {
      stdio: "inherit"
    }
  );
};