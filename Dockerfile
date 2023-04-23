FROM python:3.10-alpine

WORKDIR /code

COPY ./requirements.txt /code/requirements.txt

RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt

COPY ./src /code/src

# this enable output from python code
ENV PYTHONUNBUFFERED=1

CMD uvicorn src.app:app --host 0.0.0.0 --port $PORT