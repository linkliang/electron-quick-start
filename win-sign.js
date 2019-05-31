exports.default = async function(configuration) {
  // do not include passwords or other sensitive data in the file
  // rather create environment variables with sensitive data
  var package = require("./package.json")

  require("child_process").execSync(
    `echo signing && codesign -s "QuantConnect" "${configuration.path}" --force`,
    {
      stdio: "inherit"
    }
  );
};