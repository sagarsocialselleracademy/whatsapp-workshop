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

console.log('2. Pushing source code to main branch...');
try {
  execSync('git add -A', { cwd: projectDir, env, stdio: 'inherit' });
  execSync('git commit -m "Update WhatsApp Workshop Landing Page"', { cwd: projectDir, env, stdio: 'inherit' });
} catch (e) {
  console.log('Nothing new to commit in source.');
}

try {
  execSync('git push -u origin main', { cwd: projectDir, env, stdio: 'inherit' });
  console.log('Main branch updated on GitHub.');
} catch (e) {
  console.error('Source push note:', e.message);
}

console.log('3. Publishing dist to hostinger-deploy branch...');
execSync('git init -b hostinger-deploy', { cwd: distDir, env, stdio: 'inherit' });
execSync('git config user.name "Lakshit Sethiya"', { cwd: distDir, env, stdio: 'inherit' });
execSync('git config user.email "socialselleracademy@gmail.com"', { cwd: distDir, env, stdio: 'inherit' });
try { execSync('git remote remove origin', { cwd: distDir, env, stdio: 'ignore' }); } catch {}
execSync('git remote add origin https://github.com/sagarsocialselleracademy/whatsapp-workshop.git', { cwd: distDir, env, stdio: 'inherit' });
execSync('git add -A', { cwd: distDir, env, stdio: 'inherit' });
execSync('git commit -m "Deploy: WhatsApp Workshop landing page to whatsapp.aischoolraipur.com"', { cwd: distDir, env, stdio: 'inherit' });
execSync('git push -f origin hostinger-deploy', { cwd: distDir, env, stdio: 'inherit' });

console.log('4. Configuring GitHub Pages on hostinger-deploy branch...');
try {
  execSync('gh api -X POST repos/sagarsocialselleracademy/whatsapp-workshop/pages -f "source[branch]=hostinger-deploy" -f "source[path]=/"', { cwd: projectDir, env, stdio: 'inherit' });
} catch {
  try {
    execSync('gh api -X PUT repos/sagarsocialselleracademy/whatsapp-workshop/pages -f "cname=whatsapp.aischoolraipur.com" -f "source[branch]=hostinger-deploy" -f "source[path]=/"', { cwd: projectDir, env, stdio: 'inherit' });
  } catch (e) {
    console.log('Pages configuration note:', e.message);
  }
}

console.log('\n======================================================');
console.log('  Done! whatsapp.aischoolraipur.com is deploying!');
console.log('======================================================\n');
