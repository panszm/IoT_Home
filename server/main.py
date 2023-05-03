from fastapi import FastAPI
import mongo_api.getters as mongo_api
import mongo_api.models as models

app = FastAPI()

@app.get("/")
def hello() -> object:
    return {"Hello": "World"}

@app.get("/locations")
def get_all_locations() -> list[models.Location]:
    return mongo_api.get_all_locations()

@app.get("/rooms")
def get_all_rooms() -> list[models.Room]:
    return mongo_api.get_all_rooms()