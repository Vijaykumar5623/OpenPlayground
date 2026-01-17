# Multi-Step Form Wizard

<<<<<<< HEAD
A modern, interactive multi-step form wizard with progress indicators and comprehensive validation at each step.

## Features

- **3-Step Form Process**: Personal Information → Address Information → Confirmation
- **Progress Indicators**: Visual progress bar and step indicators showing current progress
- **Form Validation**: Real-time validation with custom error messages for each field
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Modern UI**: Clean, gradient-based design with smooth animations
- **Keyboard Navigation**: Navigate through steps using Enter key
- **Accessibility**: Proper form labels and ARIA attributes

## Form Steps

### Step 1: Personal Information
- First Name (required, min 2 characters)
- Last Name (required, min 2 characters)
- Email (required, valid email format)
- Phone Number (optional, valid phone format)

### Step 2: Address Information
- Street Address (required)
- City (required)
- State/Province (required)
- ZIP/Postal Code (required, valid format)
- Country (required, dropdown selection)

### Step 3: Confirmation
- Review all entered information
- Terms and conditions agreement (required)
- Final submission
=======
A multi-step form wizard with progress indicators and validation at each step.

## Features

- 4-step form process
- Progress indicators showing current step
- Validation for required fields
- Navigation between steps
- Summary confirmation on final step

## Steps

1. **Personal Information**: First name, last name, email
2. **Address Information**: Address, city, zip code
3. **Preferences**: Favorite color, newsletter subscription
4. **Confirmation**: Review information and agree to terms
>>>>>>> 25206b84c2d90aadb78782d990d9ae5198277e92

## Technologies Used

- HTML5
<<<<<<< HEAD
- CSS3 (with CSS Grid and Flexbox)
- Vanilla JavaScript (ES6+)

## How to Use

1. Open `index.html` in a modern web browser
2. Fill out the form step by step
3. Use "Next" and "Previous" buttons to navigate between steps
4. Validation will prevent progression if required fields are invalid
5. Review your information on the final step and submit

## Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## File Structure

```
Multi-Step-Form-Wizard/
├── index.html      # Main HTML file
├── style.css       # CSS styles
├── script.js       # JavaScript functionality
└── README.md       # This file
```

## Customization

The form can be easily customized by:
- Modifying the HTML structure in `index.html`
- Updating styles in `style.css`
- Adding/removing validation rules in `script.js`
- Changing the number of steps by updating the JavaScript logic

## Validation Rules

- **Required Fields**: Marked with asterisk (*)
- **Email**: Must be in valid email format
- **Phone**: Optional but must be valid phone number format if provided
- **ZIP Code**: Must be 5 digits or 5+4 format (e.g., 12345 or 12345-6789)
- **Names**: Minimum 2 characters
- **Country**: Must be selected from dropdown

## Contributing

Feel free to contribute improvements, bug fixes, or additional features to this project.
=======
- CSS3
- JavaScript (ES6+)

## How to Use

1. Open `index.html` in a web browser
2. Fill out each step of the form
3. Use Next/Previous buttons to navigate
4. Review information on the final step
5. Submit the form

## Validation

- All required fields must be filled
- Email must be in valid format
- Terms must be agreed to on final step
>>>>>>> 25206b84c2d90aadb78782d990d9ae5198277e92
