FROM python:3.9-alpine

WORKDIR /code

RUN mkdir /code/data

COPY ./src /code

RUN apk add --no-cache bash
RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt

# this enable output from python code
ENV PYTHONUNBUFFERED=1
ENV SHELL=/bin/bash

CMD ["bash", "-c", "uvicorn main:app --host 0.0.0.0 --port $PORT"]
# CMD ["tail", "-f", "/dev/null"]
