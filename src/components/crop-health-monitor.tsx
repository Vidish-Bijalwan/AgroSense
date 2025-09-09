import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { Leaf, AlertTriangle, TrendingUp, Droplets } from 'lucide-react'
import { Progress } from './ui/progress'

interface CropHealthMonitorProps {
  language: string
}

export function CropHealthMonitor({ language }: CropHealthMonitorProps) {
  const isHindi = language === 'hi'

  const crops = [
    {
      name: isHindi ? 'टमाटर' : 'Tomato',
      health: 85,
      status: 'healthy',
      area: '1.2 ' + (isHindi ? 'बीघा' : 'bigha'),
      issues: 1,
      lastChecked: isHindi ? '2 घंटे पहले' : '2 hours ago'
    },
    {
      name: isHindi ? 'मिर्च' : 'Chili',
      health: 92,
      status: 'excellent',
      area: '0.8 ' + (isHindi ? 'बीघा' : 'bigha'),
      issues: 0,
      lastChecked: isHindi ? '4 घंटे पहले' : '4 hours ago'
    },
    {
      name: isHindi ? 'गोभी' : 'Cauliflower',
      health: 68,
      status: 'attention',
      area: '0.5 ' + (isHindi ? 'बीघा' : 'bigha'),
      issues: 2,
      lastChecked: isHindi ? '6 घंटे पहले' : '6 hours ago'
    }
  ]

  const getHealthColor = (health: number) => {
    if (health >= 80) return 'text-success'
    if (health >= 60) return 'text-accent'
    return 'text-destructive'
  }

  const getHealthBackground = (health: number) => {
    if (health >= 80) return 'bg-success/10 border-success/20'
    if (health >= 60) return 'bg-accent/10 border-accent/20'
    return 'bg-destructive/10 border-destructive/20'
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'excellent':
        return <Badge className="bg-success text-success-foreground text-xs">Excellent</Badge>
      case 'healthy':
        return <Badge className="bg-primary text-primary-foreground text-xs">Healthy</Badge>
      case 'attention':
        return <Badge variant="destructive" className="text-xs">Needs Attention</Badge>
      default:
        return <Badge variant="outline" className="text-xs">Unknown</Badge>
    }
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          <Leaf className="w-5 h-5 text-primary" />
          {isHindi ? 'फसल स्वास्थ्य मॉनिटर' : 'Crop Health Monitor'}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {crops.map((crop, index) => (
          <div key={index} className={`p-4 rounded-lg border-2 ${getHealthBackground(crop.health)}`}>
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-medium">{crop.name}</h4>
                  {getStatusBadge(crop.status)}
                </div>
                <p className="text-sm text-muted-foreground">
                  {crop.area} • {crop.lastChecked}
                </p>
              </div>
              <div className="text-right">
                <p className={`text-2xl font-bold ${getHealthColor(crop.health)}`}>
                  {crop.health}%
                </p>
                <p className="text-xs text-muted-foreground">
                  {isHindi ? 'स्वास्थ्य स्कोर' : 'Health Score'}
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <Progress value={crop.health} className="h-2" />
              
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <Droplets className="w-3 h-3 text-primary" />
                    <span className="text-xs">
                      {isHindi ? 'नमी: 65%' : 'Moisture: 65%'}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <TrendingUp className="w-3 h-3 text-success" />
                    <span className="text-xs">
                      {isHindi ? 'विकास दर' : 'Growth Rate'}
                    </span>
                  </div>
                </div>
                
                {crop.issues > 0 && (
                  <div className="flex items-center gap-1 text-destructive">
                    <AlertTriangle className="w-3 h-3" />
                    <span className="text-xs">
                      {crop.issues} {isHindi ? 'समस्या' : 'issue'}
                      {crop.issues > 1 ? 's' : ''}
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div className="flex gap-2 mt-3">
              <Button size="sm" variant="outline" className="flex-1 h-8">
                {isHindi ? 'विस्तार से देखें' : 'View Details'}
              </Button>
              <Button size="sm" variant="outline" className="flex-1 h-8">
                {isHindi ? 'जांच करें' : 'Diagnose'}
              </Button>
            </div>
          </div>
        ))}

        <Button variant="outline" className="w-full">
          {isHindi ? 'सभी फसलें देखें' : 'View All Crops'}
        </Button>
      </CardContent>
    </Card>
  )
}