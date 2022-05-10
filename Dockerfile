FROM node:lts

WORKDIR /app

COPY . .

RUN /usr/local/bin/yarn install

# Setting build access to github repo
ARG GITHUB_TOKEN
ENV GH_TKN $GITHUB_TOKEN

RUN /usr/local/bin/yarn build

ENV PORT 8080
ENV HOST 0.0.0.0

USER node

ENTRYPOINT ["/usr/local/bin/yarn", "start"]



