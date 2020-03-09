const core = require('@actions/core');
const github = require('@actions/github');

try {
  const trigger = core.getInput('trigger');
  if (trigger == "always") {
    generateChangelog()
    return
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
  console.log(process.env.GITHUB_EVENT_PATH)
  const payload = JSON.stringify(github.context.payload, undefined, 2)
  console.log(`The event payload: ${payload}`);
}
