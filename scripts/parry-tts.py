#!/usr/bin/env python

from gtts import gTTS

parries = {
    1: "Prime",
    2: "Seconde",
    3: "Tierce",
    4: "Quarte",
    5: "Quinte",
    6: "Sixte",
    7: "Septime",
    8: "Octave",
    9: "Neuvieme",
}

other = {
    1: "Practice Started",
    2: "Practice Complete",
    3: "Practice Stopped",
    4: "Click on 'Start Practice' To Begin Practicing",
}

for k, v in parries.items():
    language = 'fr'
    obj = gTTS(text=v, lang=language, slow=False)
    obj.save("./assets/audio/parries/" + str(k) + "-" + v + ".mp3")

for k, v in other.items():
    language = 'en'
    obj = gTTS(text=v, lang=language, slow=False)
    obj.save("./assets/audio/" + v + ".mp3")
