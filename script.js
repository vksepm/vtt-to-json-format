// Constants and configurations
const CONFIG = {
    ANIMATIONS: {
        FIREWORK_COLORS: [
            '#FF5252', '#FF4081', '#E040FB', '#7C4DFF',
            '#536DFE', '#448AFF', '#40C4FF', '#18FFFF',
            '#64FFDA', '#69F0AE', '#B2FF59', '#EEFF41',
            '#FFFF00', '#FFD740', '#FFAB40', '#FF6E40'
        ],
        CELEBRATION_MESSAGES: [
            { message: "Great success!", emoji: "🎉" },
            { message: "Conversion complete!", emoji: "✨" },
            { message: "All done!", emoji: "🎈" },
            { message: "Perfect!", emoji: "🌟" },
            { message: "Excellent!", emoji: "🎊" }
        ],
        NOTIFICATION_DURATION: 3000,
    },
    FILE_TYPES: {
        VTT: '.vtt',
        JSON: 'application/json',
        TEXT: 'text/plain'
    },
    VTT_EXAMPLES: [
        `WEBVTT

00:00:00.000 --> 00:00:05.000
This is a sample subtitle line.

00:00:05.000 --> 00:00:10.000
This is another sample subtitle line.`,
        `WEBVTT

NOTE language:en-US

NOTE Confidence: 0.9537643790245056

00:00:00.960 --> 00:00:05.053
Hi everyone, welcome to today's live time-travel cooking class, where the past

NOTE Confidence: 0.9537643790245056

00:00:05.108 --> 00:00:08.759
meets the future... and your soufflé decides its own destiny.

NOTE Confidence: 0.9247289896011353

00:00:09.200 --> 00:00:11.885
Your chefs for the day are Chef Chronos and

NOTE Confidence: 0.9247289896011353

00:00:11.934 --> 00:00:12.520
Pastry Pioneer Venus.

NOTE Confidence: 0.83155357837677

00:00:12.520 --> 00:00:15.883
Chef Chronos specializes in ancient recipes and modern shortcuts,

NOTE Confidence: 0.83155357837677

00:00:15.939 --> 00:00:19.414
while Venus bakes galaxy-level desserts faster than light speed. Ready?

NOTE Confidence: 0.83155357837677

00:00:19.470 --> 00:00:23.449
Grab your time-travel whisk and let's sauté like it's 1923!`,
        `WEBVTT

NOTE language:en-US

NOTE Confidence: 0.9537643790245056

00:00:00.960 --> 00:00:05.053
Greetings, Earthlings, and welcome to today's interstellar diplomacy workshop,

NOTE Confidence: 0.9537643790245056

00:00:05.108 --> 00:00:08.759
where we teach you how to avoid accidentally starting wars with aliens.

NOTE Confidence: 0.9247289896011353

00:00:09.200 --> 00:00:11.885
Your instructors today are Captain Zoglox and

NOTE Confidence: 0.9247289896011353

00:00:11.934 --> 00:00:12.520
Ambassador Andromeda.

NOTE Confidence: 0.83155357837677

00:00:12.520 --> 00:00:15.883
Captain Zoglox is a 7-foot-tall lizard-like being who excels

NOTE Confidence: 0.83155357837677

00:00:15.939 --> 00:00:19.414
at handshake techniques that won't get you vaporized. Ambassador Andromeda

NOTE Confidence: 0.83155357837677

00:00:19.470 --> 00:00:23.449
will teach you how to charm even the most suspicious Martians. Ready your translator!`,
        `WEBVTT

NOTE language:en-US

NOTE Confidence: 0.9537643790245056

00:00:00.960 --> 00:00:05.053
Hello dreamers and doers! Welcome to "Open Minds, Open Success," our 

NOTE Confidence: 0.9537643790245056

00:00:05.108 --> 00:00:08.759
workshop on harnessing creative thinking to achieve your wildest goals.

NOTE Confidence: 0.9247289896011353

00:00:09.200 --> 00:00:11.885
Your guides for today’s journey are visionary coach Alex Star and

NOTE Confidence: 0.9247289896011353

00:00:11.934 --> 00:00:12.520
dream chaser Mia Bloom.

NOTE Confidence: 0.83155357837677

00:00:12.520 --> 00:00:15.883
Alex has inspired thousands to think outside the box while Mia will show 

NOTE Confidence: 0.83155357837677

00:00:15.939 --> 00:00:19.414
you how small ideas can lead to unstoppable momentum.

NOTE Confidence: 0.83155357837677

00:00:19.470 --> 00:00:23.449
Get comfortable, grab a notebook, and let’s unlock the creativity within you!`,
        `WEBVTT

NOTE language:en-US

NOTE Confidence: 0.9537643790245056

00:00:00.960 --> 00:00:05.053
Welcome to "Superpowered Gardening," where we teach you how to grow

NOTE Confidence: 0.9537643790245056

00:00:05.108 --> 00:00:08.759
plants that can practically fight crime and photosynthesize happiness.

NOTE Confidence: 0.9247289896011353

00:00:09.200 --> 00:00:11.885
Your superhero gardeners are Flora Force and

NOTE Confidence: 0.9247289896011353

00:00:11.934 --> 00:00:12.520
Captain Chlorophyll.

NOTE Confidence: 0.83155357837677

00:00:12.520 --> 00:00:15.883
Flora will guide you through planting super-seeds, while Captain Chlorophyll

NOTE Confidence: 0.83155357837677

00:00:15.939 --> 00:00:19.414
will teach you how to wield sunlight like a true photosynthetic boss.

NOTE Confidence: 0.83155357837677

00:00:19.470 --> 00:00:23.449
Get your gardening gloves on, and let’s grow the garden of your dreams!`
    ]
};

