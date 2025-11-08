#!/usr/bin/env node

/**
 * Script to verify bootsplash images are in place
 */

const fs = require('fs');
const path = require('path');

const IOS_BOOTSPLASH_DIR = path.join(__dirname, '../ios/UFCApp/Images.xcassets/BootSplashLogo.imageset');
const ANDROID_RES_DIR = path.join(__dirname, '../android/app/src/main/res');

const IOS_FILES = [
  'bootsplash_logo.png',
  'bootsplash_logo@2x.png',
  'bootsplash_logo@3x.png',
];

const ANDROID_FOLDERS = [
  'drawable-mdpi',
  'drawable-hdpi',
  'drawable-xhdpi',
  'drawable-xxhdpi',
  'drawable-xxxhdpi',
];

console.log('Verifying bootsplash images...\n');

let allGood = true;

// Check iOS files
console.log('iOS bootsplash images:');
IOS_FILES.forEach(file => {
  const filePath = path.join(IOS_BOOTSPLASH_DIR, file);
  if (fs.existsSync(filePath)) {
    const stats = fs.statSync(filePath);
    console.log(`  ✓ ${file} (${(stats.size / 1024).toFixed(1)}KB)`);
  } else {
    console.log(`  ✗ ${file} - MISSING`);
    allGood = false;
  }
});

// Check Android files
console.log('\nAndroid bootsplash images:');
ANDROID_FOLDERS.forEach(folder => {
  const filePath = path.join(ANDROID_RES_DIR, folder, 'bootsplash_logo.png');
  if (fs.existsSync(filePath)) {
    const stats = fs.statSync(filePath);
    console.log(`  ✓ ${folder}/bootsplash_logo.png (${(stats.size / 1024).toFixed(1)}KB)`);
  } else {
    console.log(`  ✗ ${folder}/bootsplash_logo.png - MISSING`);
    allGood = false;
  }
});

if (allGood) {
  console.log('\n✓ All bootsplash images are in place!');
  console.log('\n⚠️  IMPORTANT: You need to rebuild the app for changes to take effect:');
  console.log('   - iOS: Clean build folder and rebuild (or run: yarn ios-clean && yarn ios:dev)');
  console.log('   - Android: Clean and rebuild (or run: yarn android-clean && yarn android:dev)');
  console.log('\n   The native bootsplash is embedded in the app binary, so a rebuild is required.');
} else {
  console.log('\n✗ Some bootsplash images are missing. Run: yarn generate-bootsplash');
  process.exit(1);
}

