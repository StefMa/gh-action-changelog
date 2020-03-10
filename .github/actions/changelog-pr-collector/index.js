const core = require('@actions/core')
const github = require('@actions/github')

try {
  const path = core.getInput('path')
  const content = core.getInput('content')
  console.log(`Patth: ${path}`)
  console.log(`Patth: ${content}`)
} catch (error) {
  core.setFailed(error.message);
}
