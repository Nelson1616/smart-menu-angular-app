FROM node:20.9.0-alpine3.17

WORKDIR /src

COPY ./src ./ 

# To keep container active for testing
# ENTRYPOINT ["tail", "-f", "/dev/null"]