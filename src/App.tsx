import React, { useState } from 'react'
import { SplashScreen } from './components/splash-screen'
import { OnboardingFlow } from './components/onboarding-flow'
import { FarmerHome } from './components/farmer-home'
import { CommercialDashboard } from './components/commercial-dashboard'
import { DiagnosisFlow } from './components/diagnosis-flow'
import { MarketplaceScreen } from './components/marketplace-screen'
import { LandManagement } from './components/land-management'
import { ARPlantationAssist } from './components/ar-plantation-assist'
import { Navigation } from './components/navigation'
import { SettingsScreen } from './components/settings-screen'
import { ClustersScreen } from './components/clusters-screen'
import { ContractsScreen } from './components/contracts-screen'

type AppState = 'splash' | 'onboarding' | 'main'
type UserType = 'farmer' | 'commercial'
type Screen = 'home' | 'dashboard' | 'diagnosis' | 'marketplace' | 'land' | 'ar-assist' | 'clusters' | 'contracts' | 'settings'

export default function App() {
  const [appState, setAppState] = useState<AppState>('splash')
  const [language, setLanguage] = useState('en')
  const [voiceEnabled, setVoiceEnabled] = useState(false)
  const [userType, setUserType] = useState<UserType>('farmer')
  const [currentScreen, setCurrentScreen] = useState<Screen>('home')

  const handleLanguageSelect = (lang: string) => {
    setLanguage(lang)
    setAppState('onboarding')
  }

  const handleToggleVoice = () => {
    setVoiceEnabled(!voiceEnabled)
  }

  const handleOnboardingComplete = (type: UserType) => {
    setUserType(type)
    setAppState('main')
    setCurrentScreen(type === 'farmer' ? 'home' : 'dashboard')
  }

  const handleNavigate = (screen: string) => {
    setCurrentScreen(screen as Screen)
  }

  const renderMainContent = () => {
    switch (currentScreen) {
      case 'home':
        return <FarmerHome onNavigate={handleNavigate} language={language} />
      case 'dashboard':
        return <CommercialDashboard onNavigate={handleNavigate} language={language} />
      case 'diagnosis':
        return <DiagnosisFlow onBack={() => setCurrentScreen('home')} language={language} />
      case 'marketplace':
        return <MarketplaceScreen userType={userType} language={language} />
      case 'land':
        return <LandManagement userType={userType} language={language} />
      case 'ar-assist':
        return <ARPlantationAssist onBack={() => setCurrentScreen('home')} language={language} />
      case 'clusters':
        return <ClustersScreen onBack={() => setCurrentScreen('dashboard')} language={language} />
      case 'contracts':
        return <ContractsScreen onBack={() => setCurrentScreen('dashboard')} language={language} />
      case 'settings':
        return <SettingsScreen onBack={() => setCurrentScreen(userType === 'farmer' ? 'home' : 'dashboard')} language={language} />
      default:
        return userType === 'farmer' ? 
          <FarmerHome onNavigate={handleNavigate} language={language} /> :
          <CommercialDashboard onNavigate={handleNavigate} language={language} />
    }
  }

  if (appState === 'splash') {
    return (
      <SplashScreen
        onLanguageSelect={handleLanguageSelect}
        onToggleVoice={handleToggleVoice}
        voiceEnabled={voiceEnabled}
      />
    )
  }

  if (appState === 'onboarding') {
    return (
      <OnboardingFlow
        onComplete={handleOnboardingComplete}
        language={language}
      />
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {renderMainContent()}
      <Navigation
        currentScreen={currentScreen}
        onNavigate={handleNavigate}
        userType={userType}
      />
    </div>
  )
}