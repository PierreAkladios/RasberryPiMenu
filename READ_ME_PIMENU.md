How To Use pimenu
Author(s): Carlo Tutor
=================

## Necessary Modules And Settings Changes:

* Read other README file
* Sudo pip install psutil
* Sudo pip install pynput
* Change permissions on all scripts to executable allowed
* Have config file for mail (needed for mutt client)

--- 

## How To Use It:
* Social
	* Email
		* Commands use the mutt interface to access the users emails. The list of commands below are all of the default commands from mutt:
			* Quit, Save, Delete, Mail, Undelete, Reply, Group, Help
		* Exit Mode: This command should be used if the user misclicked one of the commands from the above list and does not wish to continue with that command.
	* Internet
		* pimenu uses the elinks application to access the internet. The list of commands below are all commands from elinks
			* Bookmarks, Save Page As File, Type In Url:
		* Start Browser
	* Music
		* Commands use the cmus interface to play the users music. The list of commands below are all of the implemented commands from cmus:
			* Play, Pause, Previous Track, Toggle Repeat, Next Track, Volume Down, Shuffle, Volume Up
	* Video
		* pimenu uses vlc to play the users videos. The list of commands below are all of the implemented commands from vlc:
			* Launch, Open Video, Play/Pause, Stop, Previous, Next

--- 

## What Hasn't Been Implemented Yet
* SENSACT
* Sleep times may be able to be adjusted if "wait" code is programmed (make the program wait until certain programs are up before proceeding with a command)
* When adding new gifs, the dimensions should be 48 x 48 so that the menu stays uniform