#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

console.log(process.cwd(), 'config/storybook');

spawn('start-storybook',
  ['-p', '9009', '-c', path.join(process.cwd(), 'config/storybook')],
  { stdio: 'inherit' }).on('error', process.exit);
