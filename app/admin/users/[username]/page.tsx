import React from 'react'
import CardList from '@/components/CardList'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card'
import { Progress } from '@/components/ui/progress'
import { BadgeCheck, Candy, Citrus, Shield } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from '@/components/ui/button'
import EditUser from '@/app/admin/users/edit-user'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import AppLineChart from '@/components/AppLineChart'


const SingleUserPage = () => {
  return (
    <div>
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem>
                <BreadcrumbLink render={<a href="/admin/dashboard" />}>Dashboard</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                <BreadcrumbLink render={<a href="/admin/users" />}>
                    Users  
                </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                <BreadcrumbPage>Jhon Doe</BreadcrumbPage>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>

        {/* CONTAINER */}
        <div className="flex flex-col lg:flex-row gap-8 mt-4">
            {/* Left */}
            <div className="w-full lg:w-1/3 space-y-6">
                {/* USER BADGES CONTAINER */}
                <div className="bg-primary-foreground p-4 rounded-lg">
                    <h1 className="text-xl font-semibold"> User Badges </h1>

                    <div className="flex gap-4 mt-4">
                        <HoverCard>
                            <HoverCardTrigger>
                            <BadgeCheck
                                size={36}
                                className="rounded-full bg-blue-500/30 border-1 border-blue-500/50 p-2"
                            />
                            </HoverCardTrigger>
                            <HoverCardContent>
                            <h1 className="font-bold mb-2">Verified User</h1>
                            <p className="text-sm text-muted-foreground">
                                This user has been verified by the admin.
                            </p>
                            </HoverCardContent>
                        </HoverCard>
                        <HoverCard>
                            <HoverCardTrigger>
                            <Shield
                                size={36}
                                className="rounded-full bg-green-800/30 border-1 border-green-800/50 p-2"
                            />
                            </HoverCardTrigger>
                            <HoverCardContent>
                            <h1 className="font-bold mb-2">Admin</h1>
                            <p className="text-sm text-muted-foreground">
                                Admin users have access to all features and can manage
                                users.
                            </p>
                            </HoverCardContent>
                        </HoverCard>
                        <HoverCard>
                            <HoverCardTrigger>
                            <Candy
                                size={36}
                                className="rounded-full bg-yellow-500/30 border-1 border-yellow-500/50 p-2"
                            />
                            </HoverCardTrigger>
                            <HoverCardContent>
                            <h1 className="font-bold mb-2">Awarded</h1>
                            <p className="text-sm text-muted-foreground">
                                This user has been awarded for their contributions.
                            </p>
                            </HoverCardContent>
                        </HoverCard>
                        <HoverCard>
                            <HoverCardTrigger>
                            <Citrus
                                size={36}
                                className="rounded-full bg-orange-500/30 border-1 border-orange-500/50 p-2"
                            />
                            </HoverCardTrigger>
                            <HoverCardContent>
                            <h1 className="font-bold mb-2">Popular</h1>
                            <p className="text-sm text-muted-foreground">
                                This user has been popular in the community.
                            </p>
                            </HoverCardContent>
                        </HoverCard>

                    </div>

                    
                </div>
               
                <div className="bg-primary-foreground p-4 rounded-lg">
                    <div className="flex items-center justify-between">
                        <h1 className='text-xl font-semibold'> User Information </h1>

                        <Sheet>
                            <SheetTrigger render={<Button>Edit User</Button>}></SheetTrigger>
                            <EditUser/>
                        </Sheet>

                    </div>
                    

                    <div className="space-y-4 mt-4">
                        <div className="flex flex-col gap-2 mb-8">
                            <p className='text-sm text-muted-foreground'>Profile Completion</p>
                            <Progress value={70} />
                        </div>
                        <div className="flex items-center gap-2" >
                            <span className="font-bold" >Username:</span>
                            <span>John Doe</span>
                        </div>

                         <div className="flex items-center gap-2">
                            <span className="font-bold">Email:</span>
                            <span>john.doe@gmail.com</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="font-bold">Phone:</span>
                            <span>+1 234 5678</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="font-bold">Location:</span>
                            <span>New York, NY</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="font-bold">Role:</span>
                            <Badge>Admin</Badge>
                        </div>
                        
                    </div>
                    <p className="text-sm text-muted-foreground mt-4">Joined on 2026.01.01</p>
                </div>
                
                <div className="bg-primary-foreground p-4 rounded-lg">
                    <CardList title="Recent Transactions" />
                </div>
            
            </div>
            {/* Right */}
            <div className="w-full lg:w-2/3 space-y-6">
                <div className="bg-primary-foreground p-4 rounded-lg space-y-2">
                    <div className='flex items-center gap-2'>
                        <Avatar className='size-12'>
                            <AvatarImage src="https://github.com/evilrabbit.png" alt="@evilrabbit" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <h1 className="text-xl font-semibold">John Doe</h1>
                    </div>
                    <p className="text-sm text-muted-foreground">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
                </div>
                <div className="bg-primary-foreground p-4 rounded-lg">
                    <h1 className="text-xl font-semibold mb-8">User Activity</h1>
                    <AppLineChart/>
                </div>
            </div>
        </div>



    </div>
  )
}

export default SingleUserPage