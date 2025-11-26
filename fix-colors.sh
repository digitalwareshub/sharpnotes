#!/bin/bash

# Script to replace all purple/violet light mode colors with clean white/slate
# and add orange accents

FILE="app/page.tsx"

echo "🎨 Starting color fix for $FILE..."

# Backup the file first
cp "$FILE" "${FILE}.backup"
echo "✅ Backup created: ${FILE}.backup"

# Replace section backgrounds (remove violet backgrounds)
sed -i '' "s/bg-violet-50\/30'/bg-white'/g" "$FILE"

# Replace card borders and backgrounds
sed -i '' "s/border-violet-200\/50 bg-white\/50'/border-slate-200 bg-white'/g" "$FILE"
sed -i '' "s/border-violet-200\/50'/border-slate-200'/g" "$FILE"
sed -i '' "s/bg-white\/50'/bg-white'/g" "$FILE"

# Replace hover states on cards to orange
sed -i '' "s/hover:border-violet-500\/50/hover:border-orange-500/g" "$FILE"
sed -i '' "s/hover:border-violet-400\/50/hover:border-orange-500/g" "$FILE"

# Replace number circles to orange
sed -i '' "s/bg-violet-500\/20 border-2 border-violet-500/bg-orange-100 border-2 border-orange-500/g" "$FILE"

# Replace demo box styling
sed -i '' "s/border-violet-500\/30 bg-violet-500\/10'/border-orange-200 bg-orange-50'/g" "$FILE"
sed -i '' "s/border-violet-400\/30 bg-violet-100\/50'/border-orange-200 bg-orange-50'/g" "$FILE"

# Replace table styling
sed -i '' "s/bg-violet-100\/50'/bg-slate-100'/g" "$FILE"
sed -i '' "s/border-violet-100\/50'/border-slate-200'/g" "$FILE"
sed -i '' "s/bg-violet-50\/50'/bg-slate-50'/g" "$FILE"
sed -i '' "s/bg-violet-200\/30'/bg-orange-100'/g" "$FILE"

# Replace tag/badge colors
sed -i '' "s/bg-violet-100\/50 text-violet-600 border-violet-300\/30'/bg-slate-100 text-slate-700 border-slate-300'/g" "$FILE"
sed -i '' "s/bg-violet-500\/10 text-violet-300 border-violet-500\/30'/bg-orange-500\/10 text-orange-300 border-orange-500\/30'/g" "$FILE"

# Replace pricing section
sed -i '' "s/border-violet-500\/50 bg-gradient-to-br from-violet-500\/10 to-blue-500\/10'/border-orange-500 bg-gradient-to-br from-orange-50 to-orange-100\/50'/g" "$FILE"
sed-i '' "s/border-violet-300\/50 bg-gradient-to-br from-violet-100\/50 to-blue-100\/50'/border-orange-500 bg-gradient-to-br from-orange-50 to-orange-100\/50'/g" "$FILE"

# Replace FAQ section hovers
sed -i '' "s/hover:bg-violet-50\/50'/hover:bg-orange-50'/g" "$FILE"

# Replace footer/blog buttons
sed -i '' "s/border-violet-300 text-slate-700 hover:bg-violet-50\/50'/border-slate-300 text-slate-700 hover:bg-orange-50 hover:text-orange-600'/g" "$FILE"

# Replace link hover colors to orange
sed -i '' "s/text-violet-400 hover:text-violet-300/text-orange-400 hover:text-orange-300/g" "$FILE"
sed -i '' "s/hover:text-violet-300/hover:text-orange-400/g" "$FILE"
sed -i '' "s/hover:text-violet-600/hover:text-orange-600/g" "$FILE"

# Replace "SHRP Notes" gradient text
sed -i '' "s/text-violet-300'/text-orange-400'/g" "$FILE"
sed -i '' "s/text-violet-600'/text-orange-600'/g" "$FILE"

echo "✅ Color replacements complete!"
echo "📝 Please review the changes and test the site"
echo "💾 Original backup saved as: ${FILE}.backup"
