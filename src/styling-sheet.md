# Styling Sheet
Because working with Tailwind AND CSS can get pretty confusing.

## Rules for styling

### CSS / Tailwind elements

### Themes
- All colors should be created using the theme variables
    - This is so any color palette can be changed quickly without any surprises!
- To create a theme
    - Go to `./src/style.css` to define all the colors (using HSL formatting!!!)
- To add new color variables to use
    - Go to `./tailwind.config.js` and define it under theme > extend > color
        - Formatted as `<name>: "hsl(var(--<varName>))",`
        - For variables like `main-text` the formatting is 
            ```
            main: {
                text: "hsl(var(--main-text))",
                bg: "hsl(var(--main-bg))",
            },
            ```

## Tips

## Creating your own theme