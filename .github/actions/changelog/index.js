const core = require('@actions/core');
const github = require('@actions/github');
const shell = require('shelljs');

try {
  const trigger = core.getInput('trigger');
  const dir = core.getInput('changelogDir');
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

  const payload = JSON.stringify(github.context.payload, undefined, 2)
  console.log(`The event payload: ${payload}`);

  shell.touch(`/tmp/${payload.number}`)
  shell.ShellString("HelloWrold").to(`/tmp/${payload.number}`)

  var str = shell.head(`/tmp/${payload.number}`)

  console.log(str)
}
