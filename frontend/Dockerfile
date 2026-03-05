FROM node:20-alpine
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
# Build the production files
RUN npm run build

# Start the frontend server
EXPOSE 3000
CMD ["npm", "start"]