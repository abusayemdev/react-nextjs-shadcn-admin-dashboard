"use client"

import { LogOut, Moon, Settings, Sun, User } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu'
import { Button } from './ui/button'
import { useTheme } from 'next-themes'
import { SidebarTrigger } from './ui/sidebar'

const Navbar = () => {
    
    const { setTheme } = useTheme()

    return (
        <nav className='flex items-center justify-between p-4 shadow-sm dark:border-b sticky top-0 bg-background z-10'>
            
            <SidebarTrigger />

            {/* top bar */}
            <div className='flex items-center gap-4'>

                {/* theme */}

                <DropdownMenu>
                    <DropdownMenuTrigger 
                        render={
                            <Button variant="outline" size="icon"> 
                            <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
                            <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
                            <span className="sr-only">Toggle theme</span>
                            </Button>
                        }
                    >
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setTheme("light")}>
                        Light
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setTheme("dark")}>
                        Dark
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setTheme("system")}>
                        System
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                    </DropdownMenu>
                



                {/* user menu */}
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <Avatar>
                            <AvatarImage src="https://github.com/evilrabbit.png" alt="@evilrabbit" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent sideOffset={10}>
                        <DropdownMenuGroup>
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem> <User className='h-5 w-5 mr-2' /> Profile </DropdownMenuItem>
                            <DropdownMenuItem> <Settings className='h-5 w-5 mr-2' /> Settings </DropdownMenuItem>
                            <DropdownMenuItem> <LogOut className='h-5 w-5 mr-2' /> Logout </DropdownMenuItem>
                        </DropdownMenuGroup>
                    </DropdownMenuContent>
                </DropdownMenu>



            </div>

        </nav>
    )
}

export default Navbar