// VTT Parser Module
const VTTParser = {
    convertToJSON(vttContent) {
        const cleanContent = this._cleanInput(vttContent);
        const lines = this._splitIntoLines(cleanContent);
        
        this._validateHeader(lines);
        return this._parseSubtitles(lines);
    },

    _cleanInput(content) {
        return content.replace(/^\uFEFF/, '').trim();
    },

    _splitIntoLines(content) {
        return content.split('\n').map(line => line.trim());
    },

    _validateHeader(lines) {
        if (!lines[0]?.includes('WEBVTT')) {
            throw new Error('Invalid VTT file: Missing WEBVTT header');
        }
    },

    _parseSubtitles(lines) {
        const subtitles = [];
        let currentSubtitle = null;
        let id = 1;

        for (let i = 1; i < lines.length; i++) {
            const line = lines[i];
            
            if (!line || line.startsWith('NOTE')) {
                continue;
            }

            if (line.includes('-->')) {
                if (currentSubtitle) {
                    subtitles.push(currentSubtitle);
                }
                
                const [start, end] = line.split('-->').map(time => time.trim());
                currentSubtitle = { id: id++, start, end, text: '' };
            } 
            else if (currentSubtitle) {
                currentSubtitle.text = currentSubtitle.text 
                    ? currentSubtitle.text + ' ' + line 
                    : line;
            }
        }

        if (currentSubtitle) {
            subtitles.push(currentSubtitle);
        }

        return { subtitles };
    }
};

