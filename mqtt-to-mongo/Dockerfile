FROM python:3.14

WORKDIR /CODE

COPY requirements.txt .

RUN pip install -r requirements.txt

COPY src/ .

CMD [ "python", "-u", "./mqtt-to-mongo.py"]