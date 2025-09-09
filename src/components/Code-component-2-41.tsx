import React, { useState } from 'react'
import { Button } from './ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Input } from './ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Search, Filter, MapPin, Star, Phone, MessageCircle, Plus, TrendingUp } from 'lucide-react'
import { ImageWithFallback } from '/home/zerosirus/Desktop/projects 5 sem/SIH/AgroSense AI Smartphone Prototype/src/components/figma/ImageWithFallback.tsx'

interface MarketplaceScreenProps {
  userType: 'farmer' | 'commercial'
  language: string
}

export function MarketplaceScreen({ userType, language }: MarketplaceScreenProps) {
  const [activeTab, setActiveTab] = useState(userType === 'farmer' ? 'sell' : 'buy')
  const isHindi = language === 'hi'

  const cropOffers = [
    {
      id: 1,
      crop: isHindi ? 'टमाटर' : 'Tomato',
      quantity: '500 kg',
      price: '₹35/kg',
      location: isHindi ? 'रामनगर' : 'Ramnagar',
      distance: '2.3 km',
      quality: 'A Grade',
      farmer: isHindi ? 'राम सिंह' : 'Ram Singh',
      rating: 4.8,
      image: '/api/placeholder/80/80',
      urgent: true
    },
    {
      id: 2,
      crop: isHindi ? 'मिर्च' : 'Chili',
      quantity: '200 kg',
      price: '₹45/kg',
      location: isHindi ? 'दोईवाला' : 'Doiwala',
      distance: '5.1 km',
      quality: 'Premium',
      farmer: isHindi ? 'सुनीता देवी' : 'Sunita Devi',
      rating: 4.9,
      image: '/api/placeholder/80/80'
    },
    {
      id: 3,
      crop: isHindi ? 'गोभी' : 'Cauliflower',
      quantity: '300 kg',
      price: '₹25/kg',
      location: isHindi ? 'सेलाकुई' : 'Selaqui',
      distance: '8.2 km',
      quality: 'A Grade',
      farmer: isHindi ? 'मोहन लाल' : 'Mohan Lal',
      rating: 4.6,
      image: '/api/placeholder/80/80'
    }
  ]

  const buyerRequests = [
    {
      id: 1,
      buyer: 'Green Valley Traders',
      crop: isHindi ? 'टमाटर' : 'Tomato',
      quantity: '2000 kg',
      price: '₹32/kg',
      location: isHindi ? 'देहरादून' : 'Dehradun',
      requirements: isHindi ? 'A ग्रेड, जैविक' : 'A Grade, Organic',
      deadline: isHindi ? '3 दिन' : '3 days',
      rating: 4.7
    },
    {
      id: 2,
      buyer: 'Fresh Foods Ltd',
      crop: isHindi ? 'मिर्च' : 'Chili',
      quantity: '800 kg',
      price: '₹48/kg',
      location: isHindi ? 'हरिद्वार' : 'Haridwar',
      requirements: isHindi ? 'प्रीमियम गुणवत्ता' : 'Premium Quality',
      deadline: isHindi ? '5 दिन' : '5 days',
      rating: 4.9
    }
  ]

  const marketTrends = [
    { crop: isHindi ? 'टमाटर' : 'Tomato', price: '₹35', change: '+5%', trend: 'up' },
    { crop: isHindi ? 'मिर्च' : 'Chili', price: '₹45', change: '+12%', trend: 'up' },
    { crop: isHindi ? 'गोभी' : 'Cauliflower', price: '₹25', change: '-3%', trend: 'down' },
    { crop: isHindi ? 'प्याज' : 'Onion', price: '₹28', change: '+8%', trend: 'up' }
  ]

  const renderSellTab = () => (
    <div className="space-y-6">
      {/* Add New Listing */}
      <Card className="border-2 border-dashed border-primary/30 bg-primary/5">
        <CardContent className="p-6 text-center">
          <Plus className="w-8 h-8 text-primary mx-auto mb-3" />
          <h3 className="font-medium mb-2">
            {isHindi ? 'अपनी फसल बेचें' : 'Sell Your Crop'}
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            {isHindi ? 'तस्वीर लें और तुरंत बेचना शुरू करें' : 'Take photos and start selling instantly'}
          </p>
          <Button className="min-h-[44px]">
            <Plus className="w-4 h-4 mr-2" />
            {isHindi ? 'नई लिस्टिंग जोड़ें' : 'Add New Listing'}
          </Button>
        </CardContent>
      </Card>

      {/* Market Trends */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-success" />
            {isHindi ? 'बाज़ार के भाव' : 'Market Trends'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {marketTrends.map((trend, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div className="flex-1">
                  <p className="font-medium">{trend.crop}</p>
                  <p className="text-sm text-muted-foreground">{isHindi ? 'प्रति किलो' : 'per kg'}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">{trend.price}</p>
                  <p className={`text-sm ${trend.trend === 'up' ? 'text-success' : 'text-destructive'}`}>
                    {trend.change}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Buyer Requests */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>{isHindi ? 'खरीदार अनुरोध' : 'Buyer Requests'}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {buyerRequests.map((request) => (
            <div key={request.id} className="p-4 border border-border rounded-lg">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h4 className="font-medium">{request.buyer}</h4>
                  <div className="flex items-center gap-1 mt-1">
                    <Star className="w-3 h-3 fill-accent text-accent" />
                    <span className="text-xs text-muted-foreground">{request.rating}</span>
                  </div>
                </div>
                <Badge className="bg-success text-success-foreground">
                  {request.price}
                </Badge>
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{isHindi ? 'फसल:' : 'Crop:'}</span>
                  <span>{request.crop} • {request.quantity}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{isHindi ? 'आवश्यकताएं:' : 'Requirements:'}</span>
                  <span>{request.requirements}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{isHindi ? 'समय सीमा:' : 'Deadline:'}</span>
                  <span className="text-destructive">{request.deadline}</span>
                </div>
              </div>

              <div className="flex gap-2 mt-4">
                <Button size="sm" className="flex-1">
                  {isHindi ? 'प्रस्ताव भेजें' : 'Send Offer'}
                </Button>
                <Button size="sm" variant="outline">
                  <MessageCircle className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )

  const renderBuyTab = () => (
    <div className="space-y-6">
      {/* Search and Filter */}
      <div className="flex gap-2">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder={isHindi ? 'फसल खोजें...' : 'Search crops...'}
            className="pl-10"
          />
        </div>
        <Button variant="outline" size="sm" className="min-w-[44px]">
          <Filter className="w-4 h-4" />
        </Button>
      </div>

      {/* Available Crops */}
      <div className="space-y-4">
        {cropOffers.map((offer) => (
          <Card key={offer.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex gap-4">
                <ImageWithFallback
                  src={offer.image}
                  alt={offer.crop}
                  className="w-20 h-20 object-cover rounded-lg"
                />
                
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-medium">{offer.crop}</h4>
                      <p className="text-sm text-muted-foreground">{offer.farmer}</p>
                      <div className="flex items-center gap-1 mt-1">
                        <Star className="w-3 h-3 fill-accent text-accent" />
                        <span className="text-xs text-muted-foreground">{offer.rating}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge className="bg-success text-success-foreground mb-1">
                        {offer.price}
                      </Badge>
                      {offer.urgent && (
                        <Badge variant="destructive" className="text-xs block">
                          {isHindi ? 'जल्दी' : 'Urgent'}
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">{isHindi ? 'मात्रा:' : 'Quantity:'}</span>
                      <span>{offer.quantity}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">{isHindi ? 'गुणवत्ता:' : 'Quality:'}</span>
                      <span>{offer.quality}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">{isHindi ? 'स्थान:' : 'Location:'}</span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {offer.location} • {offer.distance}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-2 mt-3">
                    <Button size="sm" className="flex-1">
                      {isHindi ? 'ऑर्डर दें' : 'Place Order'}
                    </Button>
                    <Button size="sm" variant="outline">
                      <Phone className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <MessageCircle className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-success text-success-foreground p-6">
        <h1 className="text-white mb-2">
          {isHindi ? 'कृषि बाज़ार' : 'Agricultural Marketplace'}
        </h1>
        <p className="text-success-foreground/80 text-sm">
          {isHindi ? 'प्रत्यक्ष किसान-खरीदार कनेक्शन' : 'Direct farmer-buyer connection'}
        </p>
      </div>

      <div className="p-6 -mt-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="sell" className="min-h-[44px]">
              {isHindi ? 'बेचें' : 'Sell'}
            </TabsTrigger>
            <TabsTrigger value="buy" className="min-h-[44px]">
              {isHindi ? 'खरीदें' : 'Buy'}
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="sell">
            {renderSellTab()}
          </TabsContent>
          
          <TabsContent value="buy">
            {renderBuyTab()}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}