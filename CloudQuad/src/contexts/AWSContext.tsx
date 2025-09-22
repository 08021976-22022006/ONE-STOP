import React, { createContext, useContext, useState } from 'react';

interface Model {
  id: string;
  name: string;
  type: 'linear-regression' | 'xgboost' | 'llm';
  status: 'training' | 'deploying' | 'active' | 'stopped' | 'failed';
  endpoint?: string;
  cost: {
    total: number;
    sagemaker: number;
    s3: number;
    ses: number;
  };
  createdAt: Date;
}

interface CostData {
  date: string;
  sagemaker: number;
  s3: number;
  ses: number;
  total: number;
}

interface AWSContextType {
  models: Model[];
  costHistory: CostData[];
  deployModel: (name: string, type: Model['type'], file: File) => Promise<void>;
  stopModel: (id: string) => Promise<void>;
  deleteModel: (id: string) => Promise<void>;
  refreshCosts: () => Promise<void>;
  predictedCosts: CostData[];
}

const AWSContext = createContext<AWSContextType | undefined>(undefined);

export function AWSProvider({ children }: { children: React.ReactNode }) {
  const [models, setModels] = useState<Model[]>([
    {
      id: '1',
      name: 'Sales Prediction Model',
      type: 'linear-regression',
      status: 'active',
      endpoint: 'https://runtime.sagemaker.us-east-1.amazonaws.com/endpoints/sales-model',
      cost: { total: 45.67, sagemaker: 42.30, s3: 2.87, ses: 0.50 },
      createdAt: new Date('2025-01-10')
    },
    {
      id: '2',
      name: 'Customer Churn Analysis',
      type: 'xgboost',
      status: 'training',
      cost: { total: 12.45, sagemaker: 11.20, s3: 1.25, ses: 0.00 },
      createdAt: new Date('2025-01-12')
    }
  ]);

  const [costHistory] = useState<CostData[]>([
    { date: '2025-01-01', sagemaker: 25.30, s3: 1.50, ses: 0.20, total: 27.00 },
    { date: '2025-01-02', sagemaker: 28.45, s3: 1.60, ses: 0.25, total: 30.30 },
    { date: '2025-01-03', sagemaker: 31.20, s3: 1.75, ses: 0.30, total: 33.25 },
    { date: '2025-01-04', sagemaker: 35.60, s3: 1.90, ses: 0.35, total: 37.85 },
    { date: '2025-01-05', sagemaker: 38.90, s3: 2.10, ses: 0.40, total: 41.40 },
    { date: '2025-01-06', sagemaker: 42.30, s3: 2.30, ses: 0.45, total: 45.05 },
    { date: '2025-01-07', sagemaker: 45.80, s3: 2.50, ses: 0.50, total: 48.80 }
  ]);

  const [predictedCosts] = useState<CostData[]>([
    { date: '2025-01-08', sagemaker: 48.15, s3: 2.65, ses: 0.52, total: 51.32 },
    { date: '2025-01-09', sagemaker: 50.25, s3: 2.78, ses: 0.55, total: 53.58 },
    { date: '2025-01-10', sagemaker: 52.76, s3: 2.92, ses: 0.58, total: 56.26 },
    { date: '2025-01-11', sagemaker: 55.40, s3: 3.07, ses: 0.61, total: 59.08 },
    { date: '2025-01-12', sagemaker: 58.17, s3: 3.23, ses: 0.64, total: 62.04 }
  ]);

  const deployModel = async (name: string, type: Model['type'], file: File) => {
    const newModel: Model = {
      id: Date.now().toString(),
      name,
      type,
      status: 'training',
      cost: { total: 0, sagemaker: 0, s3: 0, ses: 0 },
      createdAt: new Date()
    };
    
    setModels(prev => [...prev, newModel]);
    
    // Simulate training process
    setTimeout(() => {
      setModels(prev => prev.map(model => 
        model.id === newModel.id 
          ? { ...model, status: 'deploying' }
          : model
      ));
      
      setTimeout(() => {
        setModels(prev => prev.map(model => 
          model.id === newModel.id 
            ? { 
                ...model, 
                status: 'active',
                endpoint: `https://runtime.sagemaker.us-east-1.amazonaws.com/endpoints/${name.toLowerCase().replace(/\s+/g, '-')}`
              }
            : model
        ));
      }, 3000);
    }, 5000);
  };

  const stopModel = async (id: string) => {
    setModels(prev => prev.map(model => 
      model.id === id ? { ...model, status: 'stopped' } : model
    ));
  };

  const deleteModel = async (id: string) => {
    setModels(prev => prev.filter(model => model.id !== id));
  };

  const refreshCosts = async () => {
    // Simulate cost refresh
    console.log('Refreshing costs from AWS Cost Explorer API...');
  };

  return (
    <AWSContext.Provider value={{
      models,
      costHistory,
      deployModel,
      stopModel,
      deleteModel,
      refreshCosts,
      predictedCosts
    }}>
      {children}
    </AWSContext.Provider>
  );
}

export function useAWS() {
  const context = useContext(AWSContext);
  if (context === undefined) {
    throw new Error('useAWS must be used within an AWSProvider');
  }
  return context;
}