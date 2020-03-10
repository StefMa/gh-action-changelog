const core = require('@actions/core')
const github = require('@actions/github')
const shell = require('shelljs')
import { v4 as uuidv4 } from 'uuid';

try {
  const path = core.getInput('path')
  console.log(`Path: ${path}`)

  var pathes = path.split('\n')

  var pathesContent = getConentFromPathes(pathes)
  var pathChangelog = createChangelog(pathContent)

  var dirPath = `/tmp/gh_action_changelog/${uuidv4()}`
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
    shell.head(path)
  })
}

function createChangelog(content) {
  return content.join('\n')
}
