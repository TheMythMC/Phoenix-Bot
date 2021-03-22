import os

path = os.getcwd()

os.chdir((path + '/../java'))

os.system('./gradlew shadowJar')

os.chdir((os.getcwd() + '/build/libs/'))

os.system('java -jar PhoenixMusic-1.0-all.jar')