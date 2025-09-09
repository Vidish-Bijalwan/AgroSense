import React, { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { Card, CardContent } from './ui/card'
import { Badge } from './ui/badge'
import { Globe, Volume2, VolumeX, Leaf } from 'lucide-react'
import exampleImage from 'figma:asset/f80bc8a13f6977bd85a067763d3e13cae1489307.png'

interface SplashScreenProps {
  onLanguageSelect: (language: string) => void
  onToggleVoice: () => void
  voiceEnabled: boolean
}

export function SplashScreen({ onLanguageSelect, onToggleVoice, voiceEnabled }: SplashScreenProps) {
  const [showLanguageSelect, setShowLanguageSelect] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
      setShowLanguageSelect(true)
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  const languages = [
    { code: 'hi', name: 'हिंदी', englishName: 'Hindi' },
    { code: 'en', name: 'English', englishName: 'English' },
    { code: 'ne', name: 'नेपाली', englishName: 'Nepali' },
    { code: 'ur', name: 'उर्दू', englishName: 'Urdu' }
  ]

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary via-primary/90 to-success flex items-center justify-center p-6">
        <div className="text-center text-white">
          <div className="mb-8">
            <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
              <Leaf className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-4xl font-bold mb-2">AgroSense</h1>
            <p className="text-lg opacity-90">Smart Cultivation</p>
          </div>
          
          {/* Loading animation */}
          <div className="flex items-center justify-center gap-2">
            <div className="w-3 h-3 bg-white/60 rounded-full animate-bounce"></div>
            <div className="w-3 h-3 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-3 h-3 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
          
          <p className="mt-4 text-sm opacity-75">Loading your smart farming assistant...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-primary/90 to-success flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Logo and Branding */}
        <div className="text-center text-white mb-12">
          <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6 backdrop-blur-sm">
            <Leaf className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold mb-2">AgroSense AI</h1>
          <p className="text-lg opacity-90 mb-2">Smart Cultivation</p>
          <p className="text-sm opacity-75">
            हिमालयी क्षेत्रों के लिए स्मार्ट खेती समाधान
          </p>
        </div>

        {/* Language Selection Card */}
        {showLanguageSelect && (
          <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-xl">
            <CardContent className="p-6">
              <div className="text-center mb-6">
                <Globe className="w-8 h-8 text-primary mx-auto mb-3" />
                <h2 className="text-xl font-semibold text-foreground mb-2">
                  Choose your language
                </h2>
                <p className="text-sm text-muted-foreground">
                  अपनी भाषा चुनें / Choose your preferred language
                </p>
              </div>

              <div className="space-y-3 mb-6">
                {languages.map((lang) => (
                  <Button
                    key={lang.code}
                    variant="outline"
                    className="w-full h-16 justify-between hover:bg-primary hover:text-primary-foreground transition-all duration-200"
                    onClick={() => onLanguageSelect(lang.code)}
                  >
                    <div className="text-left">
                      <div className="font-medium text-lg">{lang.name}</div>
                      <div className="text-sm opacity-75">{lang.englishName}</div>
                    </div>
                    <div className="w-6 h-6 border-2 border-muted-foreground rounded-full"></div>
                  </Button>
                ))}
              </div>

              {/* Voice Accessibility Toggle */}
              <div className="border-t pt-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="font-medium text-sm">Voice Assistant</p>
                    <p className="text-xs text-muted-foreground">
                      Enable audio guidance for low-literacy support
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={onToggleVoice}
                    className={`ml-3 ${voiceEnabled ? 'bg-primary text-primary-foreground hover:bg-primary/90' : ''}`}
                  >
                    {voiceEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                  </Button>
                </div>
              </div>

              {/* Features Preview */}
              <div className="mt-6 pt-4 border-t">
                <p className="text-xs text-muted-foreground text-center mb-3">
                  What you'll get:
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <Badge variant="secondary" className="justify-center py-1">
                    🔬 AI Crop Diagnosis
                  </Badge>
                  <Badge variant="secondary" className="justify-center py-1">
                    📱 AR Plant Assist
                  </Badge>
                  <Badge variant="secondary" className="justify-center py-1">
                    🌾 Smart Contracts
                  </Badge>
                  <Badge variant="secondary" className="justify-center py-1">
                    📊 Weather Alerts
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Footer */}
        <div className="text-center text-white/75 text-xs mt-8">
          <p>Designed for Uttarakhand farmers</p>
          <p>Offline-first • Multilingual • Voice-enabled</p>
        </div>
      </div>
    </div>
  )
}