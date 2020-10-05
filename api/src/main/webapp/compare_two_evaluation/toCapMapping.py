import json
cap_files = ["gan2"] #, "mle", "gt"]
for cap_file in cap_files:
	caps = json.load(open(cap_file + ".json"))
	cap_mapping = {}
	for cap in caps:
		cap_mapping[cap["image_id"]] = cap["caption"]
	json.dump(cap_mapping, open(cap_file + "_mapping.json", "w"))


