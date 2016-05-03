echo "Running build script"
./node_modules/.bin/webpack --verbose --colors --display-error-details --config webpack.config.dist.js
cp -rf src/assets dist
echo "Build script passed"
