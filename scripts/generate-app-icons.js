#!/usr/bin/env node

/**
 * Script to generate app icons from app_icon.svg for both iOS and Android
 * Usage: node scripts/generate-app-icons.js
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const SVG_PATH = path.join(__dirname, '../modules/assets/src/images/app_icon.svg');
const TEMP_PNG = path.join(__dirname, '../temp_app_icon_1024.png');
const IOS_ICON_DIR = path.join(__dirname, '../ios/UFCApp/Images.xcassets/AppIcon.appiconset');
const ANDROID_RES_DIR = path.join(__dirname, '../android/app/src/main/res');

// Android icon sizes (in dp, need to multiply by density)
const ANDROID_SIZES = {
  'mipmap-mdpi': 48,    // 1x
  'mipmap-hdpi': 72,    // 1.5x
  'mipmap-xhdpi': 96,   // 2x
  'mipmap-xxhdpi': 144, // 3x
  'mipmap-xxxhdpi': 192, // 4x
};

// iOS icon sizes
const IOS_SIZES = [
  { name: 'Icon-App-20x20@2x.png', size: 40 },
  { name: 'Icon-App-20x20@3x.png', size: 60 },
  { name: 'Icon-App-29x29@2x.png', size: 58 },
  { name: 'Icon-App-29x29@3x.png', size: 87 },
  { name: 'Icon-App-40x40@2x.png', size: 80 },
  { name: 'Icon-App-40x40@3x.png', size: 120 },
  { name: 'Icon-App-60x60@2x.png', size: 120 },
  { name: 'Icon-App-60x60@3x.png', size: 180 },
  { name: 'Icon-App-20x20@1x.png', size: 20 },
  { name: 'Icon-App-29x29@1x.png', size: 29 },
  { name: 'Icon-App-40x40@1x.png', size: 40 },
  { name: 'Icon-App-76x76@1x.png', size: 76 },
  { name: 'Icon-App-76x76@2x.png', size: 152 },
  { name: 'Icon-App-83.5x83.5@2x.png', size: 167 },
  { name: 'Icon-App-1024x1024@1x.png', size: 1024 },
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
  
  // Try using sips with a workaround (convert SVG to PDF first, then to PNG)
  if (checkCommand('sips')) {
    console.log('Attempting to use sips (may require manual SVG conversion)...');
    console.error('ERROR: sips cannot directly convert SVG files.');
    console.error('Please install one of the following:');
    console.error('  - rsvg-convert: brew install librsvg');
    console.error('  - inkscape: brew install inkscape');
    console.error('  - sharp: yarn add -D sharp');
    console.error('');
    console.error('Or manually convert app_icon.svg to a 1024x1024 PNG and place it at:');
    console.error(`  ${TEMP_PNG}`);
    console.error('Then run this script again.');
    return false;
  }
  
  return false;
}

function generateIcons() {
  if (!fs.existsSync(TEMP_PNG)) {
    console.error(`Error: Temporary PNG not found at ${TEMP_PNG}`);
    process.exit(1);
  }
  
  console.log('\nGenerating iOS icons...');
  if (!fs.existsSync(IOS_ICON_DIR)) {
    fs.mkdirSync(IOS_ICON_DIR, { recursive: true });
  }
  
  IOS_SIZES.forEach(({ name, size }) => {
    const output = path.join(IOS_ICON_DIR, name);
    console.log(`Generating ${name} (${size}x${size})...`);
    try {
      execSync(`sips -z ${size} ${size} "${TEMP_PNG}" --out "${output}"`, { stdio: 'ignore' });
      // Remove alpha channel if present (required by Apple)
      execSync(`sips -s format png -s formatOptions normal "${output}" --out "${output}"`, { stdio: 'ignore' });
      console.log(`✓ Created ${name}`);
    } catch (err) {
      console.error(`✗ Failed to create ${name}:`, err.message);
    }
  });
  
  console.log('\nGenerating Android icons...');
  
  // Generate regular launcher icons
  Object.entries(ANDROID_SIZES).forEach(([folder, size]) => {
    const dir = path.join(ANDROID_RES_DIR, folder);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    const output = path.join(dir, 'ic_launcher.png');
    console.log(`Generating ${folder}/ic_launcher.png (${size}x${size})...`);
    try {
      execSync(`sips -z ${size} ${size} "${TEMP_PNG}" --out "${output}"`, { stdio: 'ignore' });
      console.log(`✓ Created ${output}`);
    } catch (err) {
      console.error(`✗ Failed to create ${output}:`, err.message);
    }
    
    // Generate round launcher icons (same size)
    const roundOutput = path.join(dir, 'ic_launcher_round.png');
    console.log(`Generating ${folder}/ic_launcher_round.png (${size}x${size})...`);
    try {
      execSync(`sips -z ${size} ${size} "${TEMP_PNG}" --out "${roundOutput}"`, { stdio: 'ignore' });
      console.log(`✓ Created ${roundOutput}`);
    } catch (err) {
      console.error(`✗ Failed to create ${roundOutput}:`, err.message);
    }
  });
  
  // Clean up temporary file
  if (fs.existsSync(TEMP_PNG)) {
    fs.unlinkSync(TEMP_PNG);
    console.log('\n✓ Cleaned up temporary files');
  }
  
  console.log('\n✓ All icons generated successfully!');
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

