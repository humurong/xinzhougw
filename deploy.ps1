$gitExe = "D:\Program Files\Git\bin\git.exe"

& $gitExe config --global user.name "humr"
& $gitExe config --global user.email "humurong@hotmail.com"

& $gitExe add -A
& $gitExe commit -m "Update: UI redesign with amber theme and improved styling"
& $gitExe push -f origin main