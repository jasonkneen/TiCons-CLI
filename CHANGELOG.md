# Changelog

## 0.1.0
- **BREAKING:** Renamed `targets` to `platforms` to be inline with `ti`.
- Adds `splashes` to generate splash screens (aka launch images).
- Adds `--min-dpi` and `--max-dpi` to leave out `ldpi` for example.
- Adds `--trace` to display config and ImageMagick commands.
- Adds `--radius` to round corners of non-iOS icons.
- Adds `--locale` to output splashes to i18n folders.
- Adds `--orientation` to generate splashes for portrait/landscape only.
- Adds `--no-fix` to **not** use the official Apple splash specs to fix shifting.
- Adds lots of smart defaults based on project you're in!

## 0.0.2
- First version on NPM, including support for icons only