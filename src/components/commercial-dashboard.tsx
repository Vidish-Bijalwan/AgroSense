import React from 'react'
import { Button } from './ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Progress } from './ui/progress'
import { BarChart3, MapPin, AlertTriangle, TrendingUp, Users, Package, Droplets, Thermometer } from 'lucide-react'

interface CommercialDashboardProps {
  onNavigate: (screen: string) => void
  language: string
}

export function CommercialDashboard({ onNavigate, language }: CommercialDashboardProps) {
  const clusters = [
    {
      name: 'Ramnagar Cluster A',
      farmers: 24,
      area: '45 bighas',
      crop: 'Tomato',
      health: 85,
      status: 'healthy',
      harvest: '15 days'
    },
    {
      name: 'Doiwala Cluster B',
      farmers: 18,
      area: '32 bighas',
      crop: 'Chili',
      health: 65,
      status: 'attention',
      harvest: '28 days'
    },
    {
      name: 'Selaqui Cluster C',
      farmers: 31,
      area: '58 bighas',
      crop: 'Cauliflower',
      health: 92,
      status: 'excellent',
      harvest: '8 days'
    }
  ]

  const alerts = [
    {
      type: 'disease',
      message: 'Early blight detected in Cluster A',
      severity: 'medium',
      time: '2 hours ago'
    },
    {
      type: 'weather',
      message: 'Heavy rain expected in 48 hours',
      severity: 'high',
      time: '4 hours ago'
    },
    {
      type: 'contract',
      message: 'Payment pending for Cluster C',
      severity: 'low',
      time: '1 day ago'
    }
  ]

  const getHealthColor = (health: number) => {
    if (health >= 80) return 'text-success'
    if (health >= 60) return 'text-accent'
    return 'text-destructive'
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'excellent':
        return <Badge className="bg-success text-success-foreground">Excellent</Badge>
      case 'healthy':
        return <Badge className="bg-primary text-primary-foreground">Healthy</Badge>
      case 'attention':
        return <Badge variant="secondary">Needs Attention</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  return (
    <div className="min-h-screen bg-secondary/30 pb-20">
      {/* Header */}
      <div className="bg-primary text-primary-foreground p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-white mb-1">Good morning, Amit</h1>
            <p className="text-primary-foreground/80 text-sm">Field Manager • Uttarakhand</p>
          </div>
          <Button variant="ghost" size="sm" className="text-white hover:bg-primary/20">
            <BarChart3 className="w-4 h-4" />
          </Button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-4 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-white">73</p>
            <p className="text-xs text-primary-foreground/80">Farmers</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-white">135</p>
            <p className="text-xs text-primary-foreground/80">Bighas</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-white">3</p>
            <p className="text-xs text-primary-foreground/80">Clusters</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-white">₹2.1L</p>
            <p className="text-xs text-primary-foreground/80">Revenue</p>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6 -mt-4">
        {/* Active Alerts */}
        <Card className="border-destructive/20 bg-destructive/5">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-destructive">
              <AlertTriangle className="w-5 h-5" />
              Active Alerts
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {alerts.map((alert, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg">
                <div className="flex-1">
                  <p className="font-medium text-sm">{alert.message}</p>
                  <p className="text-xs text-muted-foreground">{alert.time}</p>
                </div>
                <Badge 
                  variant={alert.severity === 'high' ? 'destructive' : alert.severity === 'medium' ? 'secondary' : 'outline'}
                  className="text-xs"
                >
                  {alert.severity}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Cluster Management */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-primary" />
              Cluster Health
            </CardTitle>
            <Button variant="outline" size="sm" onClick={() => onNavigate('clusters')}>
              View All
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {clusters.map((cluster, index) => (
              <div key={index} className="p-4 border border-border rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="font-medium">{cluster.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {cluster.farmers} farmers • {cluster.area} • {cluster.crop}
                    </p>
                  </div>
                  {getStatusBadge(cluster.status)}
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Health Score</span>
                    <span className={`font-medium ${getHealthColor(cluster.health)}`}>
                      {cluster.health}%
                    </span>
                  </div>
                  <Progress value={cluster.health} className="h-2" />
                  <p className="text-xs text-muted-foreground">
                    Expected harvest: {cluster.harvest}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <Button
            variant="outline"
            className="h-16 rounded-xl border-2"
            onClick={() => onNavigate('clusters')}
          >
            <div className="flex flex-col items-center gap-2">
              <Users className="w-5 h-5 text-primary" />
              <span className="text-sm">Manage Clusters</span>
            </div>
          </Button>
          <Button
            variant="outline"
            className="h-16 rounded-xl border-2"
            onClick={() => onNavigate('contracts')}
          >
            <div className="flex flex-col items-center gap-2">
              <Package className="w-5 h-5 text-primary" />
              <span className="text-sm">Contracts</span>
            </div>
          </Button>
        </div>

        {/* Environmental Conditions */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Environmental Monitoring</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                <Thermometer className="w-5 h-5 text-accent" />
                <div>
                  <p className="text-sm font-medium">Temperature</p>
                  <p className="text-lg">28°C</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                <Droplets className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-sm font-medium">Soil Moisture</p>
                  <p className="text-lg">65%</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Revenue Trend */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-success" />
              Revenue Trend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">This Month</span>
                <span className="font-medium text-success">+15% ₹2.1L</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Last Month</span>
                <span className="font-medium">₹1.8L</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Projected Next</span>
                <span className="font-medium text-accent">₹2.4L</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}