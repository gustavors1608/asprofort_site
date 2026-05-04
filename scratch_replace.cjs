const fs = require('fs');

const targetFile = '../teste/Banner Pop110.html';
let content = fs.readFileSync(targetFile, 'utf8');

// Remove body background
content = content.replace(/html,\s*body\s*\{[\s\S]*?padding:\s*24px;\s*\}/, `body {
  margin: 0;
  padding: 0;
  background: transparent;
}`);

// Remove .stage styling
content = content.replace(/\/\* fit-to-viewport scaler \*\/[\s\S]*?\.stage\s*\{[\s\S]*?transform-origin:\s*center\s*center;\s*\}/, '');

// Remove frame caption styling
content = content.replace(/\/\* size frame caption[\s\S]*?pointer-events:\s*none;\s*\}/, '');

// Remove frame caption HTML
content = content.replace(/<div class="frame-caption">.*?<\/div>\r?\n?/, '');

// Unwrap .stage
content = content.replace(/<div class="stage" id="stage">\s*<div class="banner"/, '<div class="banner"');

// Remove closing stage div and script
content = content.replace(/<\/div>\s*<\/div>\s*<script>[\s\S]*?<\/script>\s*<\/body>/, '  </div>\n</body>');

fs.writeFileSync(targetFile, content, 'utf8');
console.log("Successfully updated the banner HTML.");
