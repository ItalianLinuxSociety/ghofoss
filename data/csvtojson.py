import csv
import json

# inserire il percorso
csvfile = r'World.csv'
jsonfile = r'World.json'
file_csv = open(csvfile, 'r')
#digitiamo i nomi del campo
fieldnames = ('Date','Area is','Sub Area is Country','Sub Area is: City','LPI SPECIFIC','Image url','Item title ENG','Item ENG','Item title ITA','Item ITA','Item title POR','Item POR','Item title DEU','Item DEU','Item title FRA','Item FRA','Item title CHI','Item CHI','Item title JAP','Item JAP','Item ESP','Item title GAE','Item GAE','Item title MAG','Item MAG','Item title URD','Item URD')
reader = csv.DictReader(file_csv, fieldnames)
file_csv.close()

a = open(jsonfile, 'w')
# crea il json
for x in reader:
    if x['Sub Area is Country'] != '' or x['Sub Area is: City'] != '' or x['LPI SPECIFIC'] != '' :
        json.dump(x, a, indent= 4)
a.close()