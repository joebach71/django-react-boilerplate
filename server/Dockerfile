FROM python:3.7-slim

RUN python -m pip install --upgrade pip

RUN mkdir /srv/server
WORKDIR /srv/server

COPY ./server/requirements.txt requirements.txt
RUN python -m pip install -r requirements.txt

COPY ./server/src .
