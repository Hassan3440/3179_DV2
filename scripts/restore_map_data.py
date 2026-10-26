
from pathlib import Path
from collections import Counter
import csv
import json
import shutil

# Project locations
ROOT = Path(__file__).resolve().parent.parent
PROCESSED = ROOT / "data" / "processed"
PROCESSED.mkdir(parents=True, exist_ok=True)

print("Restoring Charts 5 and 6...\n")

# ==========================================
# CHART 6: RESTORE CAPAD 2024 DATA
# ==========================================

rows = [
    ["New South Wales", "NSW", 147.01607, -32.15027, 83650.6, 801150.1, 10.4, 2657],
    ["Victoria", "VIC", 144.28209, -36.8475, 40235.5, 227443.7, 17.7, 4709],
    ["Queensland", "QLD", 144.44097, -22.52417, 161831.5, 1729742.2, 9.4, 1230],
    ["South Australia", "SA", 135.76086, -30.0455, 299635.2, 984321.9, 30.4, 2085],
    ["Western Australia", "WA", 122.29172, -25.35033, 786742.2, 2527013.0, 31.1, 1888],
    ["Tasmania", "TAS", 146.57857, -42.00436, 29280.5, 68401.4, 42.8, 1721],
    ["Northern Territory", "NT", 133.36079, -19.4291, 332087.4, 1347791.6, 24.6, 84],
    ["Australian Capital Territory", "ACT", 149.00268, -35.4882, 1319.0, 2358.1, 55.9, 51]
]

headers = [
    "state",
    "abbr",
    "longitude",
    "latitude",
    "protected_km2",
    "land_km2",
    "protected_percent",
    "protected_areas"
]

chart6_path = PROCESSED / "chart06_protected_states.csv"

with chart6_path.open("w", newline="", encoding="utf-8") as f:
    writer = csv.writer(f)
    writer.writerow(headers)
    writer.writerows(rows)

print("Chart 6: CSV restored")
print("Records:", len(rows))
print("Saved to:", chart6_path, "\n")


# ==========================================
# CHART 5: FIND AND RESTORE HEXBIN GEOJSON
# ==========================================

chart5_path = PROCESSED / "chart05_hexbin.geojson"

# Look inside the project and Downloads
search_folders = [
    ROOT,
    Path.home() / "Downloads"
]

candidates = []

for folder in search_folders:
    if folder.exists():
        candidates.extend(folder.rglob("*hexbin*.geojson"))

expected_species = {
    "Swift Parrot",
    "Regent Honeyeater",
    "Orange-bellied Parrot"
}

valid_sources = []

for candidate in set(candidates):
    try:
        with candidate.open("r", encoding="utf-8") as f:
            data = json.load(f)

        features = data.get("features", [])

        species = {
            feature.get("properties", {}).get("species")
            for feature in features
        }

        if expected_species.issubset(species):
            valid_sources.append((candidate, len(features)))

    except (OSError, ValueError, TypeError):
        continue

if valid_sources:
    valid_sources.sort(key=lambda item: item[1], reverse=True)
    source, count = valid_sources[0]

    if source.resolve() != chart5_path.resolve():
        shutil.copyfile(source, chart5_path)

    with chart5_path.open("r", encoding="utf-8") as f:
        restored = json.load(f)

    counts = Counter(
        feature["properties"]["species"]
        for feature in restored["features"]
    )

    print("Chart 5: GeoJSON restored")
    print("Source:", source)
    print("Saved to:", chart5_path)
    print("Total hexagons:", count)

    for species, number in sorted(counts.items()):
        print(f"  {species}: {number} hexagons")

else:
    print("Chart 5: Original GeoJSON not found.")
    print("Find your original chart05_hexbin GeoJSON.")
    print("Copy it into:")
    print(chart5_path)

print("\nRestoration check completed.")
