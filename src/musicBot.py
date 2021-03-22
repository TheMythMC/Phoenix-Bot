import os

path = os.getcwd()

if path.endswith('/src'):
    os.chdir((path + '/../java'))
else:
    os.chdir((path + '/java'))

os.system('./gradlew shadowJar')

os.chdir((os.getcwd() + '/build/libs/'))

os.system('java -jar PhoenixMusic-1.0-all.jar')