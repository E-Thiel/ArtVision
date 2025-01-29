### Component Overview
- **Cart.jsx**: Manages cart state and interactions.
- **Filters.jsx**: Implements dynamic product filtering and sorting logic.
- **Header.jsx**: This is a temporary file for tests.
- **Product.jsx**: Displays individual product data, including images and details.

### Page Structure
- **Home.jsx**: Central hub for displaying product lists and applying filters.
- **ProductDetail.jsx**: Provides detailed information about a specific product

### Utilities
- **fetch.js**: Contains functions for API interactions, ensuring consistency across requests.

### Authorisation
- **register.jsx**: Registration form component, creates an account. Users fill in the form, and as long as they fulfill the obligatory fields and password requirements the data is sent to the backend. If the username/email does not exist already, a new account with information is created. 
**Possible improvements include**
* making it possible to include only a valid telephone number/address in their fields, 
* making the e-mail regex more flexible (such as being able to have multiple '.' in the email address, such as j.smith@email.co.uk which currently is not accepted)
* adding an email confirmation to the user after submitting

- **sign-in.jsx**: Signin form component. Once the user is correctly logged in, it generates a token that is stored as a cookie or in the local storage (as you prefer) and redirects to the homepage.

Both register.jsx and sign-in.jsx share multiple CSS properties, and use the registersignin.css stylesheet