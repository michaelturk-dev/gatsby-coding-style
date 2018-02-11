FROM node:12-alpine as base

WORKDIR /app

ARG NPMRC=.npmrc

COPY ${NPMRC} .npmrc

COPY package.json yarn.lock ./

RUN ["yarn", "install", "--frozen-lockfile"]

COPY . .

FROM base as build

WORKDIR /app

COPY --from=base /app /app

RUN ["yarn", "build"]

FROM build as prod

WORKDIR /app

COPY --from=build /app/.next /app
ENV NODE_ENV=production
ENV PORT=3000
EXPOSE 3000 3000
CMD ["yarn", "start"]
