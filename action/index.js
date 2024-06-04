const core = require('@actions/core');
const github = require('@actions/github');

try {
  const accessToken = core.getInput('accessToken');
  console.log(`Access token input: ${accessToken}`);

  const context = github.context;
  console.log(`Event: ${context.eventName}`);

  // Add your custom logic here

} catch (error) {
  core.setFailed(error.message);
}