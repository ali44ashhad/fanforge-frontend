import React, { useState } from 'react';
import {
  Truck,
  Globe,
  Package,
  Clock,
  Plus,
  X,
  Save,
  RefreshCw,
  MapPin,
  CreditCard
} from 'lucide-react';

const ShippingSettings = () => {
  const [settings, setSettings] = useState({
    // Shipping Methods
    methods: [
      { id: 1, name: 'Standard Shipping', price: 4.99, delivery: '7-14 business days', enabled: true },
      { id: 2, name: 'Express Shipping', price: 9.99, delivery: '3-5 business days', enabled: true },
      { id: 3, name: 'Free Shipping', price: 0, delivery: '10-15 business days', enabled: false },
    ],
    
    // Shipping Regions
    regions: ['United States', 'Canada', 'United Kingdom', 'European Union', 'Australia'],
    
    // Local Pickup
    localPickup: {
      enabled: true,
      location: '123 Art Street, Creative City, CC 10001',
      instructions: 'Pickup available Mon-Fri, 9 AM - 5 PM. Please bring order confirmation.',
    },
    
    // Package Details
    packaging: {
      weightUnit: 'lbs',
      dimensions: '12x12x2',
      packagingType: 'Box',
    },
    
    // Processing Time
    processingTime: '1-2 business days',
    
    // Shipping Rules
    rules: {
      freeShippingThreshold: 50,
      combineShipping: true,
      insurance: false,
      signatureRequired: false,
    },
    
    // Payment Methods Accepted
    paymentMethods: [
      { method: 'PayPal', details: 'paypal.me/yourstore', enabled: true },
      { method: 'Venmo', details: '@yourstore', enabled: true },
      { method: 'Cash App', details: '$yourstore', enabled: true },
      { method: 'Bank Transfer', details: 'Account details provided after order', enabled: true },
      { method: 'Cash on Delivery', details: 'Local pickup only', enabled: false },
    ],
  });

  const [newMethod, setNewMethod] = useState({
    name: '',
    price: '',
    delivery: '',
  });
  
  const [newRegion, setNewRegion] = useState('');
  const [newPaymentMethod, setNewPaymentMethod] = useState({
    method: '',
    details: '',
  });

  const handleAddMethod = () => {
    if (newMethod.name && newMethod.price && newMethod.delivery) {
      const newId = Math.max(...settings.methods.map(m => m.id)) + 1;
      setSettings({
        ...settings,
        methods: [
          ...settings.methods,
          {
            id: newId,
            name: newMethod.name,
            price: parseFloat(newMethod.price),
            delivery: newMethod.delivery,
            enabled: true
          }
        ]
      });
      setNewMethod({ name: '', price: '', delivery: '' });
    }
  };

  const handleAddRegion = () => {
    if (newRegion.trim() && !settings.regions.includes(newRegion.trim())) {
      setSettings({
        ...settings,
        regions: [...settings.regions, newRegion.trim()]
      });
      setNewRegion('');
    }
  };

  const handleAddPaymentMethod = () => {
    if (newPaymentMethod.method && newPaymentMethod.details) {
      setSettings({
        ...settings,
        paymentMethods: [
          ...settings.paymentMethods,
          {
            method: newPaymentMethod.method,
            details: newPaymentMethod.details,
            enabled: true
          }
        ]
      });
      setNewPaymentMethod({ method: '', details: '' });
    }
  };

  const toggleMethod = (id) => {
    setSettings({
      ...settings,
      methods: settings.methods.map(method =>
        method.id === id ? { ...method, enabled: !method.enabled } : method
      )
    });
  };

  const togglePaymentMethod = (index) => {
    const updatedMethods = [...settings.paymentMethods];
    updatedMethods[index].enabled = !updatedMethods[index].enabled;
    setSettings({ ...settings, paymentMethods: updatedMethods });
  };

  const removeRegion = (regionToRemove) => {
    setSettings({
      ...settings,
      regions: settings.regions.filter(region => region !== regionToRemove)
    });
  };

  const handleSave = () => {
    // In a real app, this would save to backend
    alert('Shipping settings saved!');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Shipping Settings</h2>
          <p className="text-gray-600 dark:text-gray-400">Configure how you handle shipping and payments</p>
        </div>
        <button
          onClick={handleSave}
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
        >
          <Save size={20} />
          Save Settings
        </button>
      </div>

      {/* Shipping Methods */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
          <Truck size={20} />
          Shipping Methods
        </h3>
        
        <div className="space-y-4 mb-6">
          {settings.methods.map((method) => (
            <div key={method.id} className="flex flex-col md:flex-row md:items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50">
              <div className="flex-1 mb-3 md:mb-0">
                <div className="flex items-center gap-3 mb-2">
                  <h4 className="font-medium text-gray-800 dark:text-white">{method.name}</h4>
                  <span className={`inline-flex items-center px-2 py-1 rounded text-xs ${
                    method.enabled 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' 
                      : 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
                  }`}>
                    {method.enabled ? 'Active' : 'Inactive'}
                  </span>
                </div>
                <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400">
                  <span className="flex items-center gap-1">
                    <DollarSign size={14} />
                    ${method.price}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={14} />
                    {method.delivery}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => toggleMethod(method.id)}
                  className={`px-3 py-1 rounded text-sm font-medium ${
                    method.enabled
                      ? 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                      : 'bg-blue-500 text-white hover:bg-blue-600'
                  }`}
                >
                  {method.enabled ? 'Disable' : 'Enable'}
                </button>
                <button
                  onClick={() => {
                    if (window.confirm('Delete this shipping method?')) {
                      setSettings({
                        ...settings,
                        methods: settings.methods.filter(m => m.id !== method.id)
                      });
                    }
                  }}
                  className="p-2 text-gray-500 hover:text-red-500 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Add New Method */}
        <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
          <h4 className="font-medium text-gray-800 dark:text-white mb-4">Add New Shipping Method</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Method Name
              </label>
              <input
                type="text"
                value={newMethod.name}
                onChange={(e) => setNewMethod({ ...newMethod, name: e.target.value })}
                placeholder="e.g., Overnight Shipping"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Price ($)
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={newMethod.price}
                onChange={(e) => setNewMethod({ ...newMethod, price: e.target.value })}
                placeholder="0.00"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Delivery Time
              </label>
              <input
                type="text"
                value={newMethod.delivery}
                onChange={(e) => setNewMethod({ ...newMethod, delivery: e.target.value })}
                placeholder="e.g., 2-3 business days"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
          </div>
          <button
            onClick={handleAddMethod}
            className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            <Plus size={18} />
            Add Method
          </button>
        </div>
      </div>

      {/* Shipping Regions */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
          <Globe size={20} />
          Shipping Regions
        </h3>
        
        <div className="mb-6">
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Select the regions where you ship your products. Buyers from other regions won't be able to purchase.
          </p>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {settings.regions.map((region) => (
              <span
                key={region}
                className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300 text-sm"
              >
                {region}
                <button
                  onClick={() => removeRegion(region)}
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200"
                >
                  <X size={14} />
                </button>
              </span>
            ))}
          </div>
          
          <div className="flex gap-2">
            <input
              type="text"
              value={newRegion}
              onChange={(e) => setNewRegion(e.target.value)}
              placeholder="Add a new region (e.g., Japan)"
              className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            />
            <button
              onClick={handleAddRegion}
              className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              Add Region
            </button>
          </div>
        </div>
      </div>

      {/* Package Details */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
          <Package size={20} />
          Package Details
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Weight Unit
            </label>
            <select
              value={settings.packaging.weightUnit}
              onChange={(e) => setSettings({
                ...settings,
                packaging: { ...settings.packaging, weightUnit: e.target.value }
              })}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            >
              <option value="lbs">Pounds (lbs)</option>
              <option value="kg">Kilograms (kg)</option>
              <option value="oz">Ounces (oz)</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Package Dimensions
            </label>
            <input
              type="text"
              value={settings.packaging.dimensions}
              onChange={(e) => setSettings({
                ...settings,
                packaging: { ...settings.packaging, dimensions: e.target.value }
              })}
              placeholder="L x W x H"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Packaging Type
            </label>
            <select
              value={settings.packaging.packagingType}
              onChange={(e) => setSettings({
                ...settings,
                packaging: { ...settings.packaging, packagingType: e.target.value }
              })}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            >
              <option value="Box">Box</option>
              <option value="Envelope">Envelope</option>
              <option value="Tube">Tube</option>
              <option value="Poly Mailer">Poly Mailer</option>
            </select>
          </div>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
          <CreditCard size={20} />
          Payment Methods Accepted
        </h3>
        
        <div className="mb-6">
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            List the payment methods you accept. This will be shown to buyers.
          </p>
          
          <div className="space-y-3">
            {settings.paymentMethods.map((method, index) => (
              <div key={index} className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={method.enabled}
                      onChange={() => togglePaymentMethod(index)}
                      className="rounded text-blue-500"
                    />
                    <span className="font-medium text-gray-800 dark:text-white">{method.method}</span>
                  </label>
                  <span className="text-sm text-gray-600 dark:text-gray-400">{method.details}</span>
                </div>
                <button
                  onClick={() => {
                    const updated = [...settings.paymentMethods];
                    updated.splice(index, 1);
                    setSettings({ ...settings, paymentMethods: updated });
                  }}
                  className="p-1 text-gray-500 hover:text-red-500 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Add Payment Method */}
        <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
          <h4 className="font-medium text-gray-800 dark:text-white mb-4">Add Payment Method</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Method Name
              </label>
              <input
                type="text"
                value={newPaymentMethod.method}
                onChange={(e) => setNewPaymentMethod({ ...newPaymentMethod, method: e.target.value })}
                placeholder="e.g., PayPal, Venmo, etc."
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Payment Details
              </label>
              <input
                type="text"
                value={newPaymentMethod.details}
                onChange={(e) => setNewPaymentMethod({ ...newPaymentMethod, details: e.target.value })}
                placeholder="e.g., username, email, or instructions"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
          </div>
          <button
            onClick={handleAddPaymentMethod}
            className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            <Plus size={18} />
            Add Payment Method
          </button>
        </div>
      </div>

      {/* Local Pickup */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
          <MapPin size={20} />
          Local Pickup
        </h3>
        
        <div className="space-y-4">
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={settings.localPickup.enabled}
              onChange={(e) => setSettings({
                ...settings,
                localPickup: { ...settings.localPickup, enabled: e.target.checked }
              })}
              className="rounded text-blue-500"
            />
            <span className="text-gray-700 dark:text-gray-300">Enable local pickup option</span>
          </label>
          
          {settings.localPickup.enabled && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Pickup Location
                </label>
                <textarea
                  value={settings.localPickup.location}
                  onChange={(e) => setSettings({
                    ...settings,
                    localPickup: { ...settings.localPickup, location: e.target.value }
                  })}
                  rows={2}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Pickup Instructions
                </label>
                <textarea
                  value={settings.localPickup.instructions}
                  onChange={(e) => setSettings({
                    ...settings,
                    localPickup: { ...settings.localPickup, instructions: e.target.value }
                  })}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Processing Time */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
          <Clock size={20} />
          Processing Time
        </h3>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            How long does it take to prepare an order for shipping?
          </label>
          <select
            value={settings.processingTime}
            onChange={(e) => setSettings({ ...settings, processingTime: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
          >
            <option value="same-day">Same day</option>
            <option value="1-2 business days">1-2 business days</option>
            <option value="3-5 business days">3-5 business days</option>
            <option value="1 week">1 week</option>
          </select>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            This time is added to your shipping time estimates.
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-4">
        <button
          onClick={handleSave}
          className="inline-flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
        >
          <Save size={20} />
          Save All Settings
        </button>
        <button
          onClick={() => window.location.reload()}
          className="inline-flex items-center gap-2 px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        >
          <RefreshCw size={20} />
          Reset to Defaults
        </button>
      </div>
    </div>
  );
};

export default ShippingSettings;
