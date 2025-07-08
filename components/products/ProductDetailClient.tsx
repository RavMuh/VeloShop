'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  ShoppingCart, 
  Heart, 
  Share2, 
  Star, 
  ArrowLeft,
  Truck,
  Shield,
  RotateCcw
} from 'lucide-react';
import { Product } from '@/lib/types';
import { useStore } from '@/lib/store';
import Price from '@/components/ui/Price';

interface ProductDetailClientProps {
  product: Product;
}

export default function ProductDetailClient({ product }: ProductDetailClientProps) {
  const router = useRouter();
  const { dispatch } = useStore();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const addToCart = () => {
    for (let i = 0; i < quantity; i++) {
      dispatch({ type: 'ADD_TO_CART', payload: product });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Button 
        variant="ghost" 
        onClick={() => router.back()}
        className="mb-6"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Orqaga
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="relative overflow-hidden rounded-lg">
            <img
              src={product.images[selectedImage]}
              alt={product.name}
              className="w-full h-96 object-cover"
            />
            {product.originalPrice && (
              <Badge className="absolute top-4 left-4 bg-red-500 hover:bg-red-600">
                -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
              </Badge>
            )}
          </div>
          
          {product.images.length > 1 && (
            <div className="flex space-x-2 overflow-x-auto">
              {product.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`${product.name} ${index + 1}`}
                  className={`w-20 h-20 object-cover rounded cursor-pointer transition-all ${
                    selectedImage === index ? 'ring-2 ring-primary' : 'opacity-60 hover:opacity-100'
                  }`}
                  onClick={() => setSelectedImage(index)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <Badge variant="outline" className="mb-2">
              {product.category.name}
            </Badge>
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <div className="flex items-center space-x-2 mb-4">
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">(4.8 - 124 ta sharh)</span>
            </div>
            <p className="text-muted-foreground">{product.description}</p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <span className="text-3xl font-bold text-primary">
                <Price price={product.price} />
              </span>
              {product.originalPrice && (
                <span className="text-xl text-muted-foreground line-through">
                  <Price price={product.originalPrice} />
                </span>
              )}
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-sm">Mavjudlik:</span>
              <Badge variant={product.inStock ? 'default' : 'destructive'}>
                {product.inStock ? `${product.stockQuantity} ta` : 'Tugagan'}
              </Badge>
            </div>
          </div>

          <Separator />

          {/* Specifications */}
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold mb-4">Texnik xususiyatlari</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Brand:</span>
                  <span className="ml-2 font-medium">{product.specifications.brand}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Model:</span>
                  <span className="ml-2 font-medium">{product.specifications.model}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">O'lcham:</span>
                  <span className="ml-2 font-medium">{product.specifications.size}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Rang:</span>
                  <span className="ml-2 font-medium">{product.specifications.color}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Vazn:</span>
                  <span className="ml-2 font-medium">{product.specifications.weight}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Material:</span>
                  <span className="ml-2 font-medium">{product.specifications.material}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quantity and Add to Cart */}
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium">Soni:</span>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  -
                </Button>
                <span className="w-8 text-center">{quantity}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setQuantity(quantity + 1)}
                  disabled={quantity >= product.stockQuantity}
                >
                  +
                </Button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                onClick={addToCart} 
                disabled={!product.inStock}
                className="flex-1"
                size="lg"
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                Savatga qo'shish - <Price price={product.price * quantity} />
              </Button>
              <Button variant="outline" size="lg">
                <Heart className="h-4 w-4 mr-2" />
                Sevimli
              </Button>
              <Button variant="outline" size="lg">
                <Share2 className="h-4 w-4 mr-2" />
                Ulashish
              </Button>
            </div>
          </div>

          <Separator />

          {/* Features */}
          <div className="space-y-4">
            <h3 className="font-semibold">Bizning afzalliklarimiz</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex items-center space-x-2">
                <Truck className="h-5 w-5 text-green-500" />
                <span className="text-sm">Bepul yetkazib berish</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-blue-500" />
                <span className="text-sm">2 yillik kafolat</span>
              </div>
              <div className="flex items-center space-x-2">
                <RotateCcw className="h-5 w-5 text-purple-500" />
                <span className="text-sm">30 kun qaytarish</span>
              </div>
            </div>
          </div>

          {/* Customer Reviews */}
          <div className="space-y-4">
            <h3 className="font-semibold">Mijozlar fikri</h3>
            <div className="space-y-4">
              <div className="border rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <span className="font-medium">Aziz Karimov</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  "Ajoyib velosiped! Sifati juda yaxshi va narxi ham mos. Tavsiya qilaman!"
                </p>
              </div>
              <div className="border rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <span className="font-medium">Malika Tosheva</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  "Tez yetkazib berishdi va mahsulot kutganimdek chiqdi. Rahmat!"
                </p>
              </div>
              <div className="border rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="flex items-center space-x-1">
                    {[...Array(4)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                    <Star className="h-4 w-4 text-gray-300" />
                  </div>
                  <span className="font-medium">Bobur Aliyev</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  "Yaxshi velosiped, lekin biroz og'ir. Umuman olganda mamnunman."
                </p>
              </div>
            </div>
          </div>

          {/* Related Products */}
          <div className="space-y-4">
            <h3 className="font-semibold">O'xshash mahsulotlar</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="border rounded-lg p-4">
                <img 
                  src="https://images.pexels.com/photos/544966/pexels-photo-544966.jpeg?auto=compress&cs=tinysrgb&w=400" 
                  alt="O'xshash mahsulot" 
                  className="w-full h-32 object-cover rounded mb-2"
                />
                <h4 className="font-medium text-sm">Specialized Rockhopper</h4>
                <p className="text-primary font-bold text-sm">1,350,000 so'm</p>
              </div>
              <div className="border rounded-lg p-4">
                <img 
                  src="https://images.pexels.com/photos/191037/pexels-photo-191037.jpeg?auto=compress&cs=tinysrgb&w=400" 
                  alt="O'xshash mahsulot" 
                  className="w-full h-32 object-cover rounded mb-2"
                />
                <h4 className="font-medium text-sm">Scott Scale 970</h4>
                <p className="text-primary font-bold text-sm">1,650,000 so'm</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}