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

  var changelogString = createChangelogString()
  var filePath = `/tmp/${github.context.payload.number}`
  shell.touch(filePath)
  shell.ShellString(changelogString).to(filePath)

  var stringInFile = shell.head(filePath)
  console.log(filePath)
  console.log(stringInFile)
}

function createChangelogString() {
  var prNumber = github.context.payload.pull_request.number
  var prUrl = github.context.payload.pull_request.html_url
  var prTitle = github.context.payload.pull_request.title
  var prAuthor = process.env.GITHUB_ACTOR
  return `* [#${prNumber}](${prUrl}): ${prTitle} - [@${prAuthor}](https://github.com/${prAuthor})`
}
