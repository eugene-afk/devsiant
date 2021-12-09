FROM python:3.9-alpine
WORKDIR /code/server
RUN apk add --no-cache --virtual .tmp zlib-dev musl-dev linux-headers libffi-dev py3-cffi openssl-dev cargo python3-dev g++
COPY requirements.txt requirements.txt
COPY usgi.py usgi.py
COPY .env .env
COPY db db
RUN pip install -r requirements.txt
RUN apk del .tmp
EXPOSE 5000
COPY ./src ./src
CMD ["python3", "usgi.py"]