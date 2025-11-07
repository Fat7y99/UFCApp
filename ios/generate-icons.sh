#!/bin/bash

# Script to generate all required app icons from a source image
# Usage: ./generate-icons.sh [source-image-path]

SOURCE_IMAGE="${1:-ios/UFCApp/Images.xcassets/BootSplashLogo.imageset/bootsplash_logo@3x.png}"
ICON_DIR="ios/UFCApp/Images.xcassets/AppIcon.appiconset"

# Check if source image exists
if [ ! -f "$SOURCE_IMAGE" ]; then
    echo "Error: Source image not found at $SOURCE_IMAGE"
    echo "Please provide a path to a source image (preferably 1024x1024 or larger)"
    exit 1
fi

# Create icon directory if it doesn't exist
mkdir -p "$ICON_DIR"

echo "Generating app icons from: $SOURCE_IMAGE"
echo "Output directory: $ICON_DIR"
echo ""

# Function to generate icon (without alpha channel)
generate_icon() {
    local filename=$1
    local size=$2
    local output="$ICON_DIR/$filename"
    local temp_output="${output}.tmp"

    echo "Generating $filename ($size x $size)..."
    # First resize the image
    sips -z $size $size "$SOURCE_IMAGE" --out "$temp_output" > /dev/null 2>&1

    if [ $? -eq 0 ]; then
        # Remove alpha channel by compositing on white background
        # This ensures the icon is fully opaque as required by Apple
        sips -s format png -s formatOptions normal "$temp_output" --out "$output" > /dev/null 2>&1

        # If the above doesn't remove alpha, use a different approach
        # Create a white background and composite the image on it
        if sips -g hasAlpha "$output" 2>/dev/null | grep -q "hasAlpha: yes"; then
            # Use sips to remove alpha by converting to JPEG then back to PNG (forces opaque)
            sips -s format jpeg -s formatOptions 100 "$temp_output" --out "${output}.jpg" > /dev/null 2>&1
            sips -s format png "${output}.jpg" --out "$output" > /dev/null 2>&1
            rm -f "${output}.jpg"
        fi

        rm -f "$temp_output"
        echo "✓ Created $filename (opaque)"
    else
        echo "✗ Failed to create $filename"
        rm -f "$temp_output"
    fi
}

# iPhone Icons
generate_icon "Icon-App-20x20@2x.png" 40    # 20x20@2x = 40x40
generate_icon "Icon-App-20x20@3x.png" 60    # 20x20@3x = 60x60
generate_icon "Icon-App-29x29@2x.png" 58    # 29x29@2x = 58x58
generate_icon "Icon-App-29x29@3x.png" 87    # 29x29@3x = 87x87
generate_icon "Icon-App-40x40@2x.png" 80    # 40x40@2x = 80x80
generate_icon "Icon-App-40x40@3x.png" 120  # 40x40@3x = 120x120
generate_icon "Icon-App-60x60@2x.png" 120   # 60x60@2x = 120x120 (REQUIRED)
generate_icon "Icon-App-60x60@3x.png" 180   # 60x60@3x = 180x180

# iPad Icons
generate_icon "Icon-App-20x20@1x.png" 20    # 20x20@1x = 20x20
generate_icon "Icon-App-20x20@2x.png" 40   # 20x20@2x = 40x40 (reuse iPhone)
generate_icon "Icon-App-29x29@1x.png" 29   # 29x29@1x = 29x29
generate_icon "Icon-App-29x29@2x.png" 58   # 29x29@2x = 58x58 (reuse iPhone)
generate_icon "Icon-App-40x40@1x.png" 40   # 40x40@1x = 40x40
generate_icon "Icon-App-40x40@2x.png" 80   # 40x40@2x = 80x80 (reuse iPhone)
generate_icon "Icon-App-76x76@1x.png" 76   # 76x76@1x = 76x76
generate_icon "Icon-App-76x76@2x.png" 152  # 76x76@2x = 152x152 (REQUIRED)
generate_icon "Icon-App-83.5x83.5@2x.png" 167  # 83.5x83.5@2x = 167x167

# App Store Icon
generate_icon "Icon-App-1024x1024@1x.png" 1024  # 1024x1024 (REQUIRED)

echo ""
echo "✓ All icons generated successfully!"
echo ""
echo "Note: If you have a better quality source image (1024x1024 or larger),"
echo "you can regenerate these icons by running:"
echo "  ./ios/generate-icons.sh /path/to/your/icon.png"

