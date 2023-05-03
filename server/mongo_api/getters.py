from pymongo import MongoClient
import sys, os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))
from constants import *
import database_utils

def get_database():
   client = MongoClient(DATABASE_CONNECTION_STRING) 
   return client[DATABASE_NAME]

def get_all_locations():
   locations = get_database()[COLLECTION_LOCATIONS].find()
   return database_utils.remap_all_id_fields(list(locations))

def get_all_rooms():
   rooms = get_database()[COLLECTION_ROOMS].find()
   return database_utils.remap_all_id_fields(list(rooms))

if __name__ == "__main__":   
   dbname = get_all_locations()
   print(dbname)