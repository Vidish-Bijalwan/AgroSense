import React, { useState } from 'react'
import { Button } from './ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Input } from './ui/input'
import { Badge } from './ui/badge'
import { Progress } from './ui/progress'
import { ArrowLeft, ArrowRight, Phone, Camera, MapPin, CheckCircle, User, Building, Fingerprint, Shield } from 'lucide-react'

interface OnboardingFlowProps {
  onComplete: (userType: 'farmer' | 'commercial') => void
  language: string
}

export function OnboardingFlow({ onComplete, language }: OnboardingFlowProps) {
  const [step, setStep] = useState(1)
  const [userType, setUserType] = useState<'farmer' | 'commercial' | null>(null)
  const [phoneNumber, setPhoneNumber] = useState('')
  const [otp, setOtp] = useState('')
  const [consentChecked, setConsentChecked] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    village: '',
    kycPhoto: null as string | null,
    selfie: null as string | null,
    championCode: ''
  })

  const isHindi = language === 'hi'
  const totalSteps = 6
  const progress = (step / totalSteps) * 100

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1)
    } else if (step === totalSteps && consentChecked) {
      onComplete(userType || 'farmer')
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const isStepValid = () => {
    switch (step) {
      case 1:
        return userType !== null
      case 2:
        return phoneNumber.length === 10
      case 3:
        return otp.length === 6
      case 4:
        return formData.kycPhoto && formData.selfie
      case 5:
        return formData.village.length > 0
      case 6:
        return consentChecked
      default:
        return true
    }
  }

  const renderUserTypeSelection = () => (
    <Card>
      <CardHeader>
        <CardTitle className="text-center">
          {isHindi ? 'आप कौन हैं?' : 'Who are you?'}
        </CardTitle>
        <p className="text-sm text-muted-foreground text-center">
          {isHindi ? 'अपना उपयोगकर्ता प्रकार चुनें' : 'Select your user type'}
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button
          variant={userType === 'farmer' ? 'default' : 'outline'}
          className="w-full h-20 flex-col gap-2"
          onClick={() => setUserType('farmer')}
        >
          <User className="w-6 h-6" />
          <div className="text-center">
            <div className="font-medium">{isHindi ? 'किसान' : 'Farmer'}</div>
            <div className="text-xs opacity-75">
              {isHindi ? 'फसल उगाना, बेचना' : 'Grow and sell crops'}
            </div>
          </div>
        </Button>

        <Button
          variant={userType === 'commercial' ? 'default' : 'outline'}
          className="w-full h-20 flex-col gap-2"
          onClick={() => setUserType('commercial')}
        >
          <Building className="w-6 h-6" />
          <div className="text-center">
            <div className="font-medium">{isHindi ? 'व्यापारी / फील्ड मैनेजर' : 'Commercial / Field Manager'}</div>
            <div className="text-xs opacity-75">
              {isHindi ? 'क्लस्टर प्रबंधन, खरीदारी' : 'Manage clusters, buying'}
            </div>
          </div>
        </Button>
      </CardContent>
    </Card>
  )

  const renderPhoneVerification = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Phone className="w-5 h-5 text-primary" />
          {isHindi ? 'फोन सत्यापन' : 'Phone Verification'}
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          {isHindi ? 'अपना मोबाइल नंबर दर्ज करें' : 'Enter your mobile number'}
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="block mb-2 text-sm font-medium">
            {isHindi ? 'मोबाइल नंबर' : 'Mobile Number'}
          </label>
          <div className="flex">
            <div className="flex items-center px-3 bg-muted border border-r-0 rounded-l-md">
              +91
            </div>
            <Input
              type="tel"
              placeholder="9876543210"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="rounded-l-none"
              maxLength={10}
            />
          </div>
        </div>

        <div className="bg-muted/50 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Shield className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">{isHindi ? 'डेटा सुरक्षा' : 'Data Security'}</span>
          </div>
          <p className="text-xs text-muted-foreground">
            {isHindi ? 
              'आपका फोन नंबर सुरक्षित है और केवल सत्यापन के लिए उपयोग किया जाएगा।' :
              'Your phone number is secure and will only be used for verification.'
            }
          </p>
        </div>

        <Button 
          className="w-full" 
          disabled={phoneNumber.length !== 10}
          onClick={handleNext}
        >
          {isHindi ? 'OTP भेजें' : 'Send OTP'}
        </Button>
      </CardContent>
    </Card>
  )

  const renderOTPVerification = () => (
    <Card>
      <CardHeader>
        <CardTitle>{isHindi ? 'OTP सत्यापन' : 'OTP Verification'}</CardTitle>
        <p className="text-sm text-muted-foreground">
          {isHindi ? 
            `+91 ${phoneNumber} पर भेजा गया कोड दर्ज करें` :
            `Enter the code sent to +91 ${phoneNumber}`
          }
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="block mb-2 text-sm font-medium">
            {isHindi ? '6-अंकीय OTP' : '6-Digit OTP'}
          </label>
          <Input
            type="number"
            placeholder="123456"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            maxLength={6}
            className="text-center text-lg tracking-widest"
          />
        </div>

        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-2">
            {isHindi ? 'कोड नहीं मिला?' : "Didn't receive code?"}
          </p>
          <Button variant="ghost" size="sm" className="text-primary">
            {isHindi ? 'दोबारा भेजें (30s)' : 'Resend (30s)'}
          </Button>
        </div>

        <Button 
          className="w-full" 
          disabled={otp.length !== 6}
          onClick={handleNext}
        >
          {isHindi ? 'सत्यापित करें' : 'Verify'}
        </Button>
      </CardContent>
    </Card>
  )

  const renderKYCCapture = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Camera className="w-5 h-5 text-primary" />
          {isHindi ? 'KYC सत्यापन' : 'KYC Verification'}
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          {isHindi ? 'पहचान सत्यापन के लिए फोटो लें' : 'Take photos for identity verification'}
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <Button
            variant="outline"
            className="w-full h-16 flex-col gap-2 relative"
            onClick={() => setFormData({...formData, kycPhoto: 'captured'})}
          >
            <Camera className="w-5 h-5" />
            <div className="text-center">
              <div className="text-sm font-medium">
                {isHindi ? 'पहचान पत्र की फोटो' : 'ID Card Photo'}
              </div>
              <div className="text-xs text-muted-foreground">
                {isHindi ? 'आधार, वोटर ID, या ड्राइविंग लाइसेंस' : 'Aadhaar, Voter ID, or Driving License'}
              </div>
            </div>
            {formData.kycPhoto && <CheckCircle className="w-4 h-4 text-success absolute top-2 right-2" />}
          </Button>

          <Button
            variant="outline"
            className="w-full h-16 flex-col gap-2 relative"
            onClick={() => setFormData({...formData, selfie: 'captured'})}
          >
            <User className="w-5 h-5" />
            <div className="text-center">
              <div className="text-sm font-medium">
                {isHindi ? 'सेल्फी फोटो' : 'Selfie Photo'}
              </div>
              <div className="text-xs text-muted-foreground">
                {isHindi ? 'स्पष्ट चेहरे की फोटो लें' : 'Take clear face photo'}
              </div>
            </div>
            {formData.selfie && <CheckCircle className="w-4 h-4 text-success absolute top-2 right-2" />}
          </Button>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-start gap-2">
            <Shield className="w-4 h-4 text-yellow-600 mt-0.5" />
            <div className="text-sm">
              <p className="font-medium text-yellow-800 mb-1">
                {isHindi ? 'गोपनीयता नोटिस' : 'Privacy Notice'}
              </p>
              <p className="text-yellow-700 text-xs">
                {isHindi ?
                  'आपकी तस्वीरें केवल पहचान सत्यापन के लिए उपयोग की जाएंगी और सुरक्षित रूप से संग्रहीत की जाएंगी।' :
                  'Your photos will only be used for identity verification and stored securely.'
                }
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  const renderVillageVerification = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="w-5 h-5 text-primary" />
          {isHindi ? 'गांव सत्यापन' : 'Village Verification'}
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          {isHindi ? 'अपने क्षेत्र की जानकारी दें' : 'Provide your area information'}
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="block mb-2 text-sm font-medium">
            {isHindi ? 'गांव/क्षेत्र का नाम' : 'Village/Area Name'}
          </label>
          <Input
            placeholder={isHindi ? 'जैसे: रामनगर' : 'e.g., Ramnagar'}
            value={formData.village}
            onChange={(e) => setFormData({...formData, village: e.target.value})}
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium">
            {isHindi ? 'स्थानीय चैंपियन कोड (वैकल्पिक)' : 'Local Champion Code (Optional)'}
          </label>
          <Input
            placeholder="LC001"
            value={formData.championCode}
            onChange={(e) => setFormData({...formData, championCode: e.target.value})}
          />
          <p className="text-xs text-muted-foreground mt-1">
            {isHindi ?
              'यदि आपके पास स्थानीय चैंपियन का कोड है तो दर्ज करें' :
              'Enter if you have a local champion referral code'
            }
          </p>
        </div>

        <div className="bg-muted/50 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <MapPin className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">{isHindi ? 'स्थान की पुष्टि' : 'Location Confirmation'}</span>
          </div>
          <p className="text-xs text-muted-foreground">
            {isHindi ?
              'आपका स्थान GPS से सत्यापित किया जाएगा।' :
              'Your location will be verified using GPS.'
            }
          </p>
          <Button variant="outline" size="sm" className="mt-2 w-full">
            <MapPin className="w-4 h-4 mr-2" />
            {isHindi ? 'वर्तमान स्थान का उपयोग करें' : 'Use Current Location'}
          </Button>
        </div>
      </CardContent>
    </Card>
  )

  const renderConsent = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-primary" />
          {isHindi ? 'डेटा उपयोग की सहमति' : 'Data Usage Consent'}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-primary/5 p-4 rounded-lg border border-primary/20">
          <h4 className="font-medium mb-3">{isHindi ? 'हम कैसे आपका डेटा उपयोग करते हैं:' : 'How we use your data:'}</h4>
          
          <div className="space-y-3 text-sm">
            <div className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-success mt-0.5" />
              <span>
                {isHindi ? 
                  'फसल रोग निदान और सुधार के लिए AI मॉडल प्रशिक्षण' :
                  'AI model training for crop disease diagnosis and improvement'
                }
              </span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-success mt-0.5" />
              <span>
                {isHindi ?
                  'व्यक्तिगत सुझाव और मौसम अलर्ट प्रदान करना' :
                  'Personalized recommendations and weather alerts'
                }
              </span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-success mt-0.5" />
              <span>
                {isHindi ?
                  'बाजार कनेक्शन और स्मार्ट कॉन्ट्रैक्ट सुविधा' :
                  'Market connections and smart contract facilitation'
                }
              </span>
            </div>
          </div>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-start gap-2">
            <Shield className="w-4 h-4 text-yellow-600 mt-0.5" />
            <div className="text-sm">
              <p className="font-medium text-yellow-800 mb-1">
                {isHindi ? 'महत्वपूर्ण:' : 'Important:'}
              </p>
              <ul className="text-yellow-700 text-xs space-y-1">
                <li>• {isHindi ? 'आपका व्यक्तिगत डेटा एन्क्रिप्टेड और सुरक्षित है' : 'Your personal data is encrypted and secure'}</li>
                <li>• {isHindi ? 'आप किसी भी समय डेटा साझाकरण रोक सकते हैं' : 'You can stop data sharing anytime'}</li>
                <li>• {isHindi ? 'कोई संवेदनशील जानकारी तीसरे पक्ष के साथ साझा नहीं की जाती' : 'No sensitive information shared with third parties'}</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 p-4 border rounded-lg">
          <input 
            type="checkbox" 
            id="consent" 
            className="w-4 h-4" 
            checked={consentChecked}
            onChange={(e) => setConsentChecked(e.target.checked)}
          />
          <label htmlFor="consent" className="text-sm flex-1">
            {isHindi ?
              'मैं समझता हूं और AgroSense AI द्वारा अपने डेटा के उपयोग के लिए सहमति देता हूं।' :
              'I understand and consent to the use of my data by AgroSense AI.'
            }
          </label>
        </div>

        <Button 
          className="w-full min-h-[48px]"
          onClick={() => onComplete(userType || 'farmer')}
          disabled={!consentChecked}
        >
          <Fingerprint className="w-4 h-4 mr-2" />
          {isHindi ? 'सहमति दें और जारी रखें' : 'Provide Consent & Continue'}
        </Button>
      </CardContent>
    </Card>
  )

  return (
    <div className="min-h-screen bg-background p-6 pb-20">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <Button variant="ghost" size="sm" onClick={handleBack} disabled={step === 1}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div className="text-center flex-1">
          <h1 className="font-medium">
            {isHindi ? 'खाता सेटअप' : 'Account Setup'}
          </h1>
          <p className="text-sm text-muted-foreground">
            {isHindi ? `चरण ${step} का ${totalSteps}` : `Step ${step} of ${totalSteps}`}
          </p>
        </div>
        <div className="w-10"></div>
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <Progress value={progress} className="h-2" />
      </div>

      {/* Step Content */}
      <div className="space-y-6">
        {step === 1 && renderUserTypeSelection()}
        {step === 2 && renderPhoneVerification()}
        {step === 3 && renderOTPVerification()}
        {step === 4 && renderKYCCapture()}
        {step === 5 && renderVillageVerification()}
        {step === 6 && renderConsent()}
      </div>

      {/* Navigation */}
      {step > 1 && step < 6 && (
        <div className="fixed bottom-6 left-6 right-6">
          <Button 
            className="w-full min-h-[48px]" 
            onClick={handleNext}
            disabled={!isStepValid()}
          >
            {isHindi ? 'आगे बढ़ें' : 'Continue'}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      )}

      {step === 1 && (
        <div className="fixed bottom-6 left-6 right-6">
          <Button 
            className="w-full min-h-[48px]" 
            onClick={handleNext}
            disabled={!userType}
          >
            {isHindi ? 'आगे बढ़ें' : 'Continue'}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      )}
    </div>
  )
}