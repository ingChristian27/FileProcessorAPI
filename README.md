## Description

This project is a backend API designed for processing files. It exposes endpoints to handle file uploads, transformations, and processing tasks.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/file-processor-api.git
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:

   - Create a `.env` file in the root directory and add the following variables:

   ```env
   NODE_ENV=development
   PORT=4000
   EXTERNAL_API_KEY=yourApiKeyHere
   # Origin for CORS requests, ensures that only authorized domains can access the API
   ORIGIN_CORS=http://localhost:3000
   ```

   - For production, create a .env.production file in the root directory with the following content:

   ```env
   NODE_ENV=production
   PORT=4000
   EXTERNAL_API_KEY=yourApiKeyHere
   # Origin for CORS requests, ensures that only authorized domains can access the API
   ORIGIN_CORS=http://localhost:3000
   ```

4. Run the app:

- To start the app in production mode, run:

  ```bash
  npm start
  ```

  This will automatically set NODE_ENV to production and start the application.
  The app should now be running on `http://localhost:4000`.

- to run the app in development mode, you can manually use:

```bash
  npm run dev
```

This will start the app with NODE_ENV set to development and use nodemon for automatic restarts during development.
The app should now be running on `http://localhost:4000`.

- To run the app using Docker, execute:

```bash
  docker-compose up -d --build
```

## Running Tests

To run the tests, use the following command:

```bash
npm test
```

## Usage

The API exposes the following endpoint:

- `GET /v1/files/data` - Get the file data by passing a query parameter `fileName`.

### Example:

```bash
curl -X GET "http://localhost:4000/v1/files/data?fileName=yourFileName"
```

## Description

- Node.js 14: JavaScript runtime used for the backend.
- Express: Web framework for building the API.
- dotenv: Loads environment variables from a `.env` file.
- Docker: Containerization platform to package the application.
- Axios: Promise-based HTTP client for making API requests.
- CORS: Middleware for enabling Cross-Origin Resource Sharing (CORS).
- Mocha: Testing framework for running tests.
- Chai: Assertion library used with Mocha for tests.
- Nodemon: Automatically restarts the server during development when file changes are detected.
- Prettier: Code formatter to maintain consistent code style.

## Contributing

1. Fork the repository.
2. Create your feature branch (`git checkout -b feature/feature-name`).
3. Commit your changes (`git commit -am 'Add feature'`).
4. Push to the branch (`git push origin feature/feature-name`).
5. Open a pull request.

## Error Handling with Proxy

The application uses a proxy to handle uncontrolled errors, decoupling the logic from the endpoints and Express. This approach offers greater flexibility and reusability of error-handling logic.

### Key Features:

- **Centralized Error Handling:** All errors are managed through the proxy, avoiding repetitive error-handling logic in each endpoint.
- **Decoupling Logic:** Business logic for endpoints remains clean and separated from error-handling code.
- **Reusability:** The same error-handling logic is applied across multiple parts of the system.

### How It Works:

1. The proxy captures any unhandled errors during request execution.
2. It processes the error and sends a structured response to the client.
3. Endpoints focus solely on their functionality, without worrying about error handling.

This approach improves maintainability and scalability of the application.

## Error Handling in Controlled Functions

In the application, business logic functions return objects with the structure `{response, error}`. This approach enables greater flexibility by allowing the function to decide whether to handle the error or continue with its operation.

### Key Features:

- **Structured Response:** Functions return an object with both `response` and `error` fields, providing clear feedback for decision-making.
- **Flexible Error Handling:** The function can choose to capture and handle the error or proceed with further operations.
- **Decoupling Business Logic:** This structure keeps business logic independent of the error-handling process, allowing for easier debugging and maintenance.

### How It Works:

1. Each function responsible for business logic returns an object:
   ```javascript
   { response: result, error: error }
   ```
2. The error field holds any captured error, while response contains the expected result.

3. The caller of the function can decide whether to address the error or continue processing based on the error field.

This pattern provides better control over how errors are managed and allows for more robust error handling strategies in different scenarios.

## Project Structure

The project follows a modular structure for better maintainability and scalability. Below is the directory layout:

### Description of Key Folders:

- **apis/**: Contains the business logic and API endpoints. Each module, like `files/`, houses the necessary API logic for handling specific functionality.
- **helpers/**: Holds utility functions and reusable code. The `http/` folder contains HTTP-related helpers, including the `proxyHTTPHandler.js` for managing errors and request handling.
- **routes/**: Manages the application's routing structure, where each endpoint is defined and linked to its respective API logic.
- **tests/**: Contains all test files to ensure the stability of the application.
- **config.js**: Configuration file that loads environment variables and app settings.
- **app.js**: The entry point of the application, where the main setup and initialization take place.

This modular structure ensures that the application remains organized and easy to extend as it grows.

## Contact

- Created by [Christian Dachiardi](https://github.com/ingChristian27)
- Feel free to reach out with any questions or feedback.
