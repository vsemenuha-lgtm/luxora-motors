const { execSync } = require('child_process');
try {
  console.log(execSync('git status', {encoding: 'utf8'}));
} catch (e) {
  try {
    console.log(execSync('"C:/Program Files/Git/bin/git" status', {encoding: 'utf8'}));
  } catch(e2) {
    console.error("Git failed:", e2.message);
  }
}
