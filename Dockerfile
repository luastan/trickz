FROM node:lts

WORKDIR /app

COPY . .

RUN /usr/local/bin/yarn install

# Setting build access to github repo
ARG GH_TOKEN
ENV GH_TKN $GH_TOKEN


RUN /usr/local/bin/yarn build


USER node

ENV PORT 8080
ENV HOST 0.0.0.0


ENTRYPOINT ["/usr/local/bin/yarn", "start"]



