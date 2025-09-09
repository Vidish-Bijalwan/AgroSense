import React, { useState } from 'react'
import { Button } from './ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Switch } from './ui/switch'
import { Progress } from './ui/progress'
import { 
  ArrowLeft, 
  Globe, 
  Volume2, 
  Wifi, 
  WifiOff, 
  Moon, 
  Sun, 
  Bell, 
  Shield, 
  HelpCircle,
  LogOut,
  User,
  Smartphone,
  Database,
  RefreshCw
} from 'lucide-react'

interface SettingsScreenProps {
  onBack: () => void
  language: string
  onLanguageChange?: (lang: string) => void
  voiceEnabled: boolean
  onToggleVoice: () => void
}

export function SettingsScreen({ 
  onBack, 
  language, 
  onLanguageChange, 
  voiceEnabled, 
  onToggleVoice 
}: SettingsScreenProps) {
  const [darkMode, setDarkMode] = useState(false)
  const [notifications, setNotifications] = useState(true)
  const [autoSync, setAutoSync] = useState(true)
  const [offlineData, setOfflineData] = useState(true)
  
  const isHindi = language === 'hi'

  const syncStatus = {
    pending: 3,
    total: 15,
    lastSync: isHindi ? '2 घंटे पहले' : '2 hours ago'
  }

  const languages = [
    { code: 'hi', name: 'हिंदी', englishName: 'Hindi' },
    { code: 'en', name: 'English', englishName: 'English' },
    { code: 'ne', name: 'नेपाली', englishName: 'Nepali' },
    { code: 'ur', name: 'اردو', englishName: 'Urdu' }
  ]

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-primary text-primary-foreground p-6">
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="sm" onClick={onBack} className="text-white hover:bg-primary/20">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="font-medium text-white">
            {isHindi ? 'सेटिंग्स' : 'Settings'}
          </h1>
          <div className="w-10"></div>
        </div>
      </div>

      <div className="p-6 space-y-6 -mt-4">
        {/* Profile Section */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5 text-primary" />
              {isHindi ? 'प्रोफाइल' : 'Profile'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium">{isHindi ? 'रीता देवी' : 'Rita Devi'}</h3>
                <p className="text-sm text-muted-foreground">+91 98765 43210</p>
                <p className="text-sm text-muted-foreground">
                  {isHindi ? 'रामनगर, देहरादून' : 'Ramnagar, Dehradun'}
                </p>
              </div>
              <Button variant="outline" size="sm">
                {isHindi ? 'संपादित करें' : 'Edit'}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Language & Accessibility */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <Globe className="w-5 h-5 text-primary" />
              {isHindi ? 'भाषा और पहुंच' : 'Language & Accessibility'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="font-medium">{isHindi ? 'भाषा' : 'Language'}</p>
                <p className="text-sm text-muted-foreground">
                  {languages.find(l => l.code === language)?.name}
                </p>
              </div>
              <Button variant="outline" size="sm">
                {isHindi ? 'बदलें' : 'Change'}
              </Button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <Volume2 className="w-4 h-4 text-primary" />
                  <p className="font-medium">{isHindi ? 'वॉयस असिस्टेंट' : 'Voice Assistant'}</p>
                </div>
                <p className="text-sm text-muted-foreground">
                  {isHindi ? 'ऑडियो गाइडेंस और सुझाव' : 'Audio guidance and suggestions'}
                </p>
              </div>
              <Switch checked={voiceEnabled} onCheckedChange={onToggleVoice} />
            </div>
          </CardContent>
        </Card>

        {/* App Preferences */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <Smartphone className="w-5 h-5 text-primary" />
              {isHindi ? 'ऐप प्राथमिकताएं' : 'App Preferences'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <Bell className="w-4 h-4 text-primary" />
                  <p className="font-medium">{isHindi ? 'सूचनाएं' : 'Notifications'}</p>
                </div>
                <p className="text-sm text-muted-foreground">
                  {isHindi ? 'मौसम अलर्ट और रिमाइंडर' : 'Weather alerts and reminders'}
                </p>
              </div>
              <Switch checked={notifications} onCheckedChange={setNotifications} />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <Moon className="w-4 h-4 text-primary" />
                  <p className="font-medium">{isHindi ? 'डार्क मोड' : 'Dark Mode'}</p>
                </div>
                <p className="text-sm text-muted-foreground">
                  {isHindi ? 'कम रोशनी के लिए डार्क थीम' : 'Dark theme for low light'}
                </p>
              </div>
              <Switch checked={darkMode} onCheckedChange={setDarkMode} />
            </div>
          </CardContent>
        </Card>

        {/* Data & Sync */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <Database className="w-5 h-5 text-primary" />
              {isHindi ? 'डेटा और सिंक' : 'Data & Sync'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-muted/50 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${autoSync ? 'bg-success animate-pulse' : 'bg-muted-foreground'}`}></div>
                  <span className="font-medium">
                    {isHindi ? 'सिंक स्थिति' : 'Sync Status'}
                  </span>
                </div>
                <Badge variant={syncStatus.pending > 0 ? 'secondary' : 'default'}>
                  {syncStatus.pending > 0 ? 
                    `${syncStatus.pending} ${isHindi ? 'बचे' : 'pending'}` : 
                    isHindi ? 'अप टू डेट' : 'Up to date'
                  }
                </Badge>
              </div>
              
              {syncStatus.pending > 0 && (
                <div className="space-y-2">
                  <Progress value={(syncStatus.total - syncStatus.pending) / syncStatus.total * 100} className="h-2" />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>
                      {syncStatus.total - syncStatus.pending} / {syncStatus.total} {isHindi ? 'आइटम सिंक किए गए' : 'items synced'}
                    </span>
                    <span>{isHindi ? 'अंतिम सिंक:' : 'Last sync:'} {syncStatus.lastSync}</span>
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="font-medium">{isHindi ? 'ऑटो सिंक' : 'Auto Sync'}</p>
                <p className="text-sm text-muted-foreground">
                  {isHindi ? 'Wi-Fi पर स्वचालित रूप से सिंक करें' : 'Automatically sync on Wi-Fi'}
                </p>
              </div>
              <Switch checked={autoSync} onCheckedChange={setAutoSync} />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="font-medium">{isHindi ? 'ऑफलाइन डेटा' : 'Offline Data'}</p>
                <p className="text-sm text-muted-foreground">
                  {isHindi ? 'ऑफलाइन उपयोग के लिए डेटा सेव करें' : 'Save data for offline use'}
                </p>
              </div>
              <Switch checked={offlineData} onCheckedChange={setOfflineData} />
            </div>

            <Button variant="outline" className="w-full">
              <RefreshCw className="w-4 h-4 mr-2" />
              {isHindi ? 'अभी सिंक करें' : 'Sync Now'}
            </Button>
          </CardContent>
        </Card>

        {/* Support & Privacy */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary" />
              {isHindi ? 'सहायता और गोपनीयता' : 'Support & Privacy'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="ghost" className="w-full justify-start">
              <HelpCircle className="w-4 h-4 mr-3" />
              {isHindi ? 'सहायता केंद्र' : 'Help Center'}
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Shield className="w-4 h-4 mr-3" />
              {isHindi ? 'गोपनीयता नीति' : 'Privacy Policy'}
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <User className="w-4 h-4 mr-3" />
              {isHindi ? 'डेटा निर्यात' : 'Export Data'}
            </Button>
          </CardContent>
        </Card>

        {/* Account Actions */}
        <Card>
          <CardContent className="p-4 space-y-3">
            <Button variant="outline" className="w-full justify-start text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground">
              <LogOut className="w-4 h-4 mr-3" />
              {isHindi ? 'लॉग आउट' : 'Log Out'}
            </Button>
          </CardContent>
        </Card>

        {/* App Info */}
        <div className="text-center text-muted-foreground text-xs space-y-1">
          <p>AgroSense AI v2.1.0</p>
          <p>{isHindi ? 'उत्तराखंड किसानों के लिए बनाया गया' : 'Built for Uttarakhand farmers'}</p>
        </div>
      </div>
    </div>
  )
}