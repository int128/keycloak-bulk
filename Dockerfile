FROM node:9 AS frontend
ADD frontend /frontend
WORKDIR /frontend
RUN ["npm", "install"]
RUN ["npm", "run", "build"]

FROM node:9
ADD apiserver /apiserver
COPY --from=frontend /frontend/build /apiserver/static
WORKDIR /apiserver
ENV NODE_ENV production
RUN ["npm", "install"]
CMD ["npm", "start"]
