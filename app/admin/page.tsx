'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebaseClient';
import { db } from '@/lib/firebaseClient';
import { collection, addDoc, setDoc, doc, deleteDoc } from 'firebase/firestore';
import { useStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Package, 
  Users, 
  ShoppingCart, 
  TrendingUp,
  Eye,
  Check
} from 'lucide-react';
import { categories } from '@/lib/data';
import { Product } from '@/lib/types';

export default function AdminPage() {
  const { state, dispatch } = useStore();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  const [newProduct, setNewProduct] = useState({
    name: '',
    nameEn: '',
    price: 0,
    originalPrice: 0,
    image: '',
    category: '',
    description: '',
    specifications: {
      brand: '',
      model: '',
      size: '',
      color: '',
      weight: '',
      material: ''
    },
    stockQuantity: 0,
    featured: false
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
      if (!firebaseUser || firebaseUser.email !== 'admin@example.com') {
        router.replace('/');
      }
    });
    return () => unsubscribe();
  }, [router]);

  if (loading) return <div>Yuklanmoqda...</div>;
  if (!user || user.email !== 'admin@example.com') return null;

  const products = state.products;

  const handleInputChange = (field: string, value: any) => {
    if (field.startsWith('specifications.')) {
      // Use keyof Product['specifications'] for type safety
      const child = field.split('.')[1] as keyof Product['specifications'];
      setNewProduct(prev => ({
        ...prev,
        specifications: {
          ...prev.specifications,
          [child]: value
        }
      }));
    } else {
      setNewProduct(prev => ({ ...prev, [field]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const productData: Product = {
      id: editingProduct ? editingProduct.id : Date.now().toString(),
      ...newProduct,
      image: newProduct.image || 'https://images.pexels.com/photos/100582/pexels-photo-100582.jpeg?auto=compress&cs=tinysrgb&w=800',
      images: [newProduct.image || 'https://images.pexels.com/photos/100582/pexels-photo-100582.jpeg?auto=compress&cs=tinysrgb&w=800'],
      category: categories.find(cat => cat.id === newProduct.category) || categories[0],
      createdAt: editingProduct ? editingProduct.createdAt : new Date().toISOString().split('T')[0],
      inStock: newProduct.stockQuantity > 0,
    };

    try {
      if (editingProduct) {
        // Update product in Firestore
        await setDoc(doc(db, 'products', productData.id), productData);
        dispatch({ type: 'UPDATE_PRODUCT', payload: productData });
      } else {
        // Add product to Firestore
        await setDoc(doc(db, 'products', productData.id), productData);
        dispatch({ type: 'ADD_PRODUCT', payload: productData });
      }
    } catch (error) {
      alert('Firebase-ga saqlashda xatolik: ' + (error as any).message);
      return;
    }
    
    setShowAddProduct(false);
    setEditingProduct(null);
    
    // Reset form
    setNewProduct({
      name: '',
      nameEn: '',
      price: 0,
      originalPrice: 0,
      image: '',
      category: '',
      description: '',
      specifications: {
        brand: '',
        model: '',
        size: '',
        color: '',
        weight: '',
        material: ''
      },
      stockQuantity: 0,
      featured: false
    });
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setNewProduct({
      name: product.name,
      nameEn: product.nameEn,
      price: product.price,
      originalPrice: product.originalPrice || 0,
      image: product.image,
      category: product.category.id,
      description: product.description,
      specifications: product.specifications,
      stockQuantity: product.stockQuantity,
      featured: product.featured
    });
    setShowAddProduct(true);
  };

  const handleDelete = async (productId: string) => {
    try {
      await deleteDoc(doc(db, 'products', productId));
      dispatch({ type: 'DELETE_PRODUCT', payload: productId });
    } catch (error) {
      alert('Firebase-dan o‘chirishda xatolik: ' + (error as any).message);
    }
    setShowDeleteConfirm(null);
  };

  const resetForm = () => {
    setEditingProduct(null);
    setShowAddProduct(false);
    // Reset form state here if needed
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('uz-UZ').format(price) + ' so\'m';
  };

  const stats = [
    { title: 'Jami mahsulotlar', value: products.length, icon: Package, color: 'text-blue-600' },
    { title: 'Mavjud mahsulotlar', value: products.filter(p => p.inStock).length, icon: TrendingUp, color: 'text-green-600' },
    { title: 'Kategoriyalar', value: categories.length, icon: Users, color: 'text-purple-600' },
    { title: 'Tavsiya etilgan', value: products.filter(p => p.featured).length, icon: ShoppingCart, color: 'text-orange-600' }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Admin Panel</h1>
        <Button onClick={() => setShowAddProduct(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Yangi mahsulot
        </Button>
      </div>

      {/* Navigation Tabs */}
      <div className="flex space-x-1 mb-8 bg-muted p-1 rounded-lg">
        {[
          { id: 'overview', label: 'Umumiy ma\'lumot' },
          { id: 'products', label: 'Mahsulotlar' },
          { id: 'categories', label: 'Kategoriyalar' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === tab.id 
                ? 'bg-background text-foreground shadow-sm' 
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <Card key={stat.title}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                      <p className="text-2xl font-bold">{stat.value}</p>
                    </div>
                    <stat.icon className={`h-8 w-8 ${stat.color}`} />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>So'nggi qo'shilgan mahsulotlar</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {products.slice(0, 5).map((product) => (
                  <div key={product.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-12 h-12 object-cover rounded"
                      />
                      <div>
                        <h3 className="font-medium">{product.name}</h3>
                        <p className="text-sm text-muted-foreground">{product.category.name}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{formatPrice(product.price)}</p>
                      <Badge variant={product.inStock ? 'default' : 'destructive'}>
                        {product.inStock ? 'Mavjud' : 'Tugagan'}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Products Tab */}
      {activeTab === 'products' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <Card key={product.id}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Badge variant="outline">{product.category.name}</Badge>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" onClick={() => handleEdit(product)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => setShowDeleteConfirm(product.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-32 object-cover rounded mb-4"
                  />
                  
                  <h3 className="font-semibold mb-2">{product.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {product.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-primary">
                      {formatPrice(product.price)}
                    </span>
                    <Badge variant={product.inStock ? 'default' : 'destructive'}>
                      {product.inStock ? `${product.stockQuantity} ta` : 'Tugagan'}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Categories Tab */}
      {activeTab === 'categories' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Card key={category.id}>
              <CardContent className="p-6 text-center">
                <div className="text-4xl mb-4">{category.icon}</div>
                <h3 className="font-semibold text-lg mb-2">{category.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {category.description}
                </p>
                <div className="flex justify-center space-x-2">
                  <Button size="sm" variant="outline">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Add Product Modal */}
      {showAddProduct && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <CardTitle>
                {editingProduct ? 'Mahsulotni tahrirlash' : 'Yangi mahsulot qo\'shish'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Mahsulot nomi *</Label>
                    <Input
                      id="name"
                      value={newProduct.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="nameEn">Ingliz tilidagi nom</Label>
                    <Input
                      id="nameEn"
                      value={newProduct.nameEn}
                      onChange={(e) => handleInputChange('nameEn', e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="price">Narx *</Label>
                    <Input
                      id="price"
                      type="number"
                      value={newProduct.price}
                      onChange={(e) => handleInputChange('price', Number(e.target.value))}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="originalPrice">Asl narx</Label>
                    <Input
                      id="originalPrice"
                      type="number"
                      value={newProduct.originalPrice}
                      onChange={(e) => handleInputChange('originalPrice', Number(e.target.value))}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="image">Rasm URL *</Label>
                  <Input
                    id="image"
                    value={newProduct.image}
                    onChange={(e) => handleInputChange('image', e.target.value)}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="category">Kategoriya *</Label>
                  <Select value={newProduct.category} onValueChange={(value) => handleInputChange('category', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Kategoriya tanlang" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="description">Tavsif *</Label>
                  <Textarea
                    id="description"
                    value={newProduct.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="brand">Brand</Label>
                    <Input
                      id="brand"
                      value={newProduct.specifications.brand}
                      onChange={(e) => handleInputChange('specifications.brand', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="model">Model</Label>
                    <Input
                      id="model"
                      value={newProduct.specifications.model}
                      onChange={(e) => handleInputChange('specifications.model', e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="size">O'lcham</Label>
                    <Input
                      id="size"
                      value={newProduct.specifications.size}
                      onChange={(e) => handleInputChange('specifications.size', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="color">Rang</Label>
                    <Input
                      id="color"
                      value={newProduct.specifications.color}
                      onChange={(e) => handleInputChange('specifications.color', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="weight">Vazn</Label>
                    <Input
                      id="weight"
                      value={newProduct.specifications.weight}
                      onChange={(e) => handleInputChange('specifications.weight', e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="material">Material</Label>
                  <Input
                    id="material"
                    value={newProduct.specifications.material}
                    onChange={(e) => handleInputChange('specifications.material', e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="stockQuantity">Zaxira miqdori *</Label>
                  <Input
                    id="stockQuantity"
                    type="number"
                    value={newProduct.stockQuantity}
                    onChange={(e) => handleInputChange('stockQuantity', Number(e.target.value))}
                    required
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="featured"
                    checked={newProduct.featured}
                    onCheckedChange={(checked) => handleInputChange('featured', checked)}
                  />
                  <Label htmlFor="featured">Tavsiya etilgan mahsulot</Label>
                </div>

                <div className="flex justify-end space-x-2 pt-4">
                  <Button type="button" variant="outline" onClick={resetForm}>
                    Bekor qilish
                  </Button>
                  <Button type="submit">
                    <Check className="h-4 w-4 mr-2" />
                    {editingProduct ? 'Yangilash' : 'Saqlash'}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Mahsulotni o'chirish</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">Bu mahsulotni o'chirishni xohlaysizmi? Bu amalni bekor qilib bo'lmaydi.</p>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setShowDeleteConfirm(null)}>
                  Bekor qilish
                </Button>
                <Button variant="destructive" onClick={() => handleDelete(showDeleteConfirm)}>
                  O'chirish
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}