// UI Controller Module
const UIController = {
    elements: {},

    initialize() {
        this._initializeElements();
        this._attachEventListeners();
        this._loadRandomExample();
    },

    _initializeElements() {
        // Get all required DOM elements
        const elementIds = [
            'json-input', 'json-input-container', 'drag-overlay', 
            'schema-output', 'text-output', 'convert-button', 
            'convert-button-mobile', 'copy-button', 'download-button',
            'copy-text-button', 'download-text-button', 'clear-input-button',
            'paste-button', 'format-button', 'input-status', 'notification',
            'notification-message'
        ];

        elementIds.forEach(id => {
            this.elements[id] = document.getElementById(id);
        });
    },

    _attachEventListeners() {
        // Conversion buttons
        this.elements['convert-button']?.addEventListener('click', () => this._handleConvert());
        this.elements['convert-button-mobile']?.addEventListener('click', () => this._handleConvert());

        // Input handling
        this.elements['json-input']?.addEventListener('input', () => this._validateInput());
        this.elements['json-input']?.addEventListener('paste', (e) => this._handlePaste(e));

        // Action buttons
        this.elements['clear-input-button']?.addEventListener('click', () => this._clearAll());
        this.elements['format-button']?.addEventListener('click', () => this._formatVTT());
        this.elements['copy-button']?.addEventListener('click', () => this._copyToClipboard('json'));
        this.elements['copy-text-button']?.addEventListener('click', () => this._copyToClipboard('text'));
        this.elements['download-button']?.addEventListener('click', () => this._downloadFile('json'));
        this.elements['download-text-button']?.addEventListener('click', () => this._downloadFile('text'));

        // Drag and drop
        this._setupDragAndDrop();
    },

    _loadRandomExample() {
        const randomIndex = Math.floor(Math.random() * CONFIG.VTT_EXAMPLES.length);
        this.elements['json-input'].textContent = CONFIG.VTT_EXAMPLES[randomIndex];
        this._validateInput();
    },

    _handleConvert() {
        if (!this._validateInput()) {
            this.showNotification('Please enter valid VTT first', 'error');
            return;
        }

        try {
            const vttContent = this.elements['json-input'].textContent;
            const jsonResult = VTTParser.convertToJSON(vttContent);
            
            this._displayResults(jsonResult);
            this._enableButtons();
            this._showSuccessEffects();
        } catch (error) {
            this.showNotification(`Conversion failed: ${error.message}`, 'error');
        }
    },

    _displayResults(jsonResult) {
        // Display JSON with syntax highlighting
        this._highlightJson(jsonResult, this.elements['schema-output']);

        // Display plain text
        const plainText = this._extractPlainText(jsonResult);
        this.elements['text-output'].textContent = plainText;
    },

    _validateInput() {
        try {
            const vttText = this.elements['json-input'].textContent.trim();
            if (!vttText) {
                this.elements['input-status'].textContent = '';
                this._disableButtons();
                return false;
            }

            if (!vttText.includes('WEBVTT')) {
                throw new Error('Missing WEBVTT header');
            }

            // More robust timestamp validation
            const hasValidTimestamp = vttText.split('\n').some(line => {
                return /^\d{2}:\d{2}:\d{2}\.\d{3}\s*-->\s*\d{2}:\d{2}:\d{2}\.\d{3}/.test(line.trim());
            });

            if (!hasValidTimestamp) {
                throw new Error('No valid timestamp found (format should be HH:MM:SS.mmm --> HH:MM:SS.mmm)');
            }

            this.elements['input-status'].innerHTML = '<span class="text-green-600"><i class="fas fa-check-circle mr-1"></i>Valid VTT format</span>';
            return true;
        } catch (e) {
            this.elements['input-status'].innerHTML = `<span class="text-red-600"><i class="fas fa-exclamation-circle mr-1"></i>Invalid VTT: ${e.message}</span>`;
            this._disableButtons();
            return false;
        }
    },

    _formatVTT() {
        try {
            const vttText = this.elements['json-input'].textContent.trim();
            if (!vttText) return;

            const lines = vttText.split('\n').map(line => line.trim());
            let formattedVTT = '';
            let inSubtitle = false;

            lines.forEach((line) => {
                if (line.startsWith('WEBVTT')) {
                    formattedVTT = 'WEBVTT\n\n';
                } else if (line.startsWith('NOTE')) {
                    formattedVTT += line + '\n\n';
                } else if (line.includes('-->')) {
                    formattedVTT += line + '\n';
                    inSubtitle = true;
                } else if (inSubtitle && line) {
                    formattedVTT += line + '\n\n';
                    inSubtitle = false;
                }
            });

            this.elements['json-input'].textContent = formattedVTT.trim();
            this._validateInput();
        } catch (e) {
            this.showNotification(`Format failed: ${e.message}`, 'error');
        }
    },

    _extractPlainText(jsonResult) {
        if (!jsonResult?.subtitles) return '';
        return jsonResult.subtitles
            .map(subtitle => subtitle.text.trim())
            .join(' '); // Join all subtitles into a single string 
    },

    _enableButtons() {
        ['copy-button', 'download-button', 'copy-text-button', 'download-text-button']
            .forEach(id => this.elements[id].disabled = false);
    },

    _disableButtons() {
        ['copy-button', 'download-button', 'copy-text-button', 'download-text-button']
            .forEach(id => this.elements[id].disabled = true);
    },

    _clearAll() {
        ['json-input', 'schema-output', 'text-output'].forEach(id => {
            this.elements[id].textContent = '';
        });
        this.elements['input-status'].textContent = '';
        this._disableButtons();  // Fix: Disable buttons when clearing
    },

    async _copyToClipboard(type) {
        const content = type === 'json' 
            ? this.elements['schema-output'].textContent
            : this.elements['text-output'].textContent;

        if (!content) return;

        try {
            await navigator.clipboard.writeText(content);
            this.showNotification(`${type === 'json' ? 'JSON' : 'Text'} copied to clipboard!`);
        } catch (err) {
            this.showNotification(`Failed to copy: ${err.message}`, 'error');
        }
    },

    _downloadFile(type) {
        const content = type === 'json' 
            ? this.elements['schema-output'].textContent
            : this.elements['text-output'].textContent;

        if (!content) return;

        const fileType = type === 'json' ? CONFIG.FILE_TYPES.JSON : CONFIG.FILE_TYPES.TEXT;
        const fileName = type === 'json' ? 'subtitles.json' : 'subtitles.txt';

        this._createAndDownloadFile(content, fileName, fileType);
    },

    _createAndDownloadFile(content, fileName, type) {
        const blob = new Blob([content], { type });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        this.showNotification('Download started!');
    },

    _handlePaste(e) {
        e.preventDefault();
        const text = (e.clipboardData || window.clipboardData).getData('text');
        this._insertPlainText(text);
        setTimeout(() => this._validateInput(), 0);
    },

    _insertPlainText(text) {
        this.elements['json-input'].innerHTML = '';
        const textNode = document.createTextNode(text);
        this.elements['json-input'].appendChild(textNode);
    },

    _setupDragAndDrop() {
        const container = this.elements['json-input-container'];
        const overlay = this.elements['drag-overlay'];

        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            container?.addEventListener(eventName, this._preventDefaults, false);
            document.body?.addEventListener(eventName, this._preventDefaults, false);
        });

        ['dragenter', 'dragover'].forEach(eventName => {
            container?.addEventListener(eventName, () => overlay.classList.remove('hidden'), false);
        });

        ['dragleave', 'drop'].forEach(eventName => {
            container?.addEventListener(eventName, () => overlay.classList.add('hidden'), false);
        });

        container?.addEventListener('drop', (e) => this._handleDrop(e), false);
    },

    _handleDrop(e) {
        const file = e.dataTransfer.files[0];
        if (!file?.name.endsWith(CONFIG.FILE_TYPES.VTT)) {
            this.showNotification('Please upload a VTT format file', 'error');
            return;
        }

        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const fileContent = event.target.result;
                this._insertPlainText(fileContent);
                if (this._validateInput()) {
                    this._handleConvert();
                }
            } catch (error) {
                this.showNotification(`Unable to read VTT file: ${error.message}`, 'error');
            }
        };
        reader.readAsText(file);
    },

    _preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    },

    _highlightJson(json, container) {
        const highlighted = JSON.stringify(json, null, 2)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, match => {
                let cls = 'text-blue-600'; // number
                if (/^"/.test(match)) {
                    cls = /:$/.test(match) ? 'text-gray-800 font-medium' : 'text-green-600';
                } else if (/true|false/.test(match)) {
                    cls = 'text-purple-600';
                } else if (/null/.test(match)) {
                    cls = 'text-gray-600';
                }
                return `<span class="${cls}">${match}</span>`;
            });

        container.innerHTML = highlighted;
    },

    _showSuccessEffects() {
        EffectsController.createFireworks();
        EffectsController.showCelebrationMessage();
    },

    showNotification(message, type = 'success') {
        const notification = this.elements['notification'];
        const notificationMessage = this.elements['notification-message'];

        notificationMessage.textContent = message;
        notification.classList.remove('hidden', 'bg-gray-800', 'bg-green-600', 'bg-red-600');
        
        notification.classList.add(type === 'success' ? 'bg-green-600' 
            : type === 'error' ? 'bg-red-600' 
            : 'bg-gray-800');

        notification.classList.add('fade-in');
        setTimeout(() => {
            notification.classList.add('hidden');
            notification.classList.remove('fade-in');
        }, CONFIG.ANIMATIONS.NOTIFICATION_DURATION);
    }
};

