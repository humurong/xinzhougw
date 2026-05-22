$gitExe = "D:\Program Files\Git\bin\git.exe"

& $gitExe config --global user.name "humr"
& $gitExe config --global user.email "humurong@hotmail.com"

& $gitExe remote remove origin
& $gitExe init
& $gitExe add -A
& $gitExe commit -m "Initial commit: Xinzhou Great Wall Museum"
& $gitExe branch -M main
& $gitExe remote add origin https://github.com/humurong/xinzhougw.git
& $gitExe push -f -u origin main