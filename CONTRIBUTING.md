# Contributing to Bangla Web Fonts  

We welcome contributions to **Bangla Web Fonts**! Whether you're adding new fonts, improving documentation, or fixing bugs, your help is greatly appreciated.

## Table of Contents
1. [How to Contribute](#how-to-contribute)
2. [Adding a Font](#adding-a-font)
3. [Creating a Pull Request](#creating-a-pull-request)
4. [Code of Conduct](#code-of-conduct)
5. [License](#license)

## How to Contribute
Follow these steps to contribute to **Bangla Web Fonts**:

1. **Fork the repository** to your own GitHub account by clicking the **Fork** button at the top right of the repository page.
2. **Make your changes** directly in your forked repository.
3. **Commit your changes** with clear, concise commit messages.
4. **Submit a pull request** to the main repository from your fork.

## Adding a Font
To add a new Bangla font to the repository, follow these steps:

1. **Update `fonts.json`**:
   - Go to `src/collections/fonts.json` and add the new font details.
   - Here’s an example of how to format your font entry:
     ```json
     {
       "FontName": "Tiro Bangla",
       "TotalStyles": "2",
       "FontFamily": "'Tiro Bangla', serif",
       "FontPath": "tiro-bangla",
       "FontWeights": ["400"],
       "FontTesterWeights": ["400", "700"],
       "FontDesigner": "Tiro Typeworks",
       "FontDesignerURL": "https://www.tiro.com/"
     }
     ```
   - **Explanation of Fields**:
     - `FontWeights`: This contains the actual font weights. These weights will be used to dynamically generate the CSS for the font.
     - `FontTesterWeights`: These are the font weights that will be available in the font tester for live previews. These may be a subset of the actual font weights.
- Ensure the `FontPath` corresponds to the folder name you will create in the next step.

3. **Create the font folder**:
   - In the `public/fonts/` directory, create a folder named after the `FontPath` value you added in `fonts.json`. 
   - For example, if your `FontPath` is `"tiro-bangla"`, create a folder called `tiro-bangla` inside the `public/fonts/` directory.

4. **Upload the font files**:
   - In the folder you just created, upload the font files in `.woff2` format.
   - Rename the font files using the format `FontPath-WeightName.woff2`. For example, for the font `"tiro-bangla"` with the weight `400`, name the file `tiro-bangla-regular.woff2`.

5. **Upload the License File**:
   - Along with the font files, upload a `license.txt` file that contains the font's licensing information.

### Common Font Weight Names
Here is a list of commonly used font weight names that you can use:

- `100 - thin`
- `200 - extra-light`
- `300 - light`
- `400 - regular`
- `500 - medium`
- `600 - semibold`
- `700 - bold`
- `800 - extrabold`
- `900 - black`

These names should be used for the font files when renaming them. For example, a 700 weight file should be named `tiro-bangla-bold.woff2`.

## Creating a Pull Request
Once you’ve made your changes and committed them, you can create a pull request:

1. Visit the [Pull Requests](https://github.com/fuadhasanshihab/bangla-web-fonts/pulls) section of the repository.
2. Click **New Pull Request**.
3. Select your fork and the branch with your changes.
4. Provide a detailed description of what changes you’ve made, including any relevant context or reasoning.
5. Submit the pull request and wait for review!

## Code of Conduct
We expect all contributors to adhere to our [Code of Conduct](/.github/CODE_OF_CONDUCT.md). Please be respectful and considerate when interacting with others in the community.

## License
By contributing to this repository, you agree that your contributions will be licensed under the same [**Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International (CC BY-NC-SA 4.0)**](https://creativecommons.org/licenses/by-nc-sa/4.0/) license.

---

Thank you for contributing to **Bangla Web Fonts**! Your efforts help make this project better for everyone. If you have any questions or need assistance, feel free to ask.
