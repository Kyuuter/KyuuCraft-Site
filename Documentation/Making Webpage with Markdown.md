
# How to make a webpage for the site using a Markdown file
Development file for how to quickly add pages to the website. Mostly for quick scaling for pages that are generic and do not require custom scripting.
## Overview

This is a feature I added to the site that will allow you to add `.md` files to the repo which will be directly routed into the site. I would recommend using [Stack Edit](https://stackedit.io/app#) so that you can get a general feeling for how it will look before adding it to the website. Please review the [ISSUES.md](/Documentation/ISSUES.md) file for any current issues with the Markdown parsing, as it might be limited in what components are currently working as expected.

## How to

- Create a markdown file and add it to the folder `/public/pages` (technically it can be anywhere in the public folder, but this will keep things organized)
- Edit the `/public/markdown-pages.json` to include a pairing for your new webpage (it will be the extension name followed by the file path). For example the test pairing means the URL would be KyuuCraftSite.com/test, which is an actual page to display how Markdown component display on the site.
	- The extension used here can also be used within the site's code for linking to it. The only difference would be you would need a leading '/' for the `<Link/>` element.
	```json 
	{
    "test": "pages/test.md",
    "[URL-EXTENSION]": "pages/[FILE NAME]"
  }
	```
- Ensure these changes are pushed to the main branch in the Github repository [link to repo](https://github.com/Spide6667/KyuuCraft-Site).
- If done correctly, this should lead to a new deployment being created on the repo site under the [Deployments page](https://github.com/Spide6667/KyuuCraft-Site/deployments)
**_If there are any issues, let the dev team know (Primary contact should be through Discord DMs to Spide6667)_**

## Adding Images
- If you want there to be images, you need to makes sure that the routing is correctly done and that the file is within the `public` folder
- The formatting for an image is `![placeholder text in case image cannot load](FILE_PATH)`
- `FILE_PATH` should be the relative path for the image within the `public folder`
	- For example, if the path is `public/test/folder/image.png`, the path would be `test/folder/image.png`.
	- **DO NOT PUT START THE FILE PATH WITH A LEADING '/'**, this indicates it is a literal path and will not go where we expect it to.