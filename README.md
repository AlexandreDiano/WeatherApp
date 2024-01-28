---

# Weather App

This is a weather forecast application developed in React with TypeScript, utilizing the [api.met.no](https://api.met.no/) API for weather information and [OpenCage](https://opencagedata.com/) for obtaining user coordinates. The project also makes use of Tailwind CSS for styles and includes the "ShadCn" library for enhanced UI components.

## Features

- **Weather Forecast:** Get detailed information about the current weather and future forecasts.
- **Automatic Location:** The app uses geolocation to automatically fetch weather conditions for your area.

## How to Use

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **API Configuration:**
   - Obtain API keys from [api.met.no](https://api.met.no/) and [OpenCage](https://opencagedata.com/).
   - Create a `.env` file in the project root and add your keys as follows:
     ```env
     OPENCAGE_API_KEY= YourOpenCageApiKey
     ```

3. **Run the App:**
   ```bash
   npm start
   ```

4. **Access the App:**
   Open your browser and go to `http://localhost:5173`.

## Additional Configurations

- **Style Customization:**
  This project uses Tailwind CSS for styles. Customize the `tailwind.config.js` file as needed.

- **UI:**
  The application includes ShadCn for enhanced UI components. Refer to the ShadCn documentation for customization options.

## License

This project is licensed under the [MIT License](LICENSE).

---
