#!/usr/bin/python2
# -*- coding: utf-8 -*-
import Tkconstants as TkC
import os
import subprocess
import sys
from Tkinter import Tk, Frame, Button, Label, PhotoImage
from math import sqrt, floor, ceil
from subprocess import Popen
import psutil
import yaml
import time
from pynput.keyboard import Key, Controller

keyboard = Controller()

class FlatButton(Button):
    def __init__(self, master=None, cnf=None, **kw):
        Button.__init__(self, master, cnf, **kw)

        self.config(
            compound=TkC.TOP,
            relief=TkC.FLAT,
            bd=0,
            bg="#b91d47",  # dark-red
            fg="white",
            activebackground="#b91d47",  # dark-red
            activeforeground="white",
            highlightthickness=0
        )

    def set_color(self, color):
        self.configure(
            bg=color,
            fg="white",
            activebackground=color,
            activeforeground="white"
        )


class PiMenu(Frame):
    framestack = []
    icons = {}
    path = ''
    lastinit = 0

    def __init__(self, parent):
        Frame.__init__(self, parent, background="white")
        self.parent = parent
        self.pack(fill=TkC.BOTH, expand=1)

        self.path = os.path.dirname(os.path.realpath(sys.argv[0]))
        self.initialize()

    def initialize(self):
        """
        (re)load the the items from the yaml configuration and (re)init
        the whole menu system

        :return: None
        """
	subprocess.call(self.path + "/BruyerewifiagreeCurl.sh")
        with open(self.path + '/pimenu.yaml', 'r') as f:
            doc = yaml.load(f)
        self.lastinit = os.path.getmtime(self.path + '/pimenu.yaml')

        if len(self.framestack):
            self.destroy_all()
            self.destroy_top()

        self.show_items(doc)

    def has_config_changed(self):
        """
        Checks if the configuration has been changed since last loading

        :return: Boolean
        """
        return self.lastinit != os.path.getmtime(self.path + '/pimenu.yaml')

    def show_items(self, items, upper=None):
        """
        Creates a new page on the stack, automatically adds a back button when there are
        pages on the stack already

        :param items: list the items to display
        :param upper: list previous levels' ids
        :return: None
        """
        if upper is None:
            upper = []
        num = 0

        # create a new frame
        wrap = Frame(self, bg="black")

        if len(self.framestack):
            # when there were previous frames, hide the top one and add a back button for the new one
            self.hide_top()
            back = FlatButton(
                wrap,
                text='back…',
                image=self.get_icon("arrow.left"),
                command=self.go_back,
            )
            back.set_color("#00a300")  # green
            back.grid(row=0, column=0, padx=1, pady=1, sticky=TkC.W + TkC.E + TkC.N + TkC.S)
            num += 1

        # add the new frame to the stack and display it
        self.framestack.append(wrap)
        self.show_top()

        # calculate tile distribution
        allitems = len(items) + num
        rows = floor(sqrt(allitems))
        cols = ceil(allitems / rows)

        # make cells autoscale
        for x in range(int(cols)):
            wrap.columnconfigure(x, weight=1)
        for y in range(int(rows)):
            wrap.rowconfigure(y, weight=1)

        # display all given buttons
        for item in items:
            act = upper + [item['name']]

            if 'icon' in item:
                image = self.get_icon(item['icon'])
            else:
                image = self.get_icon('scrabble.' + item['label'][0:1].lower())

            btn = FlatButton(
                wrap,
                text=item['label'],
                image=image
            )

            if 'items' in item:
                # this is a deeper level
                btn.configure(command=lambda act=act, item=item: self.show_items(item['items'], act),
                              text=item['label'] + '…')
                btn.set_color("#2b5797")  # dark-blue
            else:
                # this is an action
                btn.configure(command=lambda act=act: self.go_action(act), )

            if 'color' in item:
                btn.set_color(item['color'])

            # add buton to the grid
            btn.grid(
                row=int(floor(num / cols)),
                column=int(num % cols),
                padx=1,
                pady=1,
                sticky=TkC.W + TkC.E + TkC.N + TkC.S
            )
            num += 1

    def get_icon(self, name):
        """
        Loads the given icon and keeps a reference

        :param name: string
        :return:
        """
        if name in self.icons:
            return self.icons[name]

        ico = self.path + '/ico/' + name + '.png'
        if not os.path.isfile(ico):
            ico = self.path + '/ico/' + name + '.gif'
            if not os.path.isfile(ico):
                ico = self.path + '/ico/cancel.gif'

        self.icons[name] = PhotoImage(file=ico)
        return self.icons[name]

    def hide_top(self):
        """
        hide the top page
        :return:
        """
        self.framestack[len(self.framestack) - 1].pack_forget()

    def show_top(self):
        """
        show the top page
        :return:
        """
        self.framestack[len(self.framestack) - 1].pack(fill=TkC.BOTH, expand=1)

    def destroy_top(self):
        """
        destroy the top page
        :return:
        """
        self.framestack[len(self.framestack) - 1].destroy()
        self.framestack.pop()

    def destroy_all(self):
        """
        destroy all pages except the first aka. go back to start
        :return:
        """
        while len(self.framestack) > 1:
            self.destroy_top()

    def go_action(self, actions):
        """
        execute the action script
        :param actions:
        :return:
        """
        # hide the menu and show a delay screen
	print(actions)
        self.hide_top()
        delay = Frame(self, bg="#2d89ef")
        delay.pack(fill=TkC.BOTH, expand=1)
        label = Label(delay, text="Executing...", fg="white", bg="#2d89ef", font="Sans 30")
        label.pack(fill=TkC.BOTH, expand=1)
        self.parent.update()

        # excute shell script
	if (actions[len(actions)-1] == "exit"):
		sys.exit()
	elif (actions[len(actions)-2] == "email"):
		if (not checkIfProcessRunning("mutt")):
        		subprocess.call([self.path + '/pimenu.sh'] + ["social", "email"])
	elif (actions[len(actions)-2] == "music"):
                subprocess.call([self.path + '/pimenu.sh'] + ["social", "music"])
	elif (actions[len(actions)-2] == "video"):
		subprocess.call([self.path + '/pimenu.sh'] + ["social", "video"])
	elif (actions[len(actions)-2] == "internet"):
		subprocess.call([self.path + '/pimenu.sh'] + ["social", "internet"])
	else:
		subprocess.call([self.path + '/pimenu.sh'] + actions)
		
        # remove delay screen and show menu again
        delay.destroy()
	if (actions[len(actions)-2] == "email"):
		time.sleep(2)
		if (actions[len(actions)-1] == "quit"):
			subprocess.call([self.path + '/mail.sh'])
			print "Commencing quit"
			keyboard.press("q")
			keyboard.release("q")
		elif (actions[len(actions)-1] == "save"):
			subprocess.call([self.path + '/mail.sh'])
			print "Commencing save"
			keyboard.press("s")
			keyboard.release("s")
		elif (actions[len(actions)-1] == "delete"):
			subprocess.call([self.path + '/mail.sh'])
			print "Commencing delete"
			keyboard.press("d")
			keyboard.release("d")
		elif (actions[len(actions)-1] == "mail"):
			subprocess.call([self.path + '/mail.sh'])
			print "Commencing mail"
			keyboard.press("m")
			keyboard.release("m")
		elif (actions[len(actions)-1] == "undelete"):
			subprocess.call([self.path + '/mail.sh'])
			print "Commencing undelete"
			keyboard.press("u")
			keyboard.release("u")
		elif (actions[len(actions)-1] == "reply"):
			subprocess.call([self.path + '/mail.sh'])
			print "Commencing reply"
			keyboard.press("r")
			keyboard.release("r")
		elif (actions[len(actions)-1] == "group"):
			subprocess.call([self.path + '/mail.sh'])
			print "Commencing group"
			keyboard.press("g")
			keyboard.release("g")
		elif (actions[len(actions)-1] == "help"):
			subprocess.call([self.path + '/mail.sh'])
			print "Commencing help"
			keyboard.press("h")
			keyboard.release("h")
		elif (actions[len(actions)-1] == "exit"):
			subprocess.call([self.path + '/mail.sh'])
			print "Commencing help"
			keyboard.press(pynput.keyboard.enter)
			keyboard.press("i")
			keyboard.release(pynput.keyboard.enter)
			keyboard.release("i")
	elif (actions[len(actions)-2] == "internet"):
		time.sleep(2)
		if (actions[len(actions)-1] == "launch"):
			print "Going to google"
			subprocess.call([self.path + '/browser.sh'])
			keyboard.type("www.google.com")
			keyboard.press(Key.enter)
			keyboard.release(Key.enter)
		elif (actions[len(actions)-1] == "bookmarks"):
			print "Bookmark menu opening"
			subprocess.call([self.path + '/browser.sh'])
			keyboard.press("s")
			keyboard.release("s")
		elif (actions[len(actions)-1] == "save"):
			print "saving page"
			subprocess.call([self.path + '/browser.sh'])
			keyboard.press("d")
			keyboard.release("d")
		elif (actions[len(actions)-1] == "url"):
			print "bringing up url prompt"
			subprocess.call([self.path + '/browser.sh'])
			keyboard.press("g")
			keyboard.release("g")
	elif (actions[len(actions)-2] == "music"):
		time.sleep(2)
		subprocess.call([self.path + '/player.sh'] + actions)
        elif (actions[len(actions)-2] == "video"):
		time.sleep(2)
                subprocess.call([self.path + '/video.sh'])
		if (actions[len(actions)-1] == "open"):
			print "Going to google"
			keyboard.press(Key.ctrl)
			keyboard.press("o")
			keyboard.release(Key.ctrl)
                        keyboard.release("o")
		elif (actions[len(actions)-1] == "playpause"):
			print "Bookmark menu opening"
			keyboard.press(Key.space)
			keyboard.release(Key.space)
		elif (actions[len(actions)-1] == "stop"):
			print "saving page"
			keyboard.press("l")
			keyboard.press("s")
			keyboard.release("l")
			keyboard.release("s")
		elif (actions[len(actions)-1] == "prev"):
			print "saving page"
			keyboard.press("l")
			keyboard.press("v")
			keyboard.release("l")
			keyboard.release("v")
		elif (actions[len(actions)-1] == "next"):
			print "saving page"
			keyboard.press("l")
			keyboard.press("x")
			keyboard.release("l")
			keyboard.release("x")
	#else:
        #	self.destroy_all()
        self.show_top()
	

    def go_back(self):
        """
        destroy the current frame and reshow the one below, except when the config has changed
        then reinitialize everything
        :return:
        """
        if self.has_config_changed():
            self.initialize()
        else:
            self.destroy_top()
            self.show_top()

def checkIfProcessRunning(processName):
    
    #Check if there is any running process that contains the given name processName.
    
    #Iterate over the all the running process
    	for proc in psutil.process_iter():
        	try:
            # Check if process name contains the given name string.
            		if processName.lower() in proc.name().lower():
                		return True
        	except (psutil.NoSuchProcess, psutil.AccessDenied, psutil.ZombieProcess):
            		pass
    	return False;

def main():
    root = Tk()
    root.geometry("1280x500+0+0")
    root.wm_title('PiMenu')
    if len(sys.argv) > 1 and sys.argv[1] == 'fs':
        root.wm_attributes('-fullscreen', True)
    PiMenu(root)
    root.mainloop()


if __name__ == '__main__':
    main()
