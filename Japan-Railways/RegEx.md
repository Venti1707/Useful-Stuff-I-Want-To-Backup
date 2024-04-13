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
To find: `^$\n`

To replace: ` `



# Lines Which Are Unfinished
- [Kamiiida Line](https://en.wikipedia.org/wiki/Kamiiida_Line)
  - Akatsuka station
  - Takaoka station
  - Shinsakae-machi station
  - Maruta-machi station

# Lines With No Colours
- [Abukuma Express Line](https://en.wikipedia.org/wiki/Abukuma_Express_Line)