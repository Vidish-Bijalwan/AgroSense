import React from 'react'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { 
  Home, 
  MessageSquare, 
  BarChart3, 
  ShoppingCart, 
  BookOpen, 
  Camera, 
  Users, 
  FileText, 
  Settings,
  Brain,
  MapPin
} from 'lucide-react'

interface NavigationProps {
  currentScreen: string
  onNavigate: (screen: string) => void
  userType: 'farmer' | 'commercial'
}

export function Navigation({ currentScreen, onNavigate, userType }: NavigationProps) {
  const farmerNavItems = [
    {
      id: 'home',
      label: 'Home',
      labelHi: 'होम',
      icon: Home,
      badge: null
    },
    {
      id: 'diagnosis',
      label: 'Diagnose',
      labelHi: 'जांच',
      icon: Camera,
      badge: null
    },
    {
      id: 'marketplace',
      label: 'Market',
      labelHi: 'बाज़ार',
      icon: ShoppingCart,
      badge: '2'
    },
    {
      id: 'land',
      label: 'Land',
      labelHi: 'भूमि',
      icon: MapPin,
      badge: null
    },
    {
      id: 'settings',
      label: 'More',
      labelHi: 'अधिक',
      icon: Settings,
      badge: null
    }
  ]

  const commercialNavItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      labelHi: 'डैशबोर्ड',
      icon: BarChart3,
      badge: null
    },
    {
      id: 'clusters',
      label: 'Clusters',
      labelHi: 'क्लस्टर',
      icon: Users,
      badge: '3'
    },
    {
      id: 'marketplace',
      label: 'Market',
      labelHi: 'बाज़ार',
      icon: ShoppingCart,
      badge: null
    },
    {
      id: 'contracts',
      label: 'Contracts',
      labelHi: 'अनुबंध',
      icon: FileText,
      badge: '1'
    },
    {
      id: 'settings',
      label: 'More',
      labelHi: 'अधिक',
      icon: Settings,
      badge: null
    }
  ]

  const navItems = userType === 'farmer' ? farmerNavItems : commercialNavItems

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-border shadow-lg">
      <div className="flex items-center justify-around py-2 px-2">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = currentScreen === item.id
          
          return (
            <Button
              key={item.id}
              variant="ghost"
              size="sm"
              className={`flex-1 flex flex-col items-center gap-1 h-16 relative ${
                isActive 
                  ? 'text-primary bg-primary/10 hover:bg-primary/15' 
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
              }`}
              onClick={() => onNavigate(item.id)}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 ${isActive ? 'text-primary' : ''}`} />
                {item.badge && (
                  <Badge 
                    className="absolute -top-2 -right-2 w-4 h-4 p-0 text-xs bg-destructive text-destructive-foreground flex items-center justify-center"
                  >
                    {item.badge}
                  </Badge>
                )}
              </div>
              <span className={`text-xs ${isActive ? 'text-primary font-medium' : ''}`}>
                {item.label}
              </span>
              {isActive && (
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-0.5 bg-primary rounded-t-full"></div>
              )}
            </Button>
          )
        })}
      </div>
    </div>
  )
}