FROM node:16-alpine3.16 AS builder

WORKDIR /app
COPY ./package.json ./yarn.lock ./
RUN yarn install --frozen-lockfile

COPY ./ ./
RUN GENERATE_SOURCEMAP=false yarn build


FROM nginx:alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY ./nginx/ /app/
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /app/build .
RUN rm -rf ./**/*.map

EXPOSE 80
ENTRYPOINT ["/app/docker-entrypoint.sh"]
