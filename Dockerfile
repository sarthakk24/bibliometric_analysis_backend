FROM node

WORKDIR /app

COPY . /app 

RUN yarn

EXPOSE 80

CMD [ "yarn" , "dev" ]