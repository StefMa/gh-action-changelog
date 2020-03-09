const core = require('@actions/core');
const github = require('@actions/github');

try {
  const trigger = core.getInput('trigger');
  if (trigger == "always") {
    generateChangelog()
  }
  if (trigger == "none") {
    // Do nothing
    console.log("Skipped")
    return
  }
  generateChangelog()
} catch (error) {
  core.setFailed(error.message);
}

function generateChangelog() {
  console.log("Generate changelog")
  console.log(github.event.pull_request.number)
}
