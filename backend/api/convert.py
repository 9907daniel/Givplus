import csv
import json



def convert_to_json(csvFilePath, jsonFilePath):
    
    data = {}
    
    with open(csvFilePath, encoding = 'utf-8') as csvf:
        csvReader = csv.DictReader(csvf)
        
        for row in csvReader:
            for columnName in row:
                if columnName in data:
                    data[columnName] = []
                data[ColumnName].append(row[columnName])