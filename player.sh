#!/bin/bash

key=$(echo "$*" | awk 'NF>1{print $NF}')
case $key in
		play)
			echo "Please wait, commencing play"
			cmus-remote -p	
		;;	
		pause)
			echo "Please wait, commencing pause"
			cmus-remote -u		
		;;
		previous)
			echo "Please wait, commencing previous"
			cmus-remote -r
		;;
		repeat)
			echo "Please wait, commencing previous"
			cmus-remote -R
		;;
		next)
			echo "Please wait, commencing skip"
			cmus-remote -n
		;;
		voldown)
			echo "Please wait, commencing voldown"
			cmus-remote -v -10
		;;
		shuffle)
			echo "Please wait, commencing skip"
			cmus-remote -S			
		;;
		volup)
			echo "Please wait, commencing volup"
			cmus-remote -v +10
		;;
		'')
 esac		
