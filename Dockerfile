# 1️⃣ Use lightweight Node image
FROM node:18-alpine

# 2️⃣ Set working directory inside container
WORKDIR /app

# 3️⃣ Copy package files first (Docker cache optimization)
COPY package*.json ./

# 4️⃣ Install dependencies
RUN npm install

# 5️⃣ Copy entire backend source code
COPY . .

# 6️⃣ Expose backend port
EXPOSE 5000

# 7️⃣ Start backend (production-safe)
CMD ["npm", "start"]
