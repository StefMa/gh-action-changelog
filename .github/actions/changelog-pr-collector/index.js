const core = require('@actions/core')
const github = require('@actions/github')
const shell = require('shelljs')
const uuid = require('uuidv4')

try {
  const path = core.getInput('path')

  var pathes = path.split('\n')

  var pathesContent = getConentFromPathes(pathes)
  var pathChangelog = createChangelog(pathesContent)

  var dirPath = `/tmp/gh_action_changelog/${uuid.uuid()}`
  var filePath = `${dirPath}/changelog`
  shell.mkdir('-p', dirPath)
  shell.ShellString(pathChangelog).to(filePath)

  core.setOutput('path', filePath)
  core.setOutput('content', pathChangelog)
} catch (error) {
  core.setFailed(error.message);
}

function getConentFromPathes(pathes) {
  return pathes.map(path => {
    return shell.head(path).toString()
  })
}

function createChangelog(content) {
  return content.join('\n')
}
