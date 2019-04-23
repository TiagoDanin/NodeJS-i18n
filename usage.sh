# Create file
find . | grep .js | sort | nodejs-i18n > en.po

# Create file (all strings) [beta]
find . | grep .js | sort | nodejs-i18n --all > en.po

# Create file (get identifier value) [beta]
find . | grep .js | sort | nodejs-i18n --value > en.po
