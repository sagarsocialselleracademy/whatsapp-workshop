const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const projectDir = __dirname;
const distDir = path.join(projectDir, 'dist');
const env = {
  ...process.env,
  PATH: `${process.env.LOCALAPPDATA}\\Programs\\gh\\bin;${process.env.LOCALAPPDATA}\\Programs\\MinGit\\cmd;${process.env.LOCALAPPDATA}\\Programs\\nodejs;${process.env.PATH}`
};

console.log('1. Building production dist...');
execSync('npm run build', { cwd: projectDir, env, stdio: 'inherit' });

// Ensure CNAME, 404.html, and .nojekyll in dist
fs.writeFileSync(path.join(distDir, 'CNAME'), 'whatsapp.aischoolraipur.com\n');
fs.copyFileSync(path.join(distDir, 'index.html'), path.join(distDir, '404.html'));
fs.writeFileSync(path.join(distDir, '.nojekyll'), '');

console.log('2. Pushing source code to GitHub main branch...');
try {
  execSync('git add -A', { cwd: projectDir, env, stdio: 'inherit' });
  execSync('git commit -m "Update WhatsApp Workshop Landing Page"', { cwd: projectDir, env, stdio: 'inherit' });
} catch (e) {
  console.log('Nothing new to commit or already committed.');
}

try {
  execSync('git push -u origin main', { cwd: projectDir, env, stdio: 'inherit' });
  console.log('Successfully pushed to GitHub! GitHub Actions is now deploying to whatsapp.aischoolraipur.com');
} catch (e) {
  console.error('Push error:', e.message);
}
