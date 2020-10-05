import json

imgs = json.load(open("coco_val2014.json"))["images"]
img_name = []
img_id = []
for img in imgs:
	img_name.append(img["file_name"])
	img_id.append(img["id"])

json.dump(img_name, open("img_names.json", "w"))
json.dump(img_id, open("img_ids.json", "w"))
	
