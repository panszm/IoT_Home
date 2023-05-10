from pymongo import MongoClient
import sys, os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))
from constants import *

def get_database():
   client = MongoClient(DATABASE_CONNECTION_STRING) 
   return client[DATABASE_NAME]