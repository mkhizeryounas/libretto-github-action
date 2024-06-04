const core = require('@actions/core');
const github = require('@actions/github');
const { updatePrompt } = require('./lib');

(async () => {
  try {
    const accessToken = core.getInput('accessToken');
    const context = github.context;
    console.log(`Access token input: ${accessToken}`);
    console.log(`Prompt template ID input: ${accessToken}`);
    console.log(`Event: ${context.eventName}`);

    const { data: prompt } = await updatePrompt(accessToken);
    console.log(prompt);
    // Add your custom logic here
  } catch (error) {
    core.setFailed(error.message);
  }
})();