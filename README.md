# 🎬 VTT to JSON format converter

## 📝 Overview
This project is a web-based tool designed to convert VTT (Web Video Text Tracks) files into JSON format. It provides a user-friendly interface for users to paste their VTT data and receive a structured JSON output, along with plain text extraction. The tool is built using HTML, CSS, and JavaScript, with a focus on simplicity and ease of use.

## ✨ Features
- **🎯 Auto Detection**: Automatically detects the structure of the input VTT data and generates a corresponding JSON format.
- **⚡ Accurate Conversion**: Generates precise JSON output based on the structure of the input VTT data, ensuring that all relevant information is accurately represented in the JSON format.
- **📋 Quick Export**: Copy or download both JSON and plain text outputs with a single click.
- **🎯 Drag and Drop**: Supports drag-and-drop functionality for uploading VTT files directly into the editor.
- **🎨 Format Button**: Automatically formats your VTT input for better readability.
- **✨ Validation**: Real-time validation of VTT format with helpful error messages.
- **🎉 Celebration Effects**: Enjoy fun animations and messages upon successful conversion.

## 📋 Example
<details>
<summary>📝 Simple VTT Example</summary>

### Input VTT Data
```
WEBVTT
1
00:00:00.000 --> 00:00:05.000
This is a sample subtitle line.
2
00:00:05.000 --> 00:00:10.000
This is another sample subtitle line.
```

### Output JSON Format
```json
{
  "subtitles": [
    {
      "id": 1,
      "start": "00:00:00.000",
      "end": "00:00:05.000",
      "text": "This is a sample subtitle line."
    },
    {
      "id": 2,
      "start": "00:00:05.000",
      "end": "00:00:10.000",
      "text": "This is another sample subtitle line."
    }
  ]
}
```
</details>

<details>
<summary>📝 Complex VTT Example with Notes</summary>

### Input VTT Data
```
WEBVTT

NOTE language:en-US

NOTE Confidence: 0.9537643790245056

00:00:00.960 --> 00:00:05.053
Hi everyone, welcome to today's live time-travel cooking class, where the past

NOTE Confidence: 0.9537643790245056

00:00:05.108 --> 00:00:08.759
meets the future... and your soufflé decides its own destiny.
```

### Output JSON Data
```json
{
  "subtitles": [
    {
      "id": 1,
      "start": "00:00:00.960",
      "end": "00:00:05.053",
      "text": "Hi everyone, welcome to today's live time-travel cooking class, where the past"
    },
    {
      "id": 2,
      "start": "00:00:05.108",
      "end": "00:00:08.759",
      "text": "meets the future... and your soufflé decides its own destiny."
    }
  ]
}
```
</details>

## 🛠️ Tech Stack
- **🌐 HTML**: For structuring the web page
- **🎨 CSS**: For styling, including custom animations and effects
- **⚡ JavaScript**: For VTT parsing and conversion logic
- **🎯 Tailwind CSS**: Utility-first CSS framework for styling
- **✨ Font Awesome**: For beautiful icons
- **📝 Google Fonts**: "Noto Sans TC" font for typography

## 📚 How to Use
1. 📋 Paste your VTT data into the input box
   - Or drag and drop a VTT file into the editor
   - The tool will automatically validate your input
2. ▶️ Click the convert button (or use Ctrl+Enter)
3. 📥 Get your output in both JSON and plain text formats
4. 💾 Copy or download using the provided buttons
5. 🎨 Use the Format button to beautify your VTT input

## 📁 File Structure
- `index.html`: Main HTML file with the user interface
- `styles.css`: CSS styles and animations
- `script.js`: Core conversion logic and interactivity

## ⚙️ Installation
1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Open `index.html` in your browser to start using the tool

## 📄 License
This project is licensed under the MIT License. Feel free to use, modify, and distribute it as per the license terms.

## 🙏 Acknowledgments
- [Tailwind CSS](https://tailwindcss.com/) - For utility-first CSS
- [Font Awesome](https://fontawesome.com/) - For beautiful icons
- [Google Fonts](https://fonts.google.com/) - For typography
