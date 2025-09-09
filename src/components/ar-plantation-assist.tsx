import React, { useState } from 'react'
import { Button } from './ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { ArrowLeft, Maximize2, RotateCcw, Settings, Volume2, Grid3X3, Ruler } from 'lucide-react'

interface ARPlantationAssistProps {
  onBack: () => void
  language: string
}

export function ARPlantationAssist({ onBack, language }: ARPlantationAssistProps) {
  const [isActive, setIsActive] = useState(false)
  const [spacing, setSpacing] = useState(30) // cm
  const [depth, setDepth] = useState(3) // cm
  const [rows, setRows] = useState(6)

  const isHindi = language === 'hi'

  const cropSettings = [
    { crop: isHindi ? 'टमाटर' : 'Tomato', spacing: 30, depth: 2, rows: 6 },
    { crop: isHindi ? 'मिर्च' : 'Chili', spacing: 25, depth: 2, rows: 8 },
    { crop: isHindi ? 'गोभी' : 'Cauliflower', spacing: 35, depth: 3, rows: 5 },
    { crop: isHindi ? 'प्याज' : 'Onion', spacing: 15, depth: 1, rows: 12 }
  ]

  const handleCropSelect = (cropData: any) => {
    setSpacing(cropData.spacing)
    setDepth(cropData.depth)
    setRows(cropData.rows)
  }

  if (!isActive) {
    return (
      <div className="min-h-screen bg-background pb-20">
        {/* Header */}
        <div className="bg-accent text-accent-foreground p-6">
          <div className="flex items-center justify-between mb-4">
            <Button variant="ghost" size="sm" onClick={onBack} className="text-white hover:bg-accent/20">
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="font-medium text-white">
              {isHindi ? 'AR रोपण सहायता' : 'AR Plantation Assist'}
            </h1>
            <Button variant="ghost" size="sm" className="text-white hover:bg-accent/20">
              <Volume2 className="w-5 h-5" />
            </Button>
          </div>
          
          <Card className="bg-white/10 border-white/20 text-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90">{isHindi ? 'वर्तमान फसल' : 'Current Crop'}</p>
                  <p className="text-lg">{isHindi ? 'टमाटर' : 'Tomato'}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm opacity-90">{isHindi ? 'क्षेत्र' : 'Area'}</p>
                  <p className="text-sm">0.5 {isHindi ? 'बीघा' : 'Bigha'}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="p-6 space-y-6 -mt-4">
          {/* Crop Selection */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>{isHindi ? 'फसल चुनें' : 'Select Crop'}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                {cropSettings.map((crop, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="h-20 rounded-xl"
                    onClick={() => handleCropSelect(crop)}
                  >
                    <div className="text-center">
                      <div className="font-medium">{crop.crop}</div>
                      <div className="text-xs text-muted-foreground">
                        {crop.spacing}cm • {crop.depth}cm {isHindi ? 'गहरा' : 'deep'}
                      </div>
                    </div>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Current Settings */}
          <Card className="border-2 border-primary/20 bg-primary/5">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5 text-primary" />
                {isHindi ? 'वर्तमान सेटिंग्स' : 'Current Settings'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="bg-white rounded-lg p-3 border">
                    <Ruler className="w-5 h-5 text-primary mx-auto mb-2" />
                    <p className="text-2xl font-bold text-primary">{spacing}</p>
                    <p className="text-xs text-muted-foreground">
                      {isHindi ? 'सेमी दूरी' : 'cm spacing'}
                    </p>
                  </div>
                </div>
                <div>
                  <div className="bg-white rounded-lg p-3 border">
                    <div className="w-5 h-5 bg-primary rounded mx-auto mb-2"></div>
                    <p className="text-2xl font-bold text-primary">{depth}</p>
                    <p className="text-xs text-muted-foreground">
                      {isHindi ? 'सेमी गहराई' : 'cm depth'}
                    </p>
                  </div>
                </div>
                <div>
                  <div className="bg-white rounded-lg p-3 border">
                    <Grid3X3 className="w-5 h-5 text-primary mx-auto mb-2" />
                    <p className="text-2xl font-bold text-primary">{rows}</p>
                    <p className="text-xs text-muted-foreground">
                      {isHindi ? 'पंक्तियां' : 'rows'}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Instructions */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>{isHindi ? 'उपयोग निर्देश' : 'Instructions'}</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium mt-0.5">
                    1
                  </div>
                  <p className="text-sm flex-1">
                    {isHindi ? 
                      'अपने खेत में AR मोड शुरू करें' : 
                      'Start AR mode in your field'
                    }
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium mt-0.5">
                    2
                  </div>
                  <p className="text-sm flex-1">
                    {isHindi ? 
                      'फोन को जमीन पर पहली पंक्ति की दिशा में रखें' : 
                      'Point phone at ground for first row direction'
                    }
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium mt-0.5">
                    3
                  </div>
                  <p className="text-sm flex-1">
                    {isHindi ? 
                      'स्क्रीन पर दिखाई गई रेखाओं का पालन करें' : 
                      'Follow the lines shown on screen'
                    }
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium mt-0.5">
                    4
                  </div>
                  <p className="text-sm flex-1">
                    {isHindi ? 
                      'वॉयस गाइड सुनें और बीज रोपें' : 
                      'Listen to voice guide and plant seeds'
                    }
                  </p>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Start AR Button */}
          <Button 
            className="w-full min-h-[56px] bg-gradient-to-r from-accent to-accent/80 hover:from-accent/90 hover:to-accent/70"
            onClick={() => setIsActive(true)}
          >
            <Maximize2 className="w-5 h-5 mr-2" />
            {isHindi ? 'AR मोड शुरू करें' : 'Start AR Mode'}
          </Button>

          {/* Tips */}
          <Card className="bg-muted/50">
            <CardContent className="p-4">
              <h4 className="font-medium mb-2">
                {isHindi ? 'सुझाव:' : 'Tips:'}
              </h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• {isHindi ? 'दिन की रोशनी में उपयोग करें' : 'Use in daylight for best results'}</li>
                <li>• {isHindi ? 'फोन को स्थिर रखें' : 'Keep phone steady'}</li>
                <li>• {isHindi ? 'हेडफोन का उपयोग करें' : 'Use headphones for voice guidance'}</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  // AR Active Mode
  return (
    <div className="min-h-screen bg-black relative">
      {/* AR Camera Interface */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-transparent z-10">
        <div className="flex items-center justify-between p-6 text-white">
          <Button variant="ghost" size="sm" onClick={() => setIsActive(false)} className="text-white hover:bg-white/20">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="font-medium">AR {isHindi ? 'रोपण गाइड' : 'Planting Guide'}</h1>
          <div className="flex gap-2">
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
              <RotateCcw className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
              <Volume2 className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Mock AR Camera View */}
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="text-center text-white">
          <Grid3X3 className="w-16 h-16 mx-auto mb-4 opacity-50" />
          <p className="text-lg mb-2">
            {isHindi ? 'AR कैमरा व्यू' : 'AR Camera View'}
          </p>
          <p className="text-sm opacity-75">
            {isHindi ? 'वास्तविक ऐप में रोपण गाइड लाइनें दिखेंगी' : 'Live AR planting guidelines in actual app'}
          </p>
        </div>
      </div>

      {/* AR Overlay Mockup */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        {/* Grid Lines */}
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          {/* Horizontal lines */}
          {[20, 30, 40, 50, 60, 70, 80].map((y) => (
            <line
              key={`h-${y}`}
              x1="10"
              y1={y}
              x2="90"
              y2={y}
              stroke="rgba(243, 167, 18, 0.8)"
              strokeWidth="0.2"
              strokeDasharray="2,1"
            />
          ))}
          {/* Vertical lines */}
          {[15, 25, 35, 45, 55, 65, 75, 85].map((x) => (
            <line
              key={`v-${x}`}
              x1={x}
              y1="20"
              x2={x}
              y2="80"
              stroke="rgba(243, 167, 18, 0.8)"
              strokeWidth="0.2"
              strokeDasharray="2,1"
            />
          ))}
          {/* Planting points */}
          {[25, 35, 45, 55, 65, 75].map((y) =>
            [25, 35, 45, 55, 65, 75].map((x) => (
              <circle
                key={`point-${x}-${y}`}
                cx={x}
                cy={y}
                r="0.8"
                fill="rgba(243, 167, 18, 0.9)"
                stroke="white"
                strokeWidth="0.2"
              />
            ))
          )}
        </svg>
      </div>

      {/* AR Status Panel */}
      <div className="absolute top-20 left-4 right-4 z-30">
        <Card className="bg-black/70 border-accent/30 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-accent rounded-full animate-pulse"></div>
                <span className="text-sm">
                  {isHindi ? 'AR ट्रैकिंग सक्रिय' : 'AR Tracking Active'}
                </span>
              </div>
              <Badge className="bg-accent text-accent-foreground">
                {spacing}cm
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Voice Instructions */}
      <div className="absolute bottom-32 left-4 right-4 z-30">
        <Card className="bg-black/70 border-white/20 text-white">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Volume2 className="w-5 h-5 text-accent" />
              <div className="flex-1">
                <p className="text-sm font-medium">
                  {isHindi ? 
                    'अब 30 सेमी की दूरी पर बीज रोपें। अगले बिंदु तक जाएं।' :
                    'Plant seed at 30cm spacing. Move to next point.'
                  }
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex-1 bg-white/20 rounded-full h-1">
                    <div className="h-1 bg-accent rounded-full w-1/3"></div>
                  </div>
                  <span className="text-xs">8/24</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AR Controls */}
      <div className="absolute bottom-8 left-4 right-4 z-30">
        <div className="flex items-center justify-center gap-4">
          <Button
            variant="outline"
            size="sm"
            className="bg-black/50 border-white/30 text-white hover:bg-white/20"
          >
            {isHindi ? 'रोकें' : 'Pause'}
          </Button>
          <Button
            size="lg"
            className="bg-accent hover:bg-accent/90"
          >
            {isHindi ? 'अगला बिंदु' : 'Next Point'}
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="bg-black/50 border-white/30 text-white hover:bg-white/20"
          >
            {isHindi ? 'समाप्त' : 'Finish'}
          </Button>
        </div>
      </div>
    </div>
  )
}