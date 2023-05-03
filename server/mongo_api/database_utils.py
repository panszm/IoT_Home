import sys, os
import bson
sys.path.append(os.path.dirname(os.path.abspath(__file__)))
import constants

def remap_all_id_fields(item_list: list) -> list:
    for item in item_list:
        for field_key in item:
            if field_key != constants.ID_KEY and type(item[field_key] == bson.objectid.ObjectId):
                item[field_key] = str(item[field_key])
    for item in item_list:
        item[constants.ID_KEY_TRANSFORMED] = str(item[constants.ID_KEY])
        print(type(item[constants.ID_KEY]))

    return item_list