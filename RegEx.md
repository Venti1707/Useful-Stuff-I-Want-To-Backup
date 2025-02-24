# Replacing Text Before A String
To Find: `.+(\X)`
* `X` is the string, the backslash isn't needed for some characters.

To Replace: *Anything you wish to replace it with*

# Replacing Text After A String
To Find: `(\X).*$`
* `X` is the string, the backslash isn't needed for some characters.

To Replace: *Anything you wish to replace it with*

# Replacing Line Containing A String
To Find: `^.*(\X).*\n?`
* `X` is the string, the backslash isn't needed for some characters.

To Replace: *Anything you wish to replace it with*

# Removing Duplicate Lines
To Find: `^(.*)(\n\1)+$`

To Replace: `$1`

# Removing Blank Lines
To Find: `^$\n`

To Replace: ` `

# Replacing Lines That Do Not Contain A String
To find: `^(?!.*\X).*\n?`

To Replace: *Anything that you wish to replace it with*