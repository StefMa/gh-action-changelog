const core = require('@actions/core')
const github = require('@actions/github')
const shell = require('shelljs')

try {
  const trigger = core.getInput('trigger')
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

  // const payloadString = JSON.stringify(github.context.payload, undefined, 2)
  // console.log(`The event payload: ${payloadString}`) Just for debugging

  var changelogString = createChangelogString()
  var dirPath = '/tmp/gh_action_changelog'
  var prNumber = github.context.payload.pull_request.number
  var filePath = `${dirPath}/${prNumber}`
  shell.mkdir('-p', dirPath)
  shell.ShellString(changelogString).to(filePath)

  core.setOutput("path", filePath)
  core.setOutput("content", changelogString)
  console.log(`Path to the changelog file: ${filePath}`)
  console.log(`The changelog string: ${changelogString}`)
}

function createChangelogString() {
  var prNumber = github.context.payload.pull_request.number
  var prUrl = github.context.payload.pull_request.html_url
  var prTitle = github.context.payload.pull_request.title
  var prAuthor = process.env.GITHUB_ACTOR
  return `* [#${prNumber}](${prUrl}): ${prTitle} - [@${prAuthor}](https://github.com/${prAuthor})`
}
