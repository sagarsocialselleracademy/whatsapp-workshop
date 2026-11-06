Set WshShell = CreateObject("WScript.Shell")
WshShell.CurrentDirectory = "d:\Lakshit Sethiya Website"
nodePath = WshShell.ExpandEnvironmentStrings("%LOCALAPPDATA%\Programs\nodejs\node.exe")
WshShell.Run """" & nodePath & """ ""d:\Lakshit Sethiya Website\dev-server.mjs""", 0, False
