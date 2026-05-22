$gitExe = "D:\Program Files\Git\bin\git.exe"

& $gitExe config --global user.name "humr"
& $gitExe config --global user.email "humurong@hotmail.com"

& $gitExe add -A
& $gitExe commit -m "Update: Fix carousel images and gift product page UI"
& $gitExe push origin main