# Benchmark Building Solutions - Next.js multipage site

This template is built with **Next.js** and **Tailwind CSS** to create a modern, professional site for showcasing construction, renovation, or building solutions services. It features a custom pre-loader with a color-filling logo animation and a sticky WhatsApp button for direct client communication.

**Demo (if deployed):** [(https://www.bbsltd.co.ke/)]

---

## Features

- **Next.js** app router with **TypeScript** for a modern and type-safe development experience.
- **Tailwind CSS** v3 for rapid and customizable styling.
- **Pre-loader** with a unique color-filling logo animation for an engaging initial impression.
- **Sticky WhatsApp Button** for direct and easy communication with your audience.
- Responsive design ensuring a great experience on all devices.
- Organized component structure for easy modification and extension.
- Utilizes Next.js features like image optimization (`next/image`).
- Includes a basic footer with copyright information and social links.

---

## Getting Started (Using as a Template)

This guide will help you use this project as a starting point for your own landing page.

### Prerequisites

Ensure you have the following installed on your system:

- **Node.js**: Version 18 or later ([https://nodejs.org/](https://nodejs.org/))
- **npm**: Version 8 or later (comes bundled with Node.js)
- **A Code Editor**: [VS Code](https://code.visualstudio.com/) is highly recommended for its excellent TypeScript support and extensions.

### Steps to Use as a Template

1.  **Clone the Repository (if you have it):** If you've downloaded the code, proceed to the next step. If you're starting fresh from a remote repository (like a GitHub repo you own or have access to), clone it to your local machine using Git:

    ```bash
    git clone <repository-url>
    cd <project-directory>
    ```

2.  **Install Dependencies:** Navigate to the project directory in your terminal and install the necessary packages:

    ```bash
    npm install
    ```

3.  **Customize Site Information:**

    - Open the `/src/data/siteDetails.ts` file.
    - Modify the `siteName`, `siteLogomark` (update the path to your logo image in `public/images/`), and any other relevant site-wide information.

4.  **Update Content:**

    - Explore the `/src/data` directory. You'll find files like `hero.ts`, `benefits.ts`, `cta.ts`, `podcast.ts`, `faq.ts`, `stats.ts`, and `footer.ts`.
    - **Replace the placeholder content** in these files with your own text, images, links, and data. Pay close attention to the structure of the data (e.g., the array of benefits objects, the episodes array in the podcast data).
    - Update image paths in these data files to point to your images in the `public/images` directory.

5.  **Replace Images:**

    - Go to the `public/images` folder.
    - **Replace the existing images** with your own assets. Ensure that the file names in your data files (`/src/data`) match the names of your image files.
    - Update the `favicon.ico` in the `/public` directory with your own favicon.

6.  **Customize Colors and Styling:**

    - Open the `globals.css` file in the root directory.
    - **Modify the Tailwind CSS directives** to change the primary, secondary, accent colors, and any other global styles to match your brand. You can also add or extend Tailwind classes in this file.
    - The pre-loader and WhatsApp button styles are also defined in `globals.css`. Adjust the colors, animation durations, and positioning as needed.

7.  **Implement Your Own Loading Logic (Pre-loader):**

    - The `Preloader` component (`/src/components/Preloader.tsx`) currently uses a `setTimeout` to simulate loading.
    - **Replace this simulation with your actual loading checks.** For example, you might want the pre-loader to disappear after your initial data fetching is complete.

8.  **Update WhatsApp Number:**

    - Open the `/src/components/WhatsAppButton.tsx` file.
    - **Change the `phoneNumber` variable** to your actual WhatsApp number, including the country code.

9.  **Run the Development Server:**

    ```bash
    npm run dev
    ```

    Open your browser to `http://localhost:3000` to see your customized landing page.

10. **Build and Deploy:** Once you're happy with your changes, you can build your project for production:

    ```bash
    npm run build
    ```

    You can then deploy the generated `out` directory (or configure your hosting provider to deploy the Next.js project directly). Vercel ([https://vercel.com/](https://vercel.com/)) offers excellent support for Next.js deployments.

---

## Contributing (to this template)

If you have improvements or find issues with this template, feel free to contribute!

1.  **Fork the Repository**.
2.  **Create a new branch** for your feature or fix.
3.  **Make your changes** and ensure they are well-tested.
4.  **Submit a Pull Request** with a clear description of your changes.

---

## License

This project is open-source and available under the MIT License. See the `LICENSE` file for more details.
