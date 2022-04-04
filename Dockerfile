FROM: ubuntu:18.04

ARG DEBIAN_FRONTEND=noninteractive

RUN apt-get update && apt-get install -yq git curl && \
    apt-get install --no-install-recommends -yq make cmake gfortran libcoarrays-dev libopenmpi-dev open-coarrays-bin nodejs npm python3 python3-setuptools python3-pip && \
    pip3 install git+https://github.com/wavebitscientific/ndbc && \
    apt-get clean -q && \
    rm -rf /var/lib/apt/lists/*

RUN make
RUN npm install
#CMD ["npm", start"]