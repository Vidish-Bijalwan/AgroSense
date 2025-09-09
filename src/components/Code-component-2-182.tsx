import React from 'react'
import { Button } from './ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { ArrowLeft, FileText, Calendar, DollarSign, Users, TrendingUp } from 'lucide-react'

interface ContractsScreenProps {
  onBack: () => void
  language: string
}

export function ContractsScreen({ onBack, language }: ContractsScreenProps) {
  const isHindi = language === 'hi'

  const contracts = [
    {
      id: 'CON001',
      farmer: isHindi ? 'राम शर्मा' : 'Ram Sharma',
      crop: 'Rice',
      quantity: '500 kg',
      rate: '₹25/kg',
      status: 'active',
      deliveryDate: '2024-12-15',
      progress: 75
    },
    {
      id: 'CON002',
      farmer: isHindi ? 'सीता देवी' : 'Sita Devi',
      crop: 'Wheat',
      quantity: '300 kg',
      rate: '₹22/kg',
      status: 'pending',
      deliveryDate: '2024-12-20',
      progress: 30
    },
    {
      id: 'CON003',
      farmer: isHindi ? 'गोपाल सिंह' : 'Gopal Singh',
      crop: 'Cotton',
      quantity: '200 kg',
      rate: '₹45/kg',
      status: 'completed',
      deliveryDate: '2024-11-30',
      progress: 100
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-primary'
      case 'pending':
        return 'bg-yellow-500'
      case 'completed':
        return 'bg-success'
      default:
        return 'bg-muted'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return isHindi ? 'सक्रिय' : 'Active'
      case 'pending':
        return isHindi ? 'लंबित' : 'Pending'
      case 'completed':
        return isHindi ? 'पूर्ण' : 'Completed'
      default:
        return status
    }
  }

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
              {isHindi ? 'अनुबंध प्रबंधन' : 'Contract Management'}
            </h1>
            <p className="text-sm text-muted-foreground">
              {isHindi ? 'किसान अनुबंधों का प्रबंधन करें' : 'Manage farmer contracts'}
            </p>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    {isHindi ? 'कुल अनुबंध' : 'Total Contracts'}
                  </p>
                  <p className="text-xl font-medium">12</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-success" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    {isHindi ? 'कुल मूल्य' : 'Total Value'}
                  </p>
                  <p className="text-xl font-medium">₹2.5L</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-yellow-500/10 rounded-lg flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    {isHindi ? 'लंबित' : 'Pending'}
                  </p>
                  <p className="text-xl font-medium">5</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Contracts List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-medium">
              {isHindi ? 'हाल के अनुबंध' : 'Recent Contracts'}
            </h2>
            <Button size="sm">
              {isHindi ? 'नया अनुबंध' : 'New Contract'}
            </Button>
          </div>

          {contracts.map((contract) => (
            <Card key={contract.id}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-medium">{contract.farmer}</h3>
                      <Badge 
                        className={`${getStatusColor(contract.status)} text-white`}
                      >
                        {getStatusText(contract.status)}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {isHindi ? 'अनुबंध ID:' : 'Contract ID:'} {contract.id}
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    {isHindi ? 'विवरण' : 'Details'}
                  </Button>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-3">
                  <div>
                    <p className="text-xs text-muted-foreground">
                      {isHindi ? 'फसल' : 'Crop'}
                    </p>
                    <p className="text-sm font-medium">{contract.crop}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">
                      {isHindi ? 'मात्रा' : 'Quantity'}
                    </p>
                    <p className="text-sm font-medium">{contract.quantity}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">
                      {isHindi ? 'दर' : 'Rate'}
                    </p>
                    <p className="text-sm font-medium">{contract.rate}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">
                      {isHindi ? 'डिलीवरी' : 'Delivery'}
                    </p>
                    <p className="text-sm font-medium">{contract.deliveryDate}</p>
                  </div>
                </div>

                {contract.status === 'active' && (
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-xs text-muted-foreground">
                        {isHindi ? 'प्रगति' : 'Progress'}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {contract.progress}%
                      </p>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full transition-all duration-300"
                        style={{ width: `${contract.progress}%` }}
                      ></div>
                    </div>
                  </div>
                )}
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
              <FileText className="w-4 h-4 mr-2" />
              {isHindi ? 'नया अनुबंध बनाएं' : 'Create New Contract'}
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <TrendingUp className="w-4 h-4 mr-2" />
              {isHindi ? 'अनुबंध रिपोर्ट' : 'Contract Reports'}
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Users className="w-4 h-4 mr-2" />
              {isHindi ? 'किसान खोजें' : 'Find Farmers'}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}