import React from 'react'
import { Button } from './ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Camera, Zap, ShoppingCart, MapPin, Bell, Wifi, WifiOff, Volume2 } from 'lucide-react'
import { ImageWithFallback } from './figma/ImageWithFallback'
import { CropHealthMonitor } from './crop-health-monitor'

interface FarmerHomeProps {
  onNavigate: (screen: string) => void
  language: string
}

export function FarmerHome({ onNavigate, language }: FarmerHomeProps) {
  const isHindi = language === 'hi'

  const mainActions = [
    {
      id: 'diagnosis',
      title: isHindi ? 'फसल की जांच करें' : 'Diagnose Crop',
      subtitle: isHindi ? 'रोग और पोषण की पहचान' : 'Disease & Nutrition Check',
      icon: Camera,
      color: 'bg-primary text-primary-foreground',
      size: 'large'
    },
    {
      id: 'ar-assist',
      title: isHindi ? 'AR रोपण सहायता' : 'AR Plant Assist',
      subtitle: isHindi ? 'सही दूरी और गहराई' : 'Perfect spacing & depth',
      icon: Zap,
      color: 'bg-accent text-accent-foreground',
      size: 'large'
    }
  ]

  const secondaryActions = [
    {
      id: 'marketplace',
      title: isHindi ? 'बाजार' : 'Marketplace',
      subtitle: isHindi ? 'फसल बेचें' : 'Sell crops',
      icon: ShoppingCart,
      color: 'bg-success text-success-foreground'
    },
    {
      id: 'land',
      title: isHindi ? 'भूमि प्रबंधन' : 'Land Management',
      subtitle: isHindi ? 'खेत जोड़ें' : 'Add fields',
      icon: MapPin,
      color: 'bg-secondary text-secondary-foreground'
    }
  ]

  const recentActivity = [
    {
      title: isHindi ? 'टमाटर - पत्ती झुलसा रोग' : 'Tomato - Early Blight',
      date: isHindi ? '2 घंटे पहले' : '2 hours ago',
      severity: 'medium',
      action: isHindi ? 'उपचार लागू करें' : 'Apply treatment',
      image: 'https://images.unsplash.com/photo-1752934608051-41b747a59e21?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b21hdG8lMjBwbGFudCUyMGRpc2Vhc2UlMjBhZ3JpY3VsdHVyZXxlbnwxfHx8fDE3NTc0MzY2MTZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      title: isHindi ? 'मिर्च बिक्री का प्रस्ताव' : 'Chili Sale Offer',
      date: isHindi ? '1 दिन पहले' : '1 day ago',
      severity: 'success',
      action: isHindi ? '₹45/किग्रा' : '₹45/kg',
      image: 'https://images.unsplash.com/photo-1743670476802-886108356b1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsaSUyMHBlcHBlciUyMHBsYW50JTIwYWdyaWN1bHR1cmV8ZW58MXx8fHwxNzU3NDM2NjIwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    }
  ]

  return (
    <div className="min-h-screen bg-secondary/30 pb-20">
      {/* Header */}
      <div className="bg-primary text-primary-foreground p-6 pb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-white mb-1">
              {isHindi ? 'नमस्ते, रीता जी' : 'Hello, Rita'}
            </h1>
            <p className="text-primary-foreground/80 text-sm">
              {isHindi ? 'रामनगर, देहरादून' : 'Ramnagar, Dehradun'}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="text-white hover:bg-primary/20">
              <Bell className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" className="text-white hover:bg-primary/20">
              <Volume2 className="w-4 h-4" />
            </Button>
            <div className="flex items-center gap-1 text-xs">
              <Wifi className="w-3 h-3" />
              <span>{isHindi ? 'ऑनलाइन' : 'Online'}</span>
            </div>
          </div>
        </div>
        
        <Card className="bg-white/10 border-white/20 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">{isHindi ? 'आज का मौसम' : "Today's Weather"}</p>
                <p className="text-lg">28°C • {isHindi ? 'धूप' : 'Sunny'}</p>
              </div>
              <div className="text-right">
                <p className="text-sm opacity-90">{isHindi ? 'सि��चाई सुझाव' : 'Irrigation'}</p>
                <p className="text-sm">{isHindi ? '2 दिन बाद' : 'In 2 days'}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="p-6 space-y-6 -mt-4">
        {/* Main Actions */}
        <div className="grid grid-cols-1 gap-4">
          {mainActions.map((action) => {
            const Icon = action.icon
            return (
              <Button
                key={action.id}
                variant="ghost"
                className={`${action.color} h-20 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 active:scale-95`}
                onClick={() => onNavigate(action.id)}
              >
                <div className="flex items-center gap-4 w-full">
                  <div className="bg-white/20 rounded-full p-3">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="text-left flex-1">
                    <div className="font-medium">{action.title}</div>
                    <div className="text-sm opacity-90">{action.subtitle}</div>
                  </div>
                </div>
              </Button>
            )
          })}
        </div>

        {/* Secondary Actions */}
        <div className="grid grid-cols-2 gap-4">
          {secondaryActions.map((action) => {
            const Icon = action.icon
            return (
              <Button
                key={action.id}
                variant="ghost"
                className={`${action.color} h-24 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 active:scale-95`}
                onClick={() => onNavigate(action.id)}
              >
                <div className="flex flex-col items-center gap-2 text-center">
                  <Icon className="w-6 h-6" />
                  <div>
                    <div className="text-sm font-medium">{action.title}</div>
                    <div className="text-xs opacity-80">{action.subtitle}</div>
                  </div>
                </div>
              </Button>
            )
          })}
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">
              {isHindi ? 'हाल की गतिविधि' : 'Recent Activity'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentActivity.map((item, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                {item.image && (
                  <ImageWithFallback
                    src={item.image}
                    alt={item.title}
                    className="w-12 h-12 object-cover rounded-lg"
                  />
                )}
                <div className="flex-1">
                  <p className="font-medium text-sm">{item.title}</p>
                  <p className="text-xs text-muted-foreground">{item.date}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge 
                    variant={item.severity === 'success' ? 'default' : item.severity === 'medium' ? 'secondary' : 'destructive'}
                    className="text-xs"
                  >
                    {item.action}
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4">
          <Card className="text-center">
            <CardContent className="p-4">
              <p className="text-2xl font-bold text-primary">3</p>
              <p className="text-xs text-muted-foreground">
                {isHindi ? 'खेत' : 'Fields'}
              </p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-4">
              <p className="text-2xl font-bold text-success">12</p>
              <p className="text-xs text-muted-foreground">
                {isHindi ? 'स्वस्थ फसलें' : 'Healthy Crops'}
              </p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-4">
              <p className="text-2xl font-bold text-accent">₹2.4k</p>
              <p className="text-xs text-muted-foreground">
                {isHindi ? 'इस माह' : 'This Month'}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Crop Health Monitor */}
        <CropHealthMonitor language={language} />
      </div>
    </div>
  )
}