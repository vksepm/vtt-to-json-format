# Project Structure Documentation

## Directory Structure

```
vtt-to-json-format/
├── index.html          # Main HTML file containing the application interface
├── script.js          # Core JavaScript implementation
├── styles.css         # Application styles and animations
├── README.md         # Project overview and usage instructions
└── docs/             # Documentation directory
    ├── IMPLEMENTATION.md    # Technical implementation details
    └── PROJECT_STRUCTURE.md # Project structure documentation
```

## Files Overview

### 1. index.html
- **Purpose**: Main entry point of the application
- **Key Components**:
  - Application header with title
  - Input section for VTT content
  - Conversion controls
  - Output sections for JSON and plain text
  - Notification system
- **Dependencies**:
  - TailwindCSS (via CDN)
  - Font Awesome icons
  - Google Fonts (Noto Sans TC)
  - Local CSS and JavaScript files

### 2. script.js
- **Purpose**: Core application logic
- **Module Structure**:
  1. **Constants and Configuration**
     - Animation configurations
     - File type definitions
     - Example VTT content
  
  2. **VTTParser Module**
     - VTT parsing logic
     - JSON conversion functions
     - Input validation
  
  3. **UIController Module**
     - DOM element management
     - Event handlers
     - Input/Output management
     - File operations
  
  4. **EffectsController Module**
     - Visual effects management
     - Animation controllers
     - Celebration effects

### 3. styles.css
- **Purpose**: Application styling and animations
- **Key Sections**:
  1. **Base Styles**
     - Typography
     - Layout foundations
     - Color schemes
  
  2. **Component Styles**
     - Editor styling
     - Button designs
     - Input/Output containers
  
  3. **Animations**
     - Transition effects
     - Particle animations
     - Notification animations
  
  4. **Responsive Design**
     - Mobile-first approach
     - Breakpoint adaptations
     - Flexible layouts

### 4. Documentation Files

#### README.md
- Project overview
- Feature list
- Installation instructions
- Usage examples
- License information

#### docs/IMPLEMENTATION.md
- Technical implementation details
- Architecture overview
- Module specifications
- Data structures
- Algorithms
- Error handling
- State management

#### docs/PROJECT_STRUCTURE.md (this file)
- Directory structure
- File organization
- Component relationships
- Dependency management

## Dependencies

### External Libraries
1. **TailwindCSS**
   - Purpose: Utility-first CSS framework
   - Integration: Via CDN
   - Usage: Responsive design and styling

2. **Font Awesome**
   - Purpose: Icon library
   - Integration: Via CDN
   - Usage: UI elements and indicators

3. **Google Fonts**
   - Purpose: Typography
   - Font: Noto Sans TC
   - Weights: 300, 400, 500, 700

## Module Relationships

```
                ┌─────────────────┐
                │    index.html   │
                └────────┬────────┘
                        │
                        ▼
                ┌─────────────────┐
                │    script.js    │
                └────────┬────────┘
                        │
        ┌───────────────────────────┐
        ▼               ▼           ▼
┌──────────────┐ ┌──────────┐ ┌────────────────┐
│  VTTParser   │ │    UI    │ │    Effects     │
│   Module     │ │ Controller│ │   Controller   │
└──────────────┘ └──────────┘ └────────────────┘
        │              │              │
        └──────────────┴──────────────┘
                      │
                      ▼
               ┌────────────┐
               │ styles.css │
               └────────────┘
```

## Build and Development

### Development Setup
1. Clone the repository
2. No build process required
3. Serve files through a web server
4. Open index.html in a browser

### File Organization Principles
1. **Separation of Concerns**
   - HTML for structure
   - CSS for presentation
   - JavaScript for behavior

2. **Modular Architecture**
   - Independent modules
   - Clear responsibilities
   - Minimal coupling

3. **Documentation Organization**
   - User-facing documentation in README
   - Technical details in docs/
   - Inline code comments for specifics

## Future Structure Considerations

### Potential Enhancements
1. **Build System Integration**
   - Package manager (npm/yarn)
   - Module bundler
   - CSS preprocessing

2. **Testing Infrastructure**
   - Test directory
   - Test configurations
   - CI/CD setup

3. **Asset Management**
   - Images directory
   - Fonts directory
   - Static resources

4. **Development Tools**
   - ESLint configuration
   - Prettier setup
   - EditorConfig

### Scalability Considerations
1. **Component Organization**
   - Separate component directories
   - Reusable component library
   - Style modules

2. **State Management**
   - Dedicated state management
   - Action/reducer pattern
   - Local storage integration

3. **API Integration**
   - API client directory
   - Service layer
   - Request/response handlers