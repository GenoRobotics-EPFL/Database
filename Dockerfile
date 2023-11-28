FROM python:3.9-alpine

WORKDIR /code

COPY ./requirements.txt /code/requirements.txt

RUN apk add --no-cache bash
RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt

RUN mkdir /code/data

COPY ./src /code

# this enable output from python code
ENV PYTHONUNBUFFERED=1
ENV SHELL=/bin/bash

CMD ["bash", "-c", "uvicorn app:app --host 0.0.0.0 --port $PORT"]
