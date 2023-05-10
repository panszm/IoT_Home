import sys, os
import bson
sys.path.append(os.path.dirname(os.path.abspath(__file__)))
import constants
import copy

def remap_all_id_fields_and_clear_empty(item: dict) -> dict:
    if item is None or len(item.keys()) == 0:
        return None
    item_copy = copy.deepcopy(item)
    for field_key in item_copy:
        if field_key != constants.ID_KEY and type(item[field_key]) == bson.objectid.ObjectId:
            item[field_key] = str(item[field_key])
        elif type(item[field_key]) == list:
            result = remap_all_id_fields_and_clear_empty_list(item[field_key])
            if result is None:
                del item[field_key]
            else:
                item[field_key] = result
        elif type(item[field_key]) == dict:
            result = remap_all_id_fields_and_clear_empty(item[field_key])
            if result is None:
                del item[field_key]
            else:
                item[field_key] = result
    if constants.ID_KEY in item.keys():
        item[constants.ID_KEY_TRANSFORMED] = str(item[constants.ID_KEY])
        del item[constants.ID_KEY]
    return item

def remap_all_id_fields_and_clear_empty_list(item_list: list) -> list:
    item_list = list(filter(lambda item: constants.ID_KEY in item.keys(), item_list))
    if(len(item_list) and "name" in item_list[0]):
        item_list.sort(key=lambda item: item["name"])
    if len(item_list):
        for item in item_list:
            item_copy = copy.deepcopy(item)
            for field_key in item_copy:
                if field_key != constants.ID_KEY and type(item[field_key]) == bson.objectid.ObjectId:
                    item[field_key] = str(item[field_key])
                elif type(item[field_key]) == list:
                    result = remap_all_id_fields_and_clear_empty_list(item[field_key])
                    if result is None:
                        del item[field_key]
                    else:
                        item[field_key] = result
                elif type(item[field_key]) == dict:
                    result = remap_all_id_fields_and_clear_empty(item[field_key])
                    if result is None:
                        del item[field_key]
                    else:
                        item[field_key] = result
        for item in item_list:
            item[constants.ID_KEY_TRANSFORMED] = str(item[constants.ID_KEY])
            del item[constants.ID_KEY]
    return item_list