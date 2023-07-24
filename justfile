push-to-neocities:
  npm run build
  neocities delete assets
  neocities push ./dist
