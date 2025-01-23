FROM node:18-alpine

WORKDIR /usr/src/app

COPY package*.json ./

# Install dependencies
RUN npm install

COPY . .

# Build the application
RUN npm run build

ENV PORT=3000
EXPOSE 3000

# Update path to point to main.js in the dist root
CMD ["node", "dist/main.js"]
