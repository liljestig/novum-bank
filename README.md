# Novum Bank
Developed using Visual Studio Code for Windows, learning about creating a simple online banking web application based on the MERN stack.
## How to install
Clone the repository and change directory to the backend root directory, then execute the following command to install the dependencies:

npm install

Create a textfile named .env in the same directory and add the following lines:

PORT=<port>

MONGO_URI=<MongoDB connection string>

SECRET=<JWT signing secret>

Start the backend server by executing the following command:

npm start

Change to the frontend root directory, then execute the following command to install the dependencies:

npm install

Create a textfile named .env in the same directory and add the following lines:

REACT_APP_BACKEND_HOST=<backend-hostname>

REACT_APP_BACKEND_PORT=<backend-port>

Start the frontend server by executing the following command:

npm start

## Usage
Web browse to http://localhost:3000/ in a web browser of choice and enjoy.
## Roadmap
Add support for OAuth 2.0 authentication.
## License
MIT License

Copyright (c) 2023 Dan Liljestig

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.