FROM python:3.7-slim

RUN python -m pip install --upgrade pip

RUN mkdir /srv/server
WORKDIR /srv/server

COPY requirements.txt /srv/server/requirements.txt

RUN python -m pip install -r requirements.txt

COPY ./src .
