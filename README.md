# Web Components Design System

## Disclaimer

Please note that this project is currently a work in progress and not yet completed. It is actively being developed, and as such, features, components, and documentation are subject to change. This project may not be fully functional or stable until its development reaches a more mature stage. Users and contributors should be aware that using this design system in its current state might involve encountering incomplete features or potential issues. Feedback and contributions are welcome to help drive the project towards completion.

## Overview

[Showcase](https://crypticlon.github.io/web-components/) 


This project focuses on creating a versatile and easily adaptable design system using Web Components. The core philosophy of this design system is to enable rapid customization across any project by modifying just a few CSS variables. Each component in this system utilizes these shared theme CSS variables, ensuring a consistent look and feel while offering the flexibility to tailor the design to different needs and branding guidelines.

## Features

- **Reusable Components**: A collection of Web Components that can be reused across various web projects.
- **Customizable Design**: A central theme file with CSS variables allows for easy customization of the entire design system.
- **Consistent Look and Feel**: Uniformity across components ensures a cohesive user interface.
- **Lightweight and Efficient**: Optimized for performance and speed, enhancing the user experience.
- **Easy Integration**: Designed to be easily integrated into existing projects with minimal setup.

## Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) installed on your system to use the project's build tools and dependencies.

### Installation

1. **Clone the Repository**

   ```sh
   git clone https://github.com/crypticlon/web-components.git
   cd web-components
   ```

2. **Install Dependencies**

   ```sh
   npm install
   ```

3. **Run the Development Server**

   ```sh
   npm run dev
   ```

   This will start a local server, usually on `http://localhost:3000`.

4. **Build for Production**

   ```sh
   npm run build
   ```

   This command generates the `dist` directory with production-ready files.

### Customizing the Design

To customize the design system:

1. Open the `src/theme.css` file.
2. Modify the CSS variables to suit your project's design requirements.
3. The changes will be reflected across all components that use these variables.

### Components

#### s-button
- **Description**: The `s-button` component is a versatile button element designed for various user interactions. It's customizable to fit different UI contexts, with support for multiple color themes and sizes.
- **Usage**: Ideal for actions like form submissions, navigation, and interactive elements.

#### s-card
- **Description**: The `s-card` component serves as a container for content such as text, images, and actions. It provides a flexible and efficient way to display information blocks with a clean, card-based design.
- **Usage**: Useful for displaying product information, user profiles, or summary blocks.

#### s-menubar
- **Description**: The `s-menubar` component is a navigation bar that provides a responsive menu for website navigation. It supports nesting, dropdowns, and is fully responsive.
- **Usage**: Perfect for site-wide navigation, including top-level links and hierarchical menus.

#### s-menuitem
- **Description**: The `s-menuitem` component works in conjunction with `s-menubar` to create individual menu items. It allows for easy customization and can be used to create both parent and child menu items.
- **Usage**: Use to define each navigational link within `s-menubar`.

#### s-tabs
- **Description**: The `s-tabs` component provides an efficient way to organize content into multiple tabs. It enables easy switching between different content sections without leaving the page.
- **Usage**: Ideal for organizing related content into separate tabs for a more streamlined user experience.

#### s-tab
- **Description**: The `s-tab` component represents an individual tab within the `s-tabs` component. Each `s-tab` can contain its own content and is associated with a tab header.
- **Usage**: Used to define the content and label for each tab in `s-tabs`.

#### s-table
- **Description**: The `s-table` component is a dynamic table element for displaying data in rows and columns. It supports customization and is designed to handle various types of data input efficiently.
- **Usage**: Suitable for displaying structured data like financial figures, statistics, or lists in a clear and organized manner.

#### s-modal
- Description: The s-modal component is a customizable modal dialog box, perfect for displaying additional content, alerts, or forms on top of the main content. It supports easy opening and closing mechanisms and can be styled to match the look and feel of your application.

- Usage: Ideal for user interactions that require focus, like form submissions, confirmations, or detailed content viewing.

#### s-sidemenu
- Description: The s-sidemenu component is a vertical, side navigation menu ideal for dashboard layouts and admin interfaces. It provides a sleek, space-efficient way to organize and access different sections of a website.

- Usage: Best suited for applications with complex navigation requirements, such as admin panels, documentation sites, or web applications with multiple user settings.

#### s-input
- Description: The s-input component is a stylized input field that supports various types, including text, password, email, and number. It offers enhanced visual appeal and consistent styling across different form elements.

- Usage: Useful for creating forms, search bars, login fields, and other input-driven interfaces.

#### s-messages
- Description: The s-messages component allows for displaying overlay messages in a non-intrusive manner. It's great for feedback on user actions, such as successful form submissions, warnings, or error messages.

- Usage: Can be used across your application to provide timely and contextual feedback to users, enhancing the overall user experience.

#### s-checkbox
- Description: The s-checkbox component is a custom, stylized checkbox input. It provides a modern look and feel while retaining all standard functionalities of a traditional checkbox.

- Usage: Ideal for forms, settings, and anywhere you need users to make a binary choice.

#### s-code
- Description: The s-code component is designed for displaying blocks of code with syntax highlighting and proper formatting. It helps in making code snippets more readable and visually appealing.

- Usage: Great for documentation, tutorials, or any application where displaying formatted code is necessary.

#### s-select
- Description: The s-select component is a custom dropdown select element that mimics the functionality of the standard HTML select tag. It comes with enhanced styling and is fully customizable to fit any application's design system.

- Usage: Perfect for forms, filters, and any interface where users need to choose from a list of options.

### Integration and Usage
The components are designed to be straightforward to integrate into any project. Simply import the necessary components into your project, and they're ready to use. They can also be easily extended or modified to fit specific requirements.

