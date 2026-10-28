import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';

interface dashboardCardProps  {
    heading: string;
    number: number | string;
    text: string;
}
const DashboardCard = ({ heading, number, text } : dashboardCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{heading}</CardTitle>
        <CardDescription>{text} </CardDescription>
      </CardHeader>
       <CardContent className="text-2xl font-bold"> {number} </CardContent>
    </Card>
  )
}

export default DashboardCard