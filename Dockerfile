FROM python:3.10-alpine

WORKDIR /code

COPY ./requirements.txt /code/requirements.txt

RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt

COPY ./src /code

# this enable output from python code
ENV PYTHONUNBUFFERED=1

CMD uvicorn app:app --host 0.0.0.0 --port $PORT