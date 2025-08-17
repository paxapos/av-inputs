/**
 * Simple test script to verify that prop mutability warnings are fixed
 */

const { execSync } = require('child_process');

try {
  // Build the project to check for prop warnings
  console.log('Building project to check for prop warnings...');
  const output = execSync('npm run build', {
    encoding: 'utf8',
    cwd: '/home/alevilar/Works/av-inputs',
    timeout: 60000
  });

  // Check if there are any mutability warnings
  const hasWarnings = output.includes('@Prop()') && output.includes('immutable but was modified');

  if (hasWarnings) {
    console.log('❌ Still has prop mutability warnings');
    console.log('Output contains warnings about immutable props being modified');
  } else {
    console.log('✅ No prop mutability warnings found in build');
  }

  console.log('Build completed successfully');

} catch (error) {
  console.log('Build failed:', error.message);
  if (error.stdout) {
    console.log('STDOUT:', error.stdout);
  }
  if (error.stderr) {
    console.log('STDERR:', error.stderr);
  }
}
