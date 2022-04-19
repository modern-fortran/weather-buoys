FROM ubuntu:18.04

ARG DEBIAN_FRONTEND=noninteractive
ENV HOME="/root"
ENV NVM_DIR="/root/.nvm"
ENV LD_LIBRARY_PATH="${LD_LIBRARY_PATH}:/usr/lib:/usr/local/lib"

RUN apt-get update && apt-get install -yq git curl && \
    apt-get install --no-install-recommends -yq make cmake gfortran libcoarrays-dev libopenmpi-dev open-coarrays-bin python3 python3-setuptools python3-pip && \
    mkdir -p /weather-buoys && \
    apt-get clean -q && \
    rm -rf /var/lib/apt/lists/*
#    pip3 install git+https://github.com/wavebitscientific/ndbc && \

COPY Makefile CMakeLists.txt server.js start.sh /weather-buoys/
COPY data /weather-buoys/data
COPY src /weather-buoys/src
COPY server/* /weather-buoys/

COPY package.json /weather-buoys/

WORKDIR /weather-buoys/

RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash  
RUN export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")" && \
    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" && \
    nvm install --lts && \
    npm install
RUN make clean && make

ENTRYPOINT ["./start.sh"]