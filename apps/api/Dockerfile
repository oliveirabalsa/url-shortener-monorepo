FROM node:22-alpine

WORKDIR /usr/src/app

COPY package.json ./

RUN npm install

COPY . .

RUN npx prisma db push

RUN npx prisma generate

EXPOSE 3000

CMD ["npm", "run", "start"]