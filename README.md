# Whiteboard - Doodle Documentation

## Overview

Doodle is a collaborative web application that enables users to draw on a shared canvas (whiteboard) in real-time. Users can create rooms and invite others to join, allowing for synchronous drawing sessions. Additionally, SketchBoard provides a chat box feature to facilitate communication among room members.

## Features

1. **Real-time Drawing**: Users can draw on a shared canvas simultaneously with other members of the room.
2. **Room Creation**: Users can create rooms and generate unique URLs to invite others to join.
3. **Joining Rooms**: Users can join existing rooms using the provided room URLs.
4. **Chat Box**: Each room includes a chat box where members can communicate via text messages.
5. **Socket Communication**: Utilizes Socket.IO for real-time communication between clients and the server.
6. **Canvas Interaction**: Implements HTML5 Canvas API for drawing functionality.
7. **Responsive Design**: The application is designed to be responsive, providing an optimal viewing experience across various devices and screen sizes.

## Technologies Used

- **React**: Frontend user interface is built using React for dynamic rendering and state management.
- **Vite**: Development server and bundler for the React application.
- **Node.js**: Backend server runtime environment for handling client-server communication and room management.
- **Express.js**: Web application framework for Node.js, used for routing and middleware management.
- **Socket.IO**: Library for enabling real-time, bidirectional communication between web clients and servers.
- **HTML5 Canvas API**: Used for creating the drawing canvas and implementing drawing functionalities.

## Link to live project

```bash
[https://doodle-sketch.netlify.app/]
```


## Installation

1. Clone the GitHub repository:

    ```bash
    git clone https://github.com/git-divyansh/whiteboard.git
    ```

2. Navigate to the project directory:

    ```bash
    cd whiteboard
    ```

3. Install dependencies for both frontend and backend:

    ```bash
    # Install frontend dependencies
    cd frontend
    npm install

    # Install backend dependencies
    cd ../backend
    npm install
    ```

//You can configure Backend PORT_NUMBER and REACT_APP_URL in .env as in fourth-step or you can either change at the backend. 

4. Configure environment variables:

    - Create a `.env` file in the `backend` directory.
    - Define the following environment variables:
        - `PORT`: Port number for the backend server.
        - `REACT_APP_BACKEND_URL`: URL of the backend server.

5. Start the backend server:

    ```bash
    cd Server
    npm start
    ```

6. Start the frontend development server:

    ```bash
    cd ../Client
    npm run dev
    ```

7. Access the application in your web browser at `http://localhost:5173`.

## Usage

1. **Room Creation**: 
   - Click on the "New Link" button to generate a new room.
   - Share the provided room URL with others to invite them to join.

2. **Joining a Room**:
   - Enter a room URL in the address bar or click on a shared room link to join.

3. **Drawing on Canvas**:
   - Use the mouse or touchscreen to draw on the canvas.
   - Drawing actions are synchronized in real-time with other room members.

4. **Chat Box**:
   - Type messages in the chat box to communicate with other room members.
   - Messages are displayed in real-time for all participants.

5. **Leaving a Room**:
   - Click on the "Leave Room" button to exit the current room.

## Contributing

Contributions to SketchBoard are welcome! To contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b [feature]/[new-feature]`).
3. Make your changes and commit them (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin [feature]/[new-feature]`).
5. Create a pull request.

## Acknowledgements

- This project was inspired by the need for collaborative drawing and communication tools in remote work environments.
- Special thanks to the creators and maintainers of React, Vite, Node.js, Express.js, Socket.IO, and other open-source libraries used in this project.

## Contact

For any inquiries or support, please contact [divyanshwork2022@gmail.com](mailto:divyanshwork2022@gmail.com).

---

This documentation provides a comprehensive guide to installing, using, and contributing to SketchBoard, a collaborative web application for drawing and communication.