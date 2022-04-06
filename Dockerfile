FROM ubuntu:18.04

ARG DEBIAN_FRONTEND=noninteractive

RUN apt-get update && apt-get install -yq git curl && \
    apt-get install --no-install-recommends -yq make cmake gfortran libcoarrays-dev libopenmpi-dev open-coarrays-bin python3 python3-setuptools python3-pip && \
    pip3 install git+https://github.com/wavebitscientific/ndbc && \
    apt-get clean -q && \
    mkdir -p /weather-buoys && \
    rm -rf /var/lib/apt/lists/*

COPY Makefile CMakeLists.txt /weather-buoys/
COPY data /weather-buoys/data
COPY src /weather-buoys/src

WORKDIR /weather-buoys/

RUN make
