from pydantic import BaseModel

class Location(BaseModel):
    id: str
    name: str

class Room(BaseModel):
    id: str
    location_id: str
    name: str