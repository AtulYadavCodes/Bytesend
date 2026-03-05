FROM node:20-alpine
WORKDIR /app

# Install dependencies first (faster builds)
COPY package*.json ./
RUN npm install --production

# Copy the rest of your code
COPY . .

# Ensure the upload folder exists inside the container
RUN mkdir -p uploads

EXPOSE 3000
CMD ["node", "index.js"]
