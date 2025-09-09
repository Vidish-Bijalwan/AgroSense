import React, { useState } from 'react'
import { Button } from './ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Input } from './ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { MapPin, Camera, Plus, Edit, Droplets, Thermometer, Leaf, Users } from 'lucide-react'
import { ImageWithFallback } from './figma/ImageWithFallback'

interface LandManagementProps {
  userType: 'farmer' | 'commercial'
  language: string
}

export function LandManagement({ userType, language }: LandManagementProps) {
  const [showAddForm, setShowAddForm] = useState(false)
  const isHindi = language === 'hi'

  const farmerFields = [
    {
      id: 1,
      name: isHindi ? 'मुख्य खेत' : 'Main Field',
      area: '1.2 ' + (isHindi ? 'बीघा' : 'Bigha'),
      crop: isHindi ? 'टमाटर' : 'Tomato',
      planted: isHindi ? '15 दिन पहले' : '15 days ago',
      health: 85,
      soilMoisture: 65,
      temperature: 28,
      image: '/api/placeholder/120/80',
      status: 'healthy'
    },
    {
      id: 2,
      name: isHindi ? 'पहाड़ी खेत' : 'Hill Field',
      area: '0.8 ' + (isHindi ? 'बीघा' : 'Bigha'),
      crop: isHindi ? 'मिर्च' : 'Chili',
      planted: isHindi ? '25 दिन पहले' : '25 days ago',
      health: 92,
      soilMoisture: 70,
      temperature: 26,
      image: '/api/placeholder/120/80',
      status: 'excellent'
    },
    {
      id: 3,
      name: isHindi ? 'निचला खेत' : 'Lower Field',
      area: '0.5 ' + (isHindi ? 'बीघा' : 'Bigha'),
      crop: isHindi ? 'गोभी' : 'Cauliflower',
      planted: isHindi ? '8 दिन पहले' : '8 days ago',
      health: 68,
      soilMoisture: 45,
      temperature: 30,
      image: '/api/placeholder/120/80',
      status: 'attention'
    }
  ]

  const commercialClusters = [
    {
      id: 1,
      name: 'Ramnagar Cluster A',
      fields: 24,
      farmers: 18,
      totalArea: '45 ' + (isHindi ? 'बीघा' : 'Bigha'),
      crop: isHindi ? 'टमाटर' : 'Tomato',
      health: 85,
      location: isHindi ? 'रामनगर' : 'Ramnagar',
      coordinator: isHindi ? 'राम सिंह' : 'Ram Singh',
      status: 'active'
    },
    {
      id: 2,
      name: 'Doiwala Cluster B',
      fields: 18,
      farmers: 14,
      totalArea: '32 ' + (isHindi ? 'बीघा' : 'Bigha'),
      crop: isHindi ? 'मिर्च' : 'Chili',
      health: 78,
      location: isHindi ? 'दोईवाला' : 'Doiwala',
      coordinator: isHindi ? 'सुनीता देवी' : 'Sunita Devi',
      status: 'active'
    }
  ]

  const getHealthColor = (health: number) => {
    if (health >= 80) return 'text-success'
    if (health >= 60) return 'text-accent'
    return 'text-destructive'
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'excellent':
        return <Badge className="bg-success text-success-foreground">Excellent</Badge>
      case 'healthy':
        return <Badge className="bg-primary text-primary-foreground">Healthy</Badge>
      case 'attention':
        return <Badge variant="secondary">Needs Attention</Badge>
      case 'active':
        return <Badge className="bg-primary text-primary-foreground">Active</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const renderAddFieldForm = () => (
    <Card className="mb-6">
      <CardHeader className="pb-3">
        <CardTitle>{isHindi ? 'नया खेत जोड़ें' : 'Add New Field'}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="block mb-2">{isHindi ? 'खेत का नाम' : 'Field Name'}</label>
          <Input placeholder={isHindi ? 'जैसे: मुख्य खेत' : 'e.g., Main Field'} />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-2">{isHindi ? 'क्षेत्रफल' : 'Area'}</label>
            <Input placeholder={isHindi ? '1.5' : '1.5'} />
          </div>
          <div>
            <label className="block mb-2">{isHindi ? 'इकाई' : 'Unit'}</label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder={isHindi ? 'बीघा' : 'Bigha'} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bigha">{isHindi ? 'बीघा' : 'Bigha'}</SelectItem>
                <SelectItem value="acre">{isHindi ? 'एकड़' : 'Acre'}</SelectItem>
                <SelectItem value="hectare">{isHindi ? 'हेक्टेयर' : 'Hectare'}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <label className="block mb-2">{isHindi ? 'वर्तमान फसल' : 'Current Crop'}</label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder={isHindi ? 'फसल चुनें' : 'Select crop'} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="tomato">{isHindi ? 'टमाटर' : 'Tomato'}</SelectItem>
              <SelectItem value="chili">{isHindi ? 'मिर्च' : 'Chili'}</SelectItem>
              <SelectItem value="cauliflower">{isHindi ? 'गोभी' : 'Cauliflower'}</SelectItem>
              <SelectItem value="onion">{isHindi ? 'प्याज' : 'Onion'}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block mb-2">{isHindi ? 'पानी का स्रोत' : 'Water Source'}</label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder={isHindi ? 'स्रोत चुनें' : 'Select source'} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="borewell">{isHindi ? 'बोरवेल' : 'Borewell'}</SelectItem>
              <SelectItem value="canal">{isHindi ? 'नहर' : 'Canal'}</SelectItem>
              <SelectItem value="rain">{isHindi ? 'बारिश' : 'Rainwater'}</SelectItem>
              <SelectItem value="river">{isHindi ? 'नदी' : 'River'}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="bg-muted/50 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Camera className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">{isHindi ? 'खेत की फोटो लें' : 'Capture Field Photo'}</span>
          </div>
          <Button variant="outline" className="w-full">
            <Camera className="w-4 h-4 mr-2" />
            {isHindi ? 'फोटो लें और सीमा चिह्नित करें' : 'Take Photo & Mark Boundary'}
          </Button>
        </div>

        <div className="flex gap-2">
          <Button className="flex-1">
            {isHindi ? 'खेत जोड़ें' : 'Add Field'}
          </Button>
          <Button variant="outline" onClick={() => setShowAddForm(false)}>
            {isHindi ? 'रद्द' : 'Cancel'}
          </Button>
        </div>
      </CardContent>
    </Card>
  )

  const renderFarmerFields = () => (
    <div className="space-y-4">
      {farmerFields.map((field) => (
        <Card key={field.id} className="hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex gap-4">
              <ImageWithFallback
                src={field.image}
                alt={field.name}
                className="w-24 h-16 object-cover rounded-lg"
              />
              
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="font-medium">{field.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {field.area} • {field.crop}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusBadge(field.status)}
                    <Button variant="ghost" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-2 text-xs mb-3">
                  <div className="flex items-center gap-1">
                    <Leaf className={`w-3 h-3 ${getHealthColor(field.health)}`} />
                    <span>{field.health}%</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Droplets className="w-3 h-3 text-primary" />
                    <span>{field.soilMoisture}%</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Thermometer className="w-3 h-3 text-accent" />
                    <span>{field.temperature}°C</span>
                  </div>
                </div>

                <p className="text-xs text-muted-foreground">
                  {isHindi ? 'बोया गया:' : 'Planted:'} {field.planted}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )

  const renderCommercialClusters = () => (
    <div className="space-y-4">
      {commercialClusters.map((cluster) => (
        <Card key={cluster.id} className="hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h4 className="font-medium">{cluster.name}</h4>
                <p className="text-sm text-muted-foreground flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {cluster.location}
                </p>
              </div>
              <div className="flex items-center gap-2">
                {getStatusBadge(cluster.status)}
                <Button variant="ghost" size="sm">
                  <Edit className="w-4 h-4" />
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-sm mb-3">
              <div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{isHindi ? 'किसान:' : 'Farmers:'}</span>
                  <span>{cluster.farmers}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{isHindi ? 'खेत:' : 'Fields:'}</span>
                  <span>{cluster.fields}</span>
                </div>
              </div>
              <div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{isHindi ? 'क्षेत्र:' : 'Area:'}</span>
                  <span>{cluster.totalArea}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{isHindi ? 'फसल:' : 'Crop:'}</span>
                  <span>{cluster.crop}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  {isHindi ? 'समन्वयक:' : 'Coordinator:'} {cluster.coordinator}
                </span>
              </div>
              <span className={`text-sm font-medium ${getHealthColor(cluster.health)}`}>
                {isHindi ? 'स्वास्थ्य:' : 'Health:'} {cluster.health}%
              </span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-primary text-primary-foreground p-6">
        <h1 className="text-white mb-2">
          {userType === 'farmer' ? 
            (isHindi ? 'भूमि प्रबंधन' : 'Land Management') :
            (isHindi ? 'क्लस्टर प्रबंधन' : 'Cluster Management')
          }
        </h1>
        <p className="text-primary-foreground/80 text-sm">
          {userType === 'farmer' ?
            (isHindi ? 'अपने खेतों को ट्रैक और प्रबंधित करें' : 'Track and manage your fields') :
            (isHindi ? 'किसान समूहों का प्रबंधन करें' : 'Manage farmer groups')
          }
        </p>
      </div>

      <div className="p-6 -mt-4 space-y-6">
        {/* Add Button */}
        {!showAddForm && (
          <Card className="border-2 border-dashed border-primary/30 bg-primary/5">
            <CardContent className="p-6 text-center">
              <Plus className="w-8 h-8 text-primary mx-auto mb-3" />
              <h3 className="font-medium mb-2">
                {userType === 'farmer' ?
                  (isHindi ? 'नया खेत जोड़ें' : 'Add New Field') :
                  (isHindi ? 'नया क्लस्टर बनाएं' : 'Create New Cluster')
                }
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                {userType === 'farmer' ?
                  (isHindi ? 'AR की मदद से सीमा चिह्नित करें' : 'Mark boundaries with AR assistance') :
                  (isHindi ? 'किसानों को जोड़ें और समझौते बनाएं' : 'Add farmers and create contracts')
                }
              </p>
              <Button onClick={() => setShowAddForm(true)} className="min-h-[44px]">
                <Plus className="w-4 h-4 mr-2" />
                {userType === 'farmer' ?
                  (isHindi ? 'खेत जोड़ें' : 'Add Field') :
                  (isHindi ? 'क्लस्टर बनाएं' : 'Create Cluster')
                }
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Add Form */}
        {showAddForm && renderAddFieldForm()}

        {/* Summary Stats */}
        <div className="grid grid-cols-3 gap-4">
          <Card className="text-center">
            <CardContent className="p-4">
              <p className="text-2xl font-bold text-primary">
                {userType === 'farmer' ? '3' : '2'}
              </p>
              <p className="text-xs text-muted-foreground">
                {userType === 'farmer' ?
                  (isHindi ? 'खेत' : 'Fields') :
                  (isHindi ? 'क्लस्टर' : 'Clusters')
                }
              </p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-4">
              <p className="text-2xl font-bold text-success">
                {userType === 'farmer' ? '2.5' : '77'}
              </p>
              <p className="text-xs text-muted-foreground">
                {userType === 'farmer' ?
                  (isHindi ? 'बीघा' : 'Bigha') :
                  (isHindi ? 'बीघा' : 'Bigha')
                }
              </p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-4">
              <p className="text-2xl font-bold text-accent">
                {userType === 'farmer' ? '82%' : '32'}
              </p>
              <p className="text-xs text-muted-foreground">
                {userType === 'farmer' ?
                  (isHindi ? 'औसत स्वास्थ्य' : 'Avg Health') :
                  (isHindi ? 'किसान' : 'Farmers')
                }
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Fields/Clusters List */}
        {userType === 'farmer' ? renderFarmerFields() : renderCommercialClusters()}
      </div>
    </div>
  )
}