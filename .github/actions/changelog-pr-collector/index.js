const core = require('@actions/core')
const github = require('@actions/github')

try {
  const trigger = core.getInput('path')
  const trigger = core.getInput('content')
  // TODO: Add logic to either read the path file content or content content
} catch (error) {
  core.setFailed(error.message);
}
