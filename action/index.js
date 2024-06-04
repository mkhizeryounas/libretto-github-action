const core = require('@actions/core');
const github = require('@actions/github');

try {
  const exampleInput = core.getInput('exampleInput');
  console.log(`Example input: ${exampleInput}`);

  const context = github.context;
  console.log(`Event: ${context.eventName}`);

  // Add your custom logic here

} catch (error) {
  core.setFailed(error.message);
}