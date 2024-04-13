# Changing Key Features
In the `.geojson` file that has been automatically created, open up the properties tag (Line 6) and set the property as `"stroke"` and the value the same way you define CSS colours. Refer [here](http://web.simmons.edu/~grovesd/comm244/notes/week3/css-colors) for a guide.

In the `.geojson` file that has been created, replace
```
      "properties": {
        "name
```
with
```
      "properties": {
        "marker-color": "<colour>",
        "marker-symbol": "<symbol>",
        "marker-size": "<size>",
        "name
```
where `<colour>` is the colour, `<symbol>` is the symbol, `<size>` is the size

Under each `"type": "Feature"`, you can set
- `marker-color` the same way you define CSS colours (Refer [here](http://web.simmons.edu/~grovesd/comm244/notes/week3/css-colors) for a guide.)
- `marker-symbol` as any of the values in [here](AcceptedValues/marker-symbol_values.txt)
- `marker-size` as any of the values in [here](AcceptedValues/marker-size_values.txt)