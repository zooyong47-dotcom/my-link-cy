Set WshShell = CreateObject("WScript.Shell")
WshShell.Run "cmd /c npm.cmd run dev", 0, False
