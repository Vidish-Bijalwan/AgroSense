import React from 'react'
import { Button } from './ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { ArrowLeft, Users, MapPin, TrendingUp, AlertCircle } from 'lucide-react'

interface ClustersScreenProps {
  onBack: () => void
  language: string
}

export function ClustersScreen({ onBack, language }: ClustersScreenProps) {
  const isHindi = language === 'hi'

  const clusters = [
    {
      id: 1,
      name: isHindi ? 'रामनगर क्लस्टर' : 'Ramnagar Cluster',
      farmers: 45,
      area: '120 acres',
      status: 'active',
      crops: ['Rice', 'Wheat'],
      lastUpdate: '2 hours ago'
    },
    {
      id: 2,
      name: isHindi ? 'सीतापुर क्लस्टर' : 'Sitapur Cluster',
      farmers: 32,
      area: '85 acres',
      status: 'active',
      crops: ['Cotton', 'Sugarcane'],
      lastUpdate: '5 hours ago'
    },
    {
      id: 3,
      name: isHindi ? 'श्यामनगर क्लस्टर' : 'Shyamnagar Cluster',
      farmers: 28,
      area: '95 acres',
      status: 'warning',
      crops: ['Tomato', 'Onion'],
      lastUpdate: '1 day ago'
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-white border-b border-border px-6 py-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div>
            <h1 className="font-medium">
              {isHindi ? 'क्लस्टर प्रबंधन' : 'Cluster Management'}
            </h1>
            <p className="text-sm text-muted-foreground">
              {isHindi ? 'किसान समूहों का प्रबंधन करें' : 'Manage farmer groups'}
            </p>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-2 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    {isHindi ? 'कुल किसान' : 'Total Farmers'}
                  </p>
                  <p className="text-xl font-medium">105</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-success" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    {isHindi ? 'कुल क्षेत्र' : 'Total Area'}
                  </p>
                  <p className="text-xl font-medium">300 acres</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Cluster List */}
        <div className="space-y-4">
          <h2 className="font-medium">
            {isHindi ? 'सक्रिय क्लस्टर' : 'Active Clusters'}
          </h2>

          {clusters.map((cluster) => (
            <Card key={cluster.id}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-medium">{cluster.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {cluster.farmers} {isHindi ? 'किसान' : 'farmers'} • {cluster.area}
                    </p>
                  </div>
                  <Badge 
                    variant={cluster.status === 'active' ? 'default' : 'destructive'}
                    className={cluster.status === 'active' ? 'bg-success' : ''}
                  >
                    {cluster.status === 'active' 
                      ? (isHindi ? 'सक्रिय' : 'Active')
                      : (isHindi ? 'चेतावनी' : 'Warning')
                    }
                  </Badge>
                </div>

                <div className="flex items-center gap-4 mb-3">
                  <div className="flex gap-1">
                    {cluster.crops.map((crop, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {crop}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <p className="text-xs text-muted-foreground">
                    {isHindi ? 'अंतिम अपडेट:' : 'Last update:'} {cluster.lastUpdate}
                  </p>
                  <Button variant="outline" size="sm">
                    {isHindi ? 'विवरण देखें' : 'View Details'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">
              {isHindi ? 'त्वरित कार्य' : 'Quick Actions'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full justify-start" variant="outline">
              <Users className="w-4 h-4 mr-2" />
              {isHindi ? 'नया क्लस्टर बनाएं' : 'Create New Cluster'}
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <TrendingUp className="w-4 h-4 mr-2" />
              {isHindi ? 'प्रदर्शन रिपोर्ट' : 'Performance Report'}
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <AlertCircle className="w-4 h-4 mr-2" />
              {isHindi ? 'अलर्ट सेटअप' : 'Setup Alerts'}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}