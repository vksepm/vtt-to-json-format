document.addEventListener('DOMContentLoaded', function () {
    // DOM element references
    const jsonInput = document.getElementById('json-input');
    const jsonInputContainer = document.getElementById('json-input-container');
    const dragOverlay = document.getElementById('drag-overlay');
    const schemaOutput = document.getElementById('schema-output');
    const convertButton = document.getElementById('convert-button');
    const convertButtonMobile = document.getElementById('convert-button-mobile');
    const copyButton = document.getElementById('copy-button');
    const downloadButton = document.getElementById('download-button');
    const clearInputButton = document.getElementById('clear-input-button');
    const pasteButton = document.getElementById('paste-button');
    const formatButton = document.getElementById('format-button');
    const inputStatus = document.getElementById('input-status');
    const notification = document.getElementById('notification');
    const notificationMessage = document.getElementById('notification-message');

    // Example VTT data for demonstration
    const exampleVTT = `WEBVTT

00:00:00.000 --> 00:00:05.000
This is a sample subtitle line.

00:00:05.000 --> 00:00:10.000
This is another sample subtitle line.`;

    // Initialize with example
    jsonInput.textContent = exampleVTT;
    validateInput();

    // Convert VTT to JSON
    function convertVTTtoJSON(vttContent) {
        // Remove BOM if present and trim whitespace
        vttContent = vttContent.replace(/^\uFEFF/, '').trim();
        
        // Split into lines and filter out empty lines
        const lines = vttContent.split('\n').map(line => line.trim()).filter(Boolean);
        
        // Check for WEBVTT header
        if (!lines[0].includes('WEBVTT')) {
            throw new Error('Invalid VTT file: Missing WEBVTT header');
        }

        const subtitles = [];
        let currentSubtitle = null;
        let id = 1;

        // Process lines after header
        for (let i = 1; i < lines.length; i++) {
            const line = lines[i];
            
            // Skip NOTE lines
            if (line.startsWith('NOTE')) {
                continue;
            }

            // Check for timestamp line (contains -->)
            if (line.includes('-->')) {
                // If we have a current subtitle, push it before starting new one
                if (currentSubtitle) {
                    subtitles.push(currentSubtitle);
                }
                
                // Parse timestamp line
                const [start, end] = line.split('-->').map(time => time.trim());
                currentSubtitle = {
                    id: id++,
                    start,
                    end,
                    text: ''
                };
            } 
            // If we have a current subtitle and this isn't a timestamp line, it's subtitle text
            else if (currentSubtitle) {
                if (currentSubtitle.text) {
                    currentSubtitle.text += ' ' + line;
                } else {
                    currentSubtitle.text = line;
                }
            }
        }

        // Add last subtitle if exists
        if (currentSubtitle) {
            subtitles.push(currentSubtitle);
        }

        return { subtitles };
    }

    // Validate VTT input
    function validateInput() {
        try {
            const vttText = jsonInput.textContent.trim();
            if (!vttText) {
                inputStatus.textContent = '';
                convertButton.classList.remove('pulse-animation');
                return false;
            }

            // Basic VTT validation
            if (!vttText.includes('WEBVTT')) {
                throw new Error('Missing WEBVTT header');
            }

            if (!vttText.includes('-->')) {
                throw new Error('No valid timestamp found');
            }

            inputStatus.innerHTML = '<span class="text-green-600"><i class="fas fa-check-circle mr-1"></i>Valid VTT format</span>';
            convertButton.classList.add('pulse-animation');
            return true;
        } catch (e) {
            inputStatus.innerHTML = `<span class="text-red-600"><i class="fas fa-exclamation-circle mr-1"></i>Invalid VTT: ${e.message}</span>`;
            convertButton.classList.remove('pulse-animation');
            return false;
        }
    }

    // Format VTT
    function formatVTT() {
        try {
            const vttText = jsonInput.textContent.trim();
            if (!vttText) return;

            // Split into lines and remove empty lines
            const lines = vttText.split('\n').map(line => line.trim()).filter(Boolean);
            
            // Rebuild with proper spacing
            let formattedVTT = '';
            let inSubtitle = false;

            lines.forEach((line, i) => {
                if (line.startsWith('WEBVTT')) {
                    formattedVTT = 'WEBVTT\n\n';
                } else if (line.startsWith('NOTE')) {
                    formattedVTT += line + '\n\n';
                } else if (line.includes('-->')) {
                    formattedVTT += line + '\n';
                    inSubtitle = true;
                } else if (inSubtitle) {
                    formattedVTT += line + '\n\n';
                    inSubtitle = false;
                }
            });

            jsonInput.textContent = formattedVTT.trim();
            validateInput();
            return true;
        } catch (e) {
            showNotification(`Format failed: ${e.message}`, 'error');
            return false;
        }
    }

    // Handle conversion
    function handleConversion() {
        try {
            const vttContent = jsonInput.textContent;
            const jsonResult = convertVTTtoJSON(vttContent);
            
            // Display result with syntax highlighting
            highlightJson(jsonResult, schemaOutput);

            // Enable buttons
            copyButton.disabled = false;
            downloadButton.disabled = false;

            // Show success effects
            createFireworks();
            showCelebrationMessage();
        } catch (error) {
            showNotification(`Conversion failed: ${error.message}`, 'error');
        }
    }

    // Clear input
    clearInputButton.addEventListener('click', () => {
        jsonInput.textContent = '';
        schemaOutput.textContent = '';
        inputStatus.textContent = '';
        copyButton.disabled = true;
        downloadButton.disabled = true;
        convertButton.classList.remove('pulse-animation');
    });

    // Event listeners for conversion
    convertButton.addEventListener('click', () => {
        if (!validateInput()) {
            showNotification('Please enter valid VTT first', 'error');
            return;
        }
        handleConversion();
    });

    convertButtonMobile.addEventListener('click', () => {
        if (!validateInput()) {
            showNotification('Please enter valid VTT first', 'error');
            return;
        }
        handleConversion();
    });

    // Format button handler
    formatButton.addEventListener('click', formatVTT);

    // Input change handler
    jsonInput.addEventListener('input', validateInput);

    // Paste handler
    jsonInput.addEventListener('paste', (e) => {
        e.preventDefault();
        const text = (e.clipboardData || window.clipboardData).getData('text');
        insertPlainText(text);
        setTimeout(validateInput, 0);
    });

    // Copy result handler
    copyButton.addEventListener('click', () => {
        const schema = schemaOutput.textContent;
        if (!schema) return;

        navigator.clipboard.writeText(schema)
            .then(() => showNotification('Copied to clipboard!'))
            .catch(err => showNotification('Failed to copy: ' + err.message, 'error'));
    });

    // Download result handler
    downloadButton.addEventListener('click', () => {
        const schema = schemaOutput.textContent;
        if (!schema) return;

        const blob = new Blob([schema], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'subtitles.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        showNotification('Download started!');
    });

    // Drag and drop handlers
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        jsonInputContainer.addEventListener(eventName, preventDefaults, false);
        document.body.addEventListener(eventName, preventDefaults, false);
    });

    ['dragenter', 'dragover'].forEach(eventName => {
        jsonInputContainer.addEventListener(eventName, () => dragOverlay.classList.remove('hidden'), false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
        jsonInputContainer.addEventListener(eventName, () => dragOverlay.classList.add('hidden'), false);
    });

    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    function handleDrop(e) {
        const dt = e.dataTransfer;
        const files = dt.files;

        if (files.length) {
            const file = files[0];
            if (file.name.endsWith('.vtt')) {
                const reader = new FileReader();
                reader.onload = function(event) {
                    try {
                        const fileContent = event.target.result;
                        insertPlainText(fileContent);
                        if (validateInput()) {
                            handleConversion();
                        }
                    } catch (error) {
                        showNotification(`Unable to read VTT file: ${error.message}`, 'error');
                    }
                };
                reader.readAsText(file);
            } else {
                showNotification('Please upload a VTT format file', 'error');
            }
        }
    }

    jsonInputContainer.addEventListener('drop', handleDrop, false);

    // Utility functions
    function insertPlainText(text) {
        jsonInput.innerHTML = '';
        const textNode = document.createTextNode(text);
        jsonInput.appendChild(textNode);
    }

    function highlightJson(json, container) {
        const highlighted = JSON.stringify(json, null, 2)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
                let cls = 'text-blue-600'; // number
                if (/^"/.test(match)) {
                    if (/:$/.test(match)) {
                        cls = 'text-gray-800 font-medium'; // key
                    } else {
                        cls = 'text-green-600'; // string
                    }
                } else if (/true|false/.test(match)) {
                    cls = 'text-purple-600'; // boolean
                } else if (/null/.test(match)) {
                    cls = 'text-gray-600'; // null
                }
                return `<span class="${cls}">${match}</span>`;
            });

        container.innerHTML = highlighted;
    }

    function createFireworks() {
        const colors = [
            '#FF5252', '#FF4081', '#E040FB', '#7C4DFF',
            '#536DFE', '#448AFF', '#40C4FF', '#18FFFF',
            '#64FFDA', '#69F0AE', '#B2FF59', '#EEFF41',
            '#FFFF00', '#FFD740', '#FFAB40', '#FF6E40'
        ];

        const fireworksCount = window.innerWidth < 768 ? 3 : 5;
        for (let i = 0; i < fireworksCount; i++) {
            createSingleFirework(colors);
        }
    }

    function createSingleFirework(colors) {
        const firework = document.createElement('div');
        firework.className = 'firework';
        document.body.appendChild(firework);

        const x = Math.random() * window.innerWidth;
        const y = Math.random() * (window.innerHeight * 0.6);
        firework.style.left = `${x}px`;
        firework.style.top = `${y}px`;

        const particleCount = Math.floor(Math.random() * 20) + 30;
        for (let i = 0; i < particleCount; i++) {
            createParticle(firework, colors);
        }

        setTimeout(() => document.body.removeChild(firework), 1500);
    }

    function createParticle(container, colors) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        
        const angle = Math.random() * Math.PI * 2;
        const velocity = 1 + Math.random() * 3;
        const size = Math.random() * 3 + 1;
        
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        const destinationX = Math.cos(angle) * 100 * velocity;
        const destinationY = Math.sin(angle) * 100 * velocity;
        
        particle.animate([
            { transform: 'translate(0, 0)', opacity: 1 },
            { transform: `translate(${destinationX}px, ${destinationY}px)`, opacity: 0 }
        ], {
            duration: 1000 + Math.random() * 500,
            easing: 'cubic-bezier(0,0,0.2,1)'
        });
        
        container.appendChild(particle);
    }

    const celebrationMessages = [
        { message: "Great success!", emoji: "🎉" },
        { message: "Conversion complete!", emoji: "✨" },
        { message: "All done!", emoji: "🎈" },
        { message: "Perfect!", emoji: "🌟" },
        { message: "Excellent!", emoji: "🎊" }
    ];

    function showCelebrationMessage() {
        const celebration = celebrationMessages[Math.floor(Math.random() * celebrationMessages.length)];
        const messageEl = document.createElement('div');
        messageEl.className = 'celebration-message';
        messageEl.innerHTML = `<span class="celebration-emoji">${celebration.emoji}</span>${celebration.message}`;
        document.body.appendChild(messageEl);
        setTimeout(() => document.body.removeChild(messageEl), 3000);
    }

    function showNotification(message, type = 'success') {
        notificationMessage.textContent = message;
        notification.classList.remove('hidden', 'bg-gray-800', 'bg-green-600', 'bg-red-600');
        
        if (type === 'success') {
            notification.classList.add('bg-green-600');
        } else if (type === 'error') {
            notification.classList.add('bg-red-600');
        } else {
            notification.classList.add('bg-gray-800');
        }

        notification.classList.add('fade-in');
        setTimeout(() => {
            notification.classList.add('hidden');
            notification.classList.remove('fade-in');
        }, 3000);
    }
});