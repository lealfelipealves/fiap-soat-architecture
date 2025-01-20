FROM node:22-alpine as builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npx prisma generate

RUN npx prisma db seed

RUN npm run build

EXPOSE 3333

CMD ["npm", "run", "start:prod"]
