import React, { useState } from 'react';
import { useAWS } from '../../contexts/AWSContext';
import { useAuth } from '../../contexts/AuthContext';
import { Upload, Brain, Zap, Crown } from 'lucide-react';
import PlanSelector from './PlanSelector';
import FileUpload from './FileUpload';
import ModelTypeSelector from './ModelTypeSelector';

export default function ModelDeployment() {
  const { deployModel } = useAWS();
  const { user } = useAuth();
  const [modelName, setModelName] = useState('');
  const [modelType, setModelType] = useState<'linear-regression' | 'xgboost' | 'llm'>('linear-regression');
  const [file, setFile] = useState<File | null>(null);
  const [deploying, setDeploying] = useState(false);

  const handleDeploy = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !modelName) return;

    setDeploying(true);
    try {
      await deployModel(modelName, modelType, file);
      setModelName('');
      setFile(null);
    } catch (error) {
      console.error('Deployment failed:', error);
    } finally {
      setDeploying(false);
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Deploy ML Model</h1>
        <p className="text-gray-600 mt-2">
          Upload your dataset and deploy models to AWS SageMaker
        </p>
      </div>

      {/* Plan Selector */}
      <div className="mb-8">
        <PlanSelector />
      </div>

      {/* Deployment Form */}
      <form onSubmit={handleDeploy} className="space-y-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
            <Brain className="h-5 w-5 mr-2 text-blue-600" />
            Model Configuration
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="modelName" className="block text-sm font-medium text-gray-700 mb-2">
                Model Name
              </label>
              <input
                id="modelName"
                type="text"
                required
                value={modelName}
                onChange={(e) => setModelName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="e.g., Sales Prediction Model"
              />
            </div>

            <div>
              <ModelTypeSelector value={modelType} onChange={setModelType} />
            </div>
          </div>
        </div>

        {/* File Upload */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
            <Upload className="h-5 w-5 mr-2 text-blue-600" />
            Dataset Upload
          </h3>
          
          <FileUpload file={file} onFileChange={setFile} />
        </div>

        {/* Cost Estimation */}
        <div className="bg-blue-50 rounded-xl border border-blue-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Estimated Costs</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">~$5-15</p>
              <p className="text-sm text-gray-600">Training Cost</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">~$2-8/day</p>
              <p className="text-sm text-gray-600">Hosting Cost</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">~$0.50</p>
              <p className="text-sm text-gray-600">Storage/Logs</p>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-4 text-center">
            * Actual costs may vary based on model complexity and usage
          </p>
        </div>

        {/* Deploy Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={!file || !modelName || deploying}
            className="flex items-center px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {deploying ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Deploying...
              </>
            ) : (
              <>
                <Zap className="h-4 w-4 mr-2" />
                Deploy to {user?.plan === 'premium' ? 'Your AWS' : 'Sandbox'}
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}