#!/bin/bash
#
# This is just an example. It simply prints all passed parameters and sleeps
# 5 seconds.
#
# Any action tile (eg. any tile with no sub items) will trigger this script.
# The names of the pages and of the clicked tile will be passed as arguments.
# Use those to decide what to do.

#echo "$*"
key=$(echo "$*" | awk 'NF>1{print $NF}')
case $key in
		email)
			echo "Please wait, downloading your emails"	
			if [ "$(pidof elinks)" -ne 1 ]; then
				echo "All clear"
			else	
				# gnome-terminal -e mutt
				lxterminal -e mutt
			fi		
		;;	
		internet)
			echo "Please wait, openning links web browser"
			echo $(pidof elinks)
			if [ "$(pidof elinks)" -ne 1 ]; then
				echo "All clear"
			else
				lxterminal -e elinks www.google.ca
				sleep 5
				xdotool windowmove --relative $(xdotool search --name elinks) 0 475
			fi
		;;
		music)
			echo "Please wait, checking your playlist"
			if [ "$(pidof etta)" -ne 1 ]; then
				echo "All clear"
			else
				lxterminal -e cmus
				sleep 5
				xdotool windowmove --relative $(xdotool search --name etta) 0 475
			fi	
		;;
		video)
			if [ "$(pidof vlc)" -ne 1 ]; then 
				echo "All clear"
			else
				echo "Please wait, checking your video"
				vlc &
				wmctrl -r vlc -e 0,0,600,2000,480
			fi
		;;
		calculator)
			echo "Please wait, opening calculator"
			galculator
		;;
		clock)
			echo "Please wait, opening clock"
			gnome-clocks
		;;
		search)
			echo "Please wait, search engine"
			tracker-needle
		;;
		nmtui)
			echo "Please wait, loading network settings"
			nmtui
		;;
		onboard)
			echo "Please wait, for onboard"
			onboard &
			echo "Now exiting"
		;;
		audio)
			echo "Please wait, for audio Settings"
			pimixer
		;;
		'')	
 esac		
#sleep 5

# default video on launch
# adjust sleep times