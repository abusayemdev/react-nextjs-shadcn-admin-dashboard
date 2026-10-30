import React from 'react';
import {Home, Inbox, Calendar, Search, Settings, User2, ChevronUp, Plus, Projector, ChevronDown} from "lucide-react";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupAction, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuBadge, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem, SidebarSeparator } from './ui/sidebar';
import Link from 'next/link';
import Image from 'next/image';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';

const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Inbox",
    url: "#",
    icon: Inbox,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  }


];

const AppSidebar = () => {
  return (
    <Sidebar collapsible="icon" >
      <SidebarHeader className='py-4'>
        <SidebarMenu>
          <SidebarMenuButton render={
            <Link href="/"> <Image src="/globe.svg" alt='logo' width={20} height={20}/> <span>Admin Dashboard</span> </Link>
          }>

          </SidebarMenuButton>
        </SidebarMenu>

      </SidebarHeader>
      <SidebarSeparator/>

      <SidebarContent >

        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map(item => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton render={
                    <Link href={item.url}>
                      <item.icon/>
                      <span>{item.title}</span>
                    
                    </Link>
                  }>
                    
                  </SidebarMenuButton>
                  {item.title==="Inbox" && (
                    <SidebarMenuBadge>21</SidebarMenuBadge>
                  )}
                </SidebarMenuItem>


              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* COLLAPSABLE */}
        <Collapsible defaultOpen className="group/collapsible">
          <SidebarGroup>
            <SidebarGroupLabel render={
              <CollapsibleTrigger>
              Collapsable Group 
              <ChevronDown className="ml-auto transition-transform group-data-open/collapsible:rotate-180" />
              </CollapsibleTrigger>
            } > 
            </SidebarGroupLabel>

            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton render={
                      <Link href="/admin/users"> <Projector /> See All Users </Link>
                    }>

                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>

                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton render={
                      <Link href="/admin/users/create"> <Plus /> Add User </Link>
                    }>

                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>


              </SidebarGroupContent>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>

        {/* Nested */}

        <SidebarGroup>
          <SidebarGroupLabel> Nested Items </SidebarGroupLabel>
          
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton render={
                  <Link href="/admin/users"> <Projector /> Account </Link>
                }>

                </SidebarMenuButton>
                <SidebarMenuSub>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton render={
                      <Link href="/admin/users/username"> Account Details </Link>
                    }>

                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>

                
                      
                </SidebarMenuSub>
              </SidebarMenuItem>
            </SidebarMenu>


          </SidebarGroupContent>
        </SidebarGroup>


        <SidebarGroup>
          <SidebarGroupLabel> Projects </SidebarGroupLabel>
          <SidebarGroupAction>
            <Plus /> <span className="sr-only">Add Project</span>
          </SidebarGroupAction>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton render={
                  <Link href="#"> <Projector /> See All Projects </Link>
                }>

                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>

            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton render={
                  <Link href="#"> <Plus /> Add Project </Link>
                }>

                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>


          </SidebarGroupContent>
        </SidebarGroup>



      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger render={
                <SidebarMenuButton>
                  <User2/> John Doe <ChevronUp className='ml-auto'/>
                </SidebarMenuButton>
              }>

              </DropdownMenuTrigger>
              <DropdownMenuContent align='end' className="w-40">
                <DropdownMenuItem>Account</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Sign Out</DropdownMenuItem>

              </DropdownMenuContent>
            </DropdownMenu>

          </SidebarMenuItem>

        </SidebarMenu>

      </SidebarFooter>

    </Sidebar>
  )
}

export default AppSidebar