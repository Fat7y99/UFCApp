#!/usr/bin/env node

/**
 * Script to generate bootsplash logo images from app_icon.svg for both iOS and Android
 * Usage: node scripts/generate-bootsplash-icons.js
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const SVG_PATH = path.join(__dirname, '../modules/assets/src/images/app_icon.svg');
const TEMP_PNG = path.join(__dirname, '../temp_bootsplash_1024.png');
const IOS_BOOTSPLASH_DIR = path.join(__dirname, '../ios/UFCApp/Images.xcassets/BootSplashLogo.imageset');
const ANDROID_RES_DIR = path.join(__dirname, '../android/app/src/main/res');
const ASSETS_IMAGES_DIR = path.join(__dirname, '../modules/assets/src/images');

// Android bootsplash sizes (in dp, need to multiply by density)
const ANDROID_SIZES = {
  'drawable-mdpi': 100,    // 1x
  'drawable-hdpi': 150,    // 1.5x
  'drawable-xhdpi': 200,   // 2x
  'drawable-xxhdpi': 300,  // 3x
  'drawable-xxxhdpi': 400, // 4x
};

// iOS bootsplash sizes
const IOS_SIZES = [
  { name: 'bootsplash_logo.png', size: 100 },      // 1x
  { name: 'bootsplash_logo@2x.png', size: 200 },  // 2x
  { name: 'bootsplash_logo@3x.png', size: 300 },   // 3x
];

// Source images for modules/assets/src/images
const SOURCE_SIZES = [
  { name: 'bootsplash_logo.png', size: 100 },
  { name: 'bootsplash_logo@1,5x.png', size: 150 },
  { name: 'bootsplash_logo@2x.png', size: 200 },
  { name: 'bootsplash_logo@3x.png', size: 300 },
  { name: 'bootsplash_logo@4x.png', size: 400 },
];

function checkCommand(command) {
  try {
    execSync(`which ${command}`, { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
}

async function convertSvgToPng() {
  console.log('Converting SVG to PNG...');
  
  // Try different methods to convert SVG to PNG
  if (checkCommand('rsvg-convert')) {
    console.log('Using rsvg-convert...');
    execSync(`rsvg-convert -w 1024 -h 1024 "${SVG_PATH}" -o "${TEMP_PNG}"`, { stdio: 'inherit' });
    return true;
  }
  
  if (checkCommand('inkscape')) {
    console.log('Using inkscape...');
    execSync(`inkscape "${SVG_PATH}" --export-filename="${TEMP_PNG}" --export-width=1024 --export-height=1024`, { stdio: 'inherit' });
    return true;
  }
  
  // Try using Node.js with sharp if available
  try {
    const sharp = require('sharp');
    console.log('Using sharp...');
    await sharp(SVG_PATH)
      .resize(1024, 1024)
      .png()
      .toFile(TEMP_PNG);
    console.log('✓ SVG converted to PNG');
    return true;
  } catch (err) {
    if (err.code !== 'MODULE_NOT_FOUND') {
      console.error('Error converting SVG:', err);
      throw err;
    }
    console.error('sharp not available');
  }
  
  return false;
}

function generateIcons() {
  if (!fs.existsSync(TEMP_PNG)) {
    console.error(`Error: Temporary PNG not found at ${TEMP_PNG}`);
    process.exit(1);
  }
  
  console.log('\nGenerating iOS bootsplash logos...');
  if (!fs.existsSync(IOS_BOOTSPLASH_DIR)) {
    fs.mkdirSync(IOS_BOOTSPLASH_DIR, { recursive: true });
  }
  
  IOS_SIZES.forEach(({ name, size }) => {
    const output = path.join(IOS_BOOTSPLASH_DIR, name);
    console.log(`Generating ${name} (${size}x${size})...`);
    try {
      execSync(`sips -z ${size} ${size} "${TEMP_PNG}" --out "${output}"`, { stdio: 'ignore' });
      console.log(`✓ Created ${name}`);
    } catch (err) {
      console.error(`✗ Failed to create ${name}:`, err.message);
    }
  });
  
  console.log('\nGenerating Android bootsplash logos...');
  
  Object.entries(ANDROID_SIZES).forEach(([folder, size]) => {
    const dir = path.join(ANDROID_RES_DIR, folder);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    const output = path.join(dir, 'bootsplash_logo.png');
    console.log(`Generating ${folder}/bootsplash_logo.png (${size}x${size})...`);
    try {
      execSync(`sips -z ${size} ${size} "${TEMP_PNG}" --out "${output}"`, { stdio: 'ignore' });
      console.log(`✓ Created ${output}`);
    } catch (err) {
      console.error(`✗ Failed to create ${output}:`, err.message);
    }
  });
  
  console.log('\nGenerating source bootsplash logos...');
  
  SOURCE_SIZES.forEach(({ name, size }) => {
    const output = path.join(ASSETS_IMAGES_DIR, name);
    console.log(`Generating ${name} (${size}x${size})...`);
    try {
      execSync(`sips -z ${size} ${size} "${TEMP_PNG}" --out "${output}"`, { stdio: 'ignore' });
      console.log(`✓ Created ${output}`);
    } catch (err) {
      console.error(`✗ Failed to create ${output}:`, err.message);
    }
  });
  
  // Clean up temporary file
  if (fs.existsSync(TEMP_PNG)) {
    fs.unlinkSync(TEMP_PNG);
    console.log('\n✓ Cleaned up temporary files');
  }
  
  console.log('\n✓ All bootsplash logos generated successfully!');
}

// Main execution
async function main() {
  if (!fs.existsSync(SVG_PATH)) {
    console.error(`Error: SVG file not found at ${SVG_PATH}`);
    process.exit(1);
  }

  // Try to convert SVG to PNG
  const result = await convertSvgToPng();
  if (result === true) {
    // Conversion completed, generate icons
    generateIcons();
  } else {
    console.error('\nFailed to convert SVG to PNG. Please install a conversion tool or provide a PNG manually.');
    process.exit(1);
  }
}

main().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});

