import React, { useState } from 'react'
import { Button } from './ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Progress } from './ui/progress'
import { Camera, ArrowLeft, RotateCcw, CheckCircle, AlertTriangle, Info, Phone, Volume2 } from 'lucide-react'
import { ImageWithFallback } from './components/figma/ImageWithFallback'

interface DiagnosisFlowProps {
  onBack: () => void
  language: string
}

export function DiagnosisFlow({ onBack, language }: DiagnosisFlowProps) {
  const [step, setStep] = useState<'capture' | 'processing' | 'result'>('capture')
  const [capturedImage, setCapturedImage] = useState<string | null>(null)
  const [processing, setProcessing] = useState(false)

  const isHindi = language === 'hi'

  const mockDiagnosis = {
    disease: isHindi ? 'टमाटर में प्रारंभिक झुलसा रोग' : 'Early Blight in Tomato',
    confidence: 86,
    severity: 'medium',
    description: isHindi ? 
      'पत्तियों पर गहरे भूरे धब्बे दिखाई दे रहे हैं। यह कवक जनित रोग है।' :
      'Dark brown spots visible on leaves. This is a fungal disease.',
    immediateAction: isHindi ? 
      'तुरंत पानी कम करें और फंगीसाइड का छिड़काव करें' :
      'Reduce watering immediately and apply fungicide spray',
    detailedSteps: [
      isHindi ? 'संक्रमित पत्तियों को तोड़कर नष्ट करें' : 'Remove and destroy infected leaves',
      isHindi ? 'मैंकोजेब 75% का छिड़काव करें (2 ग्राम/लीटर)' : 'Spray Mancozeb 75% (2g/liter)',
      isHindi ? '7-10 दिन बाद दोबारा छिड़काव करें' : 'Repeat spray after 7-10 days',
      isHindi ? 'ड्रिप सिंचाई का उपयोग करें' : 'Use drip irrigation'
    ]
  }

  const handleCapture = () => {
    // Mock image capture
    setCapturedImage('/api/placeholder/300/300')
    setStep('processing')
    setProcessing(true)
    
    // Simulate AI processing
    setTimeout(() => {
      setProcessing(false)
      setStep('result')
    }, 3000)
  }

  const handleRetake = () => {
    setCapturedImage(null)
    setStep('capture')
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'text-success'
      case 'medium': return 'text-accent'
      case 'high': return 'text-destructive'
      default: return 'text-muted-foreground'
    }
  }

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'low': return <Badge className="bg-success text-success-foreground">Low</Badge>
      case 'medium': return <Badge className="bg-accent text-accent-foreground">Medium</Badge>
      case 'high': return <Badge variant="destructive">High</Badge>
      default: return <Badge variant="outline">Unknown</Badge>
    }
  }

  if (step === 'capture') {
    return (
      <div className="min-h-screen bg-black relative">
        {/* Camera Interface */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-transparent z-10">
          <div className="flex items-center justify-between p-6 text-white">
            <Button variant="ghost" size="sm" onClick={onBack} className="text-white hover:bg-white/20">
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="font-medium">
              {isHindi ? 'फसल की जांच' : 'Crop Diagnosis'}
            </h1>
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
              <Volume2 className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Camera Preview Mock */}
        <div className="flex items-center justify-center min-h-screen bg-gray-800">
          <div className="text-center text-white">
            <Camera className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <p className="text-lg mb-2">
              {isHindi ? 'कैमरा प्रीव्यू' : 'Camera Preview'}
            </p>
            <p className="text-sm opacity-75">
              {isHindi ? 'वास्तविक ऐप में लाइव कैमरा दिखेगा' : 'Live camera feed in actual app'}
            </p>
          </div>
        </div>

        {/* Capture Guidance Overlay */}
        <div className="absolute inset-0 z-20 pointer-events-none">
          <div className="flex items-center justify-center h-full">
            <div className="border-2 border-white/50 rounded-lg w-64 h-64 relative">
              <div className="absolute -top-8 left-0 right-0 text-center">
                <p className="text-white text-sm bg-black/50 px-3 py-1 rounded-full inline-block">
                  {isHindi ? 'एक पत्ती पर फोकस करें' : 'Focus on a single leaf'}
                </p>
              </div>
              {/* Corner markers */}
              <div className="absolute -top-1 -left-1 w-6 h-6 border-l-2 border-t-2 border-white"></div>
              <div className="absolute -top-1 -right-1 w-6 h-6 border-r-2 border-t-2 border-white"></div>
              <div className="absolute -bottom-1 -left-1 w-6 h-6 border-l-2 border-b-2 border-white"></div>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 border-r-2 border-b-2 border-white"></div>
            </div>
          </div>
        </div>

        {/* Capture Instructions */}
        <div className="absolute bottom-32 left-0 right-0 z-20 px-6">
          <Card className="bg-black/70 border-white/20 text-white">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Info className="w-4 h-4 text-accent" />
                <span className="text-sm font-medium">
                  {isHindi ? 'बेहतर परिणाम के लिए:' : 'For best results:'}
                </span>
              </div>
              <ul className="text-xs space-y-1 opacity-90">
                <li>• {isHindi ? '15-20 सेमी की दूरी रखें' : 'Keep 15-20cm distance'}</li>
                <li>• {isHindi ? 'अच्छी रोशनी में फोटो लें' : 'Ensure good lighting'}</li>
                <li>• {isHindi ? 'हाथ स्थिर रखें' : 'Hold steady'}</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Capture Button */}
        <div className="absolute bottom-8 left-0 right-0 z-20 px-6">
          <div className="flex items-center justify-center gap-4">
            <Button
              size="lg"
              className="w-16 h-16 rounded-full bg-white text-black hover:bg-gray-200"
              onClick={handleCapture}
            >
              <Camera className="w-6 h-6" />
            </Button>
          </div>
          <p className="text-center text-white text-sm mt-2">
            {isHindi ? 'फोटो लेने के लिए टैप करें' : 'Tap to capture'}
          </p>
        </div>
      </div>
    )
  }

  if (step === 'processing') {
    return (
      <div className="min-h-screen bg-background p-6 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            {capturedImage && (
              <div className="mb-6">
                <ImageWithFallback
                  src={capturedImage}
                  alt="Captured crop"
                  className="w-32 h-32 object-cover rounded-lg mx-auto mb-4"
                />
              </div>
            )}
            
            <div className="space-y-4">
              <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
              
              <div>
                <h3 className="font-medium mb-2">
                  {isHindi ? 'AI विश्लेषण चल रहा है...' : 'AI Analysis in Progress...'}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {isHindi ? 'कृपया प्रतीक्षा करें, यह कुछ सेकंड लेगा' : 'Please wait, this will take a few seconds'}
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>{isHindi ? 'छवि प्रसंस्करण' : 'Image Processing'}</span>
                  <span>100%</span>
                </div>
                <Progress value={100} className="h-2" />
                
                <div className="flex justify-between text-sm">
                  <span>{isHindi ? 'रोग पहचान' : 'Disease Detection'}</span>
                  <span>{processing ? '75%' : '100%'}</span>
                </div>
                <Progress value={processing ? 75 : 100} className="h-2" />
                
                <div className="flex justify-between text-sm">
                  <span>{isHindi ? 'सुझाव तैयार करना' : 'Generating Recommendations'}</span>
                  <span>{processing ? '25%' : '100%'}</span>
                </div>
                <Progress value={processing ? 25 : 100} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-primary text-primary-foreground p-6">
        <div className="flex items-center justify-between mb-4">
          <Button variant="ghost" size="sm" onClick={onBack} className="text-white hover:bg-primary/20">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="font-medium">
            {isHindi ? 'निदान परिणाम' : 'Diagnosis Result'}
          </h1>
          <div className="flex gap-2">
            <Button variant="ghost" size="sm" onClick={handleRetake} className="text-white hover:bg-primary/20">
              <RotateCcw className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="sm" className="text-white hover:bg-primary/20">
              <Volume2 className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6 -mt-4">
        {/* Main Result */}
        <Card className="border-2">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <CardTitle className="text-lg mb-2">{mockDiagnosis.disease}</CardTitle>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm text-muted-foreground">
                    {isHindi ? 'विश्वास स्तर:' : 'Confidence:'}
                  </span>
                  <span className={`font-medium ${getSeverityColor(mockDiagnosis.severity)}`}>
                    {mockDiagnosis.confidence}%
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">
                    {isHindi ? 'गंभीरता:' : 'Severity:'}
                  </span>
                  {getSeverityBadge(mockDiagnosis.severity)}
                </div>
              </div>
              {capturedImage && (
                <ImageWithFallback
                  src={capturedImage}
                  alt="Diagnosed crop"
                  className="w-20 h-20 object-cover rounded-lg ml-4"
                />
              )}
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">{mockDiagnosis.description}</p>
          </CardContent>
        </Card>

        {/* Immediate Action */}
        <Card className="border-accent/20 bg-accent/5">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-accent">
              <AlertTriangle className="w-5 h-5" />
              {isHindi ? 'तत्काल करें' : 'Immediate Action'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-medium">{mockDiagnosis.immediateAction}</p>
          </CardContent>
        </Card>

        {/* Detailed Steps */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-success" />
              {isHindi ? 'विस्तृत उपचार' : 'Detailed Treatment'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {mockDiagnosis.detailedSteps.map((step, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium mt-0.5">
                    {index + 1}
                  </div>
                  <p className="text-sm flex-1">{step}</p>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button className="w-full min-h-[48px]">
            <CheckCircle className="w-4 h-4 mr-2" />
            {isHindi ? 'उपचार शुरू करें' : 'Start Treatment'}
          </Button>
          
          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" className="min-h-[48px]">
              {isHindi ? 'रिपोर्ट सेव करें' : 'Save Report'}
            </Button>
            <Button variant="outline" className="min-h-[48px]">
              <Phone className="w-4 h-4 mr-2" />
              {isHindi ? 'विशेषज्ञ से संपर्क' : 'Call Expert'}
            </Button>
          </div>
        </div>

        {/* Model Improvement */}
        <Card className="bg-muted/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium mb-1">
                  {isHindi ? 'क्या यह निदान सही है?' : 'Is this diagnosis correct?'}
                </p>
                <p className="text-xs text-muted-foreground">
                  {isHindi ? 'आपकी प्रतिक्रिया AI को बेहतर बनाती है' : 'Your feedback helps improve AI accuracy'}
                </p>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline">
                  {isHindi ? 'हां' : 'Yes'}
                </Button>
                <Button size="sm" variant="outline">
                  {isHindi ? 'नहीं' : 'No'}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}