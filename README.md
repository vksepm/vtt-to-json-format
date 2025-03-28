# VTT to JSON format converter

## Overview
This project is a web-based tool designed to convert VTT (Subtitle) files into JSON format. It provides a user-friendly interface for users to paste their VTT data and receive a structured JSON output. The tool is built using HTML, CSS, and JavaScript, with a focus on simplicity and ease of use.


## Features
- **Auto Detection**: Automatically detects the structure of the input VTT data and generates a corresponding JSON format.
- **Accurate Conversion**: Generates precise JSON output based on the structure of the input VTT data, ensuring that all relevant information is accurately represented in the JSON format.
- **Quick Export**: Allows users to copy or download the generated JSON output with a single click.
- **Drag and Drop Upload**: Supports drag-and-drop functionality for uploading VTT files directly into the editor.
- **Dark Mode**: Toggle between light and dark themes for better accessibility.
- **Celebration Effects**: Enjoy fun animations and messages upon successful conversion.


## Example
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

### Input VTT Data 
```
WEBVTT

NOTE language:en-US

NOTE Confidence: 0.9537643790245056

00:00:00.960 --> 00:00:05.053
Hi everyone, welcome to today's live online training software architecture

NOTE Confidence: 0.9537643790245056

00:00:05.108 --> 00:00:08.759
characteristics Defining, discovering and protecting architecture.

NOTE Confidence: 0.9247289896011353

00:00:09.200 --> 00:00:11.885
Your instructors for the course today are Neil Ford and

NOTE Confidence: 0.9247289896011353

00:00:11.934 --> 00:00:12.520
Raju Gandhi.

NOTE Confidence: 0.83155357837677

00:00:12.520 --> 00:00:15.883
Neil is a director, software architect, and meme Wrangler at

NOTE Confidence: 0.83155357837677

00:00:15.939 --> 00:00:19.414
Thought Works, a software company in a community of passionate

NOTE Confidence: 0.83155357837677

00:00:19.470 --> 00:00:23.449
purpose LED individuals who think disruptively to deliver technology to

NOTE Confidence: 0.83155357837677
```

### Output JSON Data
```json
{
  "subtitles": [
    {
      "id": 1,
      "start": "00:00:00.960",
      "end": "00:00:05.053",
      "text": "Hi everyone, welcome to today's live online training software architecture"
    },
    {
      "id": 2,
      "start": "00:00:05.108",
      "end": "00:00:08.759",
      "text": "characteristics Defining, discovering and protecting architecture."
    },
    {
      "id": 3,
      "start": "00:00:09.200",
      "end": "00:00:11.885",
      "text": "Your instructors for the course today are Neil Ford and"
    },
    {
      "id": 4,
      "start": "00:00:11.934",
      "end": "00:00:12.520",
      "text": "Raju Gandhi."
    },
    {
      "id": 5,
      "start": "00:00:12.520",
      "end": "00:00:15.883",
      "text": "Neil is a director, software architect, and meme Wrangler at"
    }
  ]
}
```

## Tech Stack
- **HTML**: For structuring the web page.
- **CSS**: For styling, including custom animations and effects.
- **JavaScript**: For interactivity and JSON to JSON Schema conversion logic.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **Font Awesome**: For icons.
- **Google Fonts**: "Noto Sans TC" font for typography.

## How to Use
1. Paste your VTT data into the input box on the left side of the page.
   - Alternatively, you can drag and drop a VTT file into the editor.
   - The tool will automatically detect the structure of the VTT data and generate a JSON format.
2. Click the "Convert" button to generate the JSON Schema.
3. Copy or download the generated JSON Schema using the provided buttons.
4. Optionally, drag and drop a JSON file into the editor for automatic processing.

## File Structure
- `index.html`: The main HTML file for the application.
- `styles.css`: Contains all the styles and animations for the application.
- `script.js`: Handles the logic for JSON to JSON Schema conversion and interactivity.

## Installation
1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Open the `index.html` file in your browser to start using the tool.

## License
This project is licensed under the MIT License. Feel free to use, modify, and distribute it as per the license terms.
- The tool will automatically detect the structure of the VTT data and generate a JSON format.

## Acknowledgments
- [Tailwind CSS](https://tailwindcss.com/)
- [Font Awesome](https://fontawesome.com/)
- [Google Fonts](https://fonts.google.com/)
