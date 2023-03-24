#! /usr/bin/env python
from app import app, Config
from app import Mqtt 



# Initialize  MQTT client below
# Replace topic with the subtopic your CCS is publishing to
Client = Mqtt("620151519","www.yanacreations.com",1883)


if __name__ == "__main__":
    app.run(debug=Config.FLASK_DEBUG, host=Config.FLASK_RUN_HOST, port=Config.FLASK_RUN_PORT)