// Visual Effects Controller Module
const EffectsController = {
    createFireworks() {
        const fireworksCount = window.innerWidth < 768 ? 3 : 5;
        for (let i = 0; i < fireworksCount; i++) {
            this._createSingleFirework();
        }
    },

    _createSingleFirework() {
        const firework = document.createElement('div');
        firework.className = 'firework';
        document.body.appendChild(firework);

        const x = Math.random() * window.innerWidth;
        const y = Math.random() * (window.innerHeight * 0.6);
        firework.style.left = `${x}px`;
        firework.style.top = `${y}px`;

        const particleCount = Math.floor(Math.random() * 20) + 30;
        for (let i = 0; i < particleCount; i++) {
            this._createParticle(firework);
        }

        setTimeout(() => document.body.removeChild(firework), 1500);
    },

    _createParticle(container) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        const color = CONFIG.ANIMATIONS.FIREWORK_COLORS[
            Math.floor(Math.random() * CONFIG.ANIMATIONS.FIREWORK_COLORS.length)
        ];
        particle.style.backgroundColor = color;
        
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
    },

    showCelebrationMessage() {
        const celebration = CONFIG.ANIMATIONS.CELEBRATION_MESSAGES[
            Math.floor(Math.random() * CONFIG.ANIMATIONS.CELEBRATION_MESSAGES.length)
        ];
        
        const messageEl = document.createElement('div');
        messageEl.className = 'celebration-message';
        messageEl.innerHTML = `<span class="celebration-emoji">${celebration.emoji}</span>${celebration.message}`;
        document.body.appendChild(messageEl);
        setTimeout(() => document.body.removeChild(messageEl), 3000);
    }
};

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    UIController.initialize();
});