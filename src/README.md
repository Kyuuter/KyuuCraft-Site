np# Codebase notes and tips

This is just a list of different features and methodologies I used when creating this site to help keep it organized in my way. Maintaining this principle would be best when iterating off of this branch, so it would be smart to take the time to understand what goes where! Go to the [main read me file](../README.md) for the project details and different acknowledgments.

## Getting started with Codebase

- To get all dependencies for the code to run, download [Node](https://nodejs.org/en/), and use `npm install` in "/" to get all dependencies.

- Use `npm run dev` to run the React App in the [local host](http://localhost:3000/)

- All color variables will be stored in `stlye.css` within **/src/**

- All webpages (besides error pages and redirection pages) are stored in **/src/components**

- All utilities like the NavBar and the unique Button classes are in **/src/utils**

- Any feature that you want to implement using a Shadcn UI Element should be imported using `npx shadcn-ui@latest add [element name]`

- For the Project List feature

  - Make sure that the folder name is unique or it invalidates both addresses!!

  - the `"id"` json attribute defines the order of the project list by default so each should be unique and which number you use should be considered with that in mind

    - Please keep the JSON elements in order by their id too please!!!

  - Folders should be located by **./public/data/[folder_name]/**

    - For example, for **./public/data/website** is referenced via `"folder_name": "website",`

  - In the projects.json, each project should be in the format of:

  ```
  {
  "id": ,
  "name": "",
  "start_time": "MM/YYYY",
  "end_time": "[optional]",
  "github_link": "[optional]",
  "description": "",
  "folder_name": "",
  "cover_image": "",
  "cycling_images": [],
  "extension": "",
  "tags": [],
  "ongoing": false
  }
  ```

- Use `rfc` to create a fundamental return function for a new class!

- Check out the GitHub action I have in **./.github/workflows** for the automation I included in the website!

- The commit system uses **commitlint** so it requires a specific struture to send out a commit
  - For a guide to how to comment correctly according to this format, run `npm run commit` (Note, this command also does `git add -A` automatically because I am lazy)

## Ground Rules for the Codebase

- All unique page layouts should be stored in the same file as the .tsx file

- Did not do for some files like `index.tsx` or `because this is a rule for _my additions to the framework_

- Most webpages should use the relevant generic .css file for formatting so that each of their special .css files (if there are any), are cut down to just the parts that are unique for that object.

- Keeping a labeling system for attributes used in web object that is not part of the should be done for easy debugging!

- At the minimum, having a comment block at the top of all other .css files used will help a lot

- Remember to only **import a .css once** for performance. Generic .css files can be imported in `App.tsx` to avoid duplicate references.

### Formatting

- All React Object files and functions should be PascalCase (ex. "ReactObject.tsx" -> "ReactObject(){}")

- Other Typescript files should be kebab-case and use .ts instead of tsx (ex. "web-logic.ts")

- Any non-React functions should be camelCase (ex. "runWebsiteLogic(){}")

- CSS files should share the **exact name** for the file they are made for (ex. "ReactObject.css")

- Global Variables, when unavoidable, should be UPPER_SNAKE_CASE (ex. "MEANING_OF_LIFE = 42")

- Local Typescript Variables should always be camelCase (ex. "sodaCalled: string = "pop")

- Local CSS Variables should always be kebab-case (ex. "--best-color = "#ff80ed" [according to [them](https://www.color-hex.com/popular-colors.php)])

- Any confusion should be resolved with the [Google Typescript Style Guide](https://google.github.io/styleguide/tsguide.html#local-variable-declarations)

- All these given rules should not conflict with this guide besides the file naming rules, but that makes developing better (in my opinion)

- Imports should be:

  1. Core libraries (ex. React, React Router Dom)

  2. Complementary Libraries (ex. ShadCN [think "not essential but nice to have"])

  3. Personal React Object imports (ex. App, Home, NavBar)

  4. CSS Files [Should only be imported once!!!] (ex. App.css, Home.css, NavBar.css)

### Other Nice Things To Do

- Make enums' values for those that track states or specific stages `strings` that briefly describe what state/stage it is in
- Use state machines with embedded values to have type and state-specific variables (saves time and helps with challenging bad assumptions)
- Using Prettier can make documents readable, and I currently use `2 spaces` for tabs!
- I like having very sorted file structures, like how I have `ui` inside of `components` and `utils` separate from it because they are a unique subset of objects
- Having details in commits helps find where things broke, take the 30 seconds to document the changes, and make them **small**